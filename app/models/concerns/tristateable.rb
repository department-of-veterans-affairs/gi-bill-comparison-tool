require 'active_support/concern'

###############################################################################
## Tristateable
## Reads a column, bypassing activerecord field accessors, so that we can 
## differentiate between nil values and boolean false (by default nils in 
## activerecord are converted to false).
##
## Naturally, booleans can only hold true/false, so these fields should be
## created as strings.
###############################################################################
module Tristateable
  extend ActiveSupport::Concern

  TRUTHY = %w(yes true t 1 on)
  
  class_methods do 
  	###########################################################################
  	## to_bool
  	## Converts boolean text values to boolean types.
  	###########################################################################
  	def to_bool(value)
    	TRUTHY.include?(value.try(:downcase))
  	end	
  end

	#############################################################################
	## tristate_boolean
	## Reads the field and interprets the result as nil, false, or true. Note, 
	## in Ruby anything that isn't false or nil os true. However, we deviate
	## from that to account for GIBCT truth values (c.f. Truthy)
	#############################################################################
  def tristate_boolean(field_sym)
   	raw = read_attribute(field_sym)
    raw.present? ? to_bool(raw) : nil  
  end
end