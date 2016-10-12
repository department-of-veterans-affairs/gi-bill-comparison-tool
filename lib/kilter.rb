class Kilter
	attr_reader :rset, :filtered_rset, :terms, :values, :tracked, :pages,
		:page_size, :page_number, :paged_filtered_rset, :columns, :count_all


	DEFAULT_ITEMS_PER_PAGE = 9
	DEFAULT_PAGE_LINK_RANGE = 4

	MIN = -> (a, b) { a < b ? a : b }
	MAX = -> (a, b) { a > b ? a : b }

	#############################################################################
	## initialize
	## Constructs kilter, and takes an active record relation, which is used as
	## the universe of records being filtered.
	#############################################################################
	def initialize(rset)
		raise ArgumentError if rset.nil? || !rset.kind_of?(ActiveRecord::Relation)

		@filtered_rset = rset
		@count_all = @filtered_rset.size

		info
		set_size(DEFAULT_ITEMS_PER_PAGE)
		page(1)

		@terms = []
		@values = []
		@tracked = {}
	end

	#############################################################################
	## model
	## Gets the name of the underlying model of the filtered_rset.
	#############################################################################
	def model
		@filtered_rset.model
	end

	#############################################################################
	## filter
	## Runs the filter, reducing the filtered set of results.
	#############################################################################
	def filter
		query = [@terms.join(" AND ")] + @values
		@filtered_rset = @filtered_rset.where(query) unless query.empty?

		page(1)
		set_size(@page_size)

		self
	end

	#############################################################################
	## info
	## Gets meta-information regarding the query: tables, columns, and types.
	#############################################################################
	def info
		if (@filtered_rset).empty?
			@columns = {}
			return
		end

		query = @filtered_rset.to_sql

		@columns = @filtered_rset.first.attributes.inject({}) do |m, c|
			m[c[0].to_sym] = nil
			m
		end

		tables = ActiveRecord::Base.connection.tables.select do |t|
			Regexp.new('\b' + t + '\b') =~ query
		end

		tables.each do |t|
			ActiveRecord::Base.connection.columns(t).each do |c|
				@columns[c.name.to_sym] = c.type if @columns.key?(c.name.to_sym)
			end
		end

		unless (extra = @columns.values.reject { |v| v.present? }).empty?
			msg = extra.join(', ') + "have missing types, perhaps these are aliased?"
			raise KilterError.new(msg)
		end
	end

	#############################################################################
	## in_rset?
	## True, if column is present in the filtered query results.
	#############################################################################
	def in_rset?(col)
		@columns.key?(col)
	end

	#############################################################################
	## count_filtered
	#############################################################################
	def count_filtered
		filtered_rset.size
	end

	#############################################################################
	## add
	## Adds a term to the list of terms used in the filter terms, and adds the
	## value to the list of values used in the filter.
	#############################################################################
	def add(col, value, op = "=")
		raise ArgumentError if (col.nil? || col.empty?)
		return self unless in_rset?(col = col.to_sym)

		# If value is nil, then a IS NULL query has no "?"
		query = to_query(col, value, op)
		nvals = query.count("?")

		@terms << query

		if value.is_a?(Array)
			raise ArgumentError if nvals > value.length

			value = value.map(&:downcase) if @columns[col] == :string
			@values += value[0, nvals]
		elsif !value.nil?
			raise ArgumentError if nvals > 1

			value = value.downcase if @columns[col] == :string
			@values << value
		end

		self
	end

	#############################################################################
	## track
	## Sets up tracking (counting) the different values in the filtered rsets.
	#############################################################################
	def track(col)
		raise ArgumentError if (col.nil? || col.empty?)
		return self unless @columns.include?(col)

		tracked[col] = Hash.new(0) unless tracked.keys.include?(col)

		self
	end

	#############################################################################
	## count
	## Sums the number of occurences of each value in a column, for all columns
	## in a results set. Passing no arguments to the call cause a count to be
	## performed on all tracked fields.
	#############################################################################
	def count(col = nil)
		count_operation = col.nil? || col.empty?

		return self unless (@tracked.keys.include?(col) || count_operation)
		return @tracked[col] unless count_operation

		@filtered_rset.each do |r|
			@tracked.keys.each do |k|
				# use send to handle columns that may be overriden in models
				value = r.send(k.to_s)
				@tracked[k][value.to_s] += 1 unless (value.nil? || value.try(:empty?))
			end
		end

		self
	end

	#############################################################################
	## sort
	## Sorts the results set by any column, ascending or descending
	#############################################################################
	def sort(col, dir = :asc)
		raise ArgumentError if (col.nil? || col.empty?)
		return self unless @columns.include?(col)

		@filtered_rset = @filtered_rset.order(col => dir)

		self
	end

	#############################################################################
	## set_size
	## Sets the number of records in a page.
	#############################################################################
	def set_size(page_size = DEFAULT_ITEMS_PER_PAGE)
		@page_size = page_size > 0 ? page_size : DEFAULT_ITEMS_PER_PAGE

		# Add an extra page only if there is at least 1 extra record
		@pages = count_filtered / @page_size + (count_filtered % @page_size == 0 ? 0 : 1)
		@pages = 1 if @pages == 0

		self
	end

	#############################################################################
	## page
	## Returns a paginated subset of objects based on the page number and
	## page size.
	#############################################################################
	def page(num = 1)
		num = 1 if num < 1
		num = @pages if num > @pages

		@page_number = num

		# offset n is the n+1 record
		start = (@page_number - 1) * @page_size

		@paged_filtered_rset = @filtered_rset.offset(start).limit(@page_size)

		return self
	end

	#############################################################################
	## to_query
	## Returns a SQL query string suitable for use in ActiveRecord's query by
	## array.
	#############################################################################
	def to_query(col, value, op = "=")
		return op == "=" ?  "(#{col} IS NULL)" : "(#{col} IS NOT NULL)" if value.nil?

		case op.downcase
		when "=", "!="
			if value.is_a?(Array)
				rhs = "IN (" + Array.new(value.length, "?").join(", ") + ")"
				rhs = "NOT " + rhs if op == "!="
			else
				rhs = op + " ?"
			end
		when "between"
			rhs = "BETWEEN ? AND ?"
		when "not between"
			rhs =  "NOT BETWEEN ? AND ?"
		when "like"
			rhs = "LIKE ?"
		when "not like"
			rhs = "NOT LIKE ?"
		else
			rhs = op + " ?"
		end

		lhs = "#{col.to_s}"
		lhs = "LOWER(#{lhs})" if @columns[col] == :string

		"(#{lhs} #{rhs})"
	end

  #############################################################################
  ## to_href
  ## Used to create a href.
  ## - where: url of resource
  ## - vars: optional variable pairs
  ## - for_page: optional pagination page specifier
  #############################################################################
  def to_href(where, vars = {}, for_page = {})
  	return where if vars.blank? && for_page.blank?

    vars ||= {}

    url = where + "?"
    url += vars.inject("") do |vars, pair|
      if pair[1].present? && pair[0] != :page
       	vars += "#{pair[0]}=#{pair[1]}&"
     	else
       	vars
     	end
   	end

		if for_page.present?
			url += "#{for_page.keys[0]}=#{for_page.values[0]}"
		end

    URI.encode(url)
  end

  #############################################################################
  ## to_link
  ## Creates a link (a) tag.
  #############################################################################
  def to_link(href_str, label, class_str = nil)
    a = %Q(<a href="#{href_str}")
    a += %Q( class="#{class_str}") if class_str.present?
    a += ">#{label}</a>"
  end

  #############################################################################
  ## pagination_links
  ## Returns a block of html representing the current pagination.
  #############################################################################
  def pagination_links(where, vars = {}, prev_str = nil, next_str = nil, cur_pg_class = nil)
  	range_start = MAX.call(@page_number - DEFAULT_PAGE_LINK_RANGE, 1)
  	range_end = MIN.call(@page_number + DEFAULT_PAGE_LINK_RANGE, @pages)

    prev_str ||= "Previous"
    next_str ||= "Next"

    links = []
		prev_link = nil
		next_link = nil

    # Create links for "< Previous " if the current page is not the first
    if @page_number > 1
    	prev_link = to_link(to_href(where, vars, page: @page_number - 1), prev_str, "va-pagination-prev")
    end

    # Display a link for "1 ..." if the start of the page range >= 2
    if range_start > 1
    	links << to_link(to_href(where, vars, page: 1), "1") + " ..."
    end

    # Create links for each page in the ragebut the current page
    (range_start .. range_end).each do |i|
    	if i == @page_number
      	links << %Q(<a class="#{cur_pg_class}">#{i.to_s}</a>)
    	else
      	links << to_link(to_href(where, vars, page: i), i)
      end
    end

    # Create links for " ... n" if the end of the page range <= n
    if range_end < @pages
    	links << "... " + to_link(to_href(where, vars, page: @pages), @pages)
    end

    # Create links for " Next >" if the current page is not the last
    if @page_number < @pages
    	next_link = to_link(to_href(where, vars, page: @page_number + 1), next_str, "va-pagination-next")
    end

    [
			prev_link,
			"<div class='va-pagination-inner'>",
			*links,
			"</div>",
			next_link
		].compact.join(" ")
  end
end

class KilterError < StandardError
end
