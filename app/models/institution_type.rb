class InstitutionType < ActiveRecord::Base
  has_many :institutions, inverse_of: :institution_type

  validates_presence_of :name
  validates_uniqueness_of :name

  TYPES = { 
    "public" => "Public", "ojt" => "On The Job Training", 
    "for profit" => "For Profit", "private" => "Private",
    "flight" => "Flight", "correspondence" => "Correspondence",
    "foreign" => "Foreign"
  }

  #############################################################################
  ## school_type_display
  #############################################################################  
  def display
    InstitutionType::TYPES[name]
  end
end
