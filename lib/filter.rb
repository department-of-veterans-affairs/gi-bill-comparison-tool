###############################################################################
## Filter
## Filters recordsets based on a set of hash values.
###############################################################################
class Filter
	attr_reader :rset, :filters

	#############################################################################
	## initialize
	#############################################################################
	def initialize(rset = [])
		@rset = rset
		@filters = []
	end

	#############################################################################
	## add_filter
	## Adds a filter to the filters collection that will be applied to the rset
	#############################################################################
	def add_filter(filter)
		if filter.present? && Institution.column_names.include?(filter[:name])
			@filters << filter
		end

		self
	end

	#############################################################################
	## apply_filters
	## Applies the existing filter to the resuts set to produced a reduced set
	## of records that satisfy the queries.
	#############################################################################
	def apply_filters
		meth = { 
			NilClass => :null_query, String => :str_query, TrueClass => :query, 
			FalseClass => :query, Fixnum => :query, Float => :query
		}

		queries = filters.map { |f| send(meth[f[:value].class], f[:name], f[:negated]) }
		values = filters.reject { |f| f[:value].nil? }.map { |f| f[:value] }

		@rset.where(queries + values)
	end

	protected
	#############################################################################
	## str_query
	## Returns sql snippet comparing a string attribute with a string, using the
	## placeholder ?. Note, because NULL is not a value, any record with a NULL
	## attribute value is eleminated from comparison by SQL.
	#############################################################################
	def str_query(attribute, negated = false)
		operator = negated ? " <> " : " = "
		"LOWER(#{attribute})" + operator + "LOWER(?)"
	end

	#############################################################################
	## query
	## Returns sql snippet comparing a attribute with a general value, using the
	## placeholder ?. Note, because NULL is not a value, any record with a NULL
	## attribute value is eleminated from comparison by SQL.
	#############################################################################
	def query(attribute, negated = false)
		operator = negated ? " <> " : " = "
		"#{attribute}" + operator + "?"
	end

	#############################################################################
	## null_query
	## Returns sql snippet comparing an attribute with NULL.
	#############################################################################
	def null_query(attribute, negated = false)
		operator = negated ? " IS " : " IS NOT "
		"#{attribute}" + operator + "NULL"
	end
end