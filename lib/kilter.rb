class Kilter
	attr_reader :rset, :filtered_rset, :terms, :values, :tracked, :pages, 
		:page_size, :count_all, :column_names

	DEFAULT_ITEMS_PER_PAGE = 9

	#############################################################################
	## initialize
	## Constructs kilter, and takes an active record relation, which is used as
	## the universe of records being filtered.
	#############################################################################
	def initialize(rset)
		raise ArgumentError if rset.nil? || !rset.kind_of?(ActiveRecord::Relation)

		@filtered_rset = rset
		@count_all = rset.length
		@column_names = @filtered_rset.first.attributes.keys.map(&:to_sym)

		@terms = []
		@values = []
		@tracked = {}

		@pages = 1
		@page_size = DEFAULT_ITEMS_PER_PAGE
	end

	#############################################################################
	## model
	## Gets the name of the underlying model of the filtered_rset.
	#############################################################################
	def model
		@filtered_rset.model
	end

	#############################################################################
	## column_type
	## Gets the type of column via Activerecord.
	#############################################################################
	def column_type(col = "")
		@column_names.include?(col.to_s) ? @filtered_rset.columns_hash[col.to_s].type : nil
	end

	#############################################################################
	## filter
	## Runs the filter, reducing the filtered set of results.
	#############################################################################
	def filter
		query = [@terms.join(" AND ")] + @values
		@filtered_rset = @filtered_rset.where(query) unless query.empty?

		self
	end

	#############################################################################
	## add
	## Adds a term to the list of terms used in the filter terms, and adds the
	## value to the list of values used in the filter.
	#############################################################################
	def add(col, value, op = "=")
		raise ArgumentError if (col.nil? || col.empty?)
		return unless @column_names.include?(col)

		# If value is nil, then a IS NULL query has no "?"
		query = to_query(col, value, op)
		nvals = query.count("?")

		@terms << query

		if value.is_a?(Array)
			raise ArgumentError if nvals > value.length

			value = value.map(&:downcase) if column_type(col) == :string
			@values += value[0, nvals]
		elsif !value.nil?
			raise ArgumentError if nvals > 1

			value = value.downcase if column_type(col) == :string
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
		return unless @column_names.include?(col)

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

		return unless (@tracked.keys.include?(col) || count_operation)
		return @tracked[col] unless count_operation

		@filtered_rset.each do |r|
			@tracked.keys.each do |k|
				# use send to handle columns that may be overriden in models
				value = r.send(k.to_s)
				@tracked[k][value.to_s] += 1 unless (value.nil? || value.try(:empty?))
			end
		end
	end

	#############################################################################
	## sort
	## Sorts the results set by any column, ascending or descending
	#############################################################################
	def sort(col, dir = :asc)
		raise ArgumentError if (col.nil? || col.empty?)
		return unless @column_names.include?(col)

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
		@pages = count_all / @page_size + (count_all % @page_size == 0 ? 0 : 1) 
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

		# offset n is the n+1 record
		start = (num - 1) * @page_size 

		return @filtered_rset.offset(start).limit(@page_size)
	end

	#############################################################################
	## to_query
	## Returns a SQL query string suitable for use in Activerecord's query by
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
		lhs = "LOWER(#{lhs})" if column_type(col) == :string
		
		"(#{lhs} #{rhs})"
	end
end
