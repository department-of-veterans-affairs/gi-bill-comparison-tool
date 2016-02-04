class Institution < ActiveRecord::Base
  TRUTHY = %w(yes true t 1)
  EMPLOYER = 'ojt'

  belongs_to :institution_type, inverse_of: :institutions

  validates :facility_code, uniqueness: true, presence: true
  validates :institution, presence: true
  validates :country, presence: true
  validates :institution_type_id, presence: true

  scope :with_type, -> { 
    select('institutions.*, institution_types.name as type_name').joins(:institution_type) 
  }

  #############################################################################
  ## credit_for_mil_training
  #############################################################################
  def credit_for_mil_training
    raw = read_attribute(:credit_for_mil_training).try(:downcase)
    raw.present? ? raw == "yes" : nil  
  end

  #############################################################################
  ## vet_poc
  #############################################################################
  def vet_poc
    raw = read_attribute(:vet_poc).try(:downcase)
    raw.present? ? raw == "yes" : nil  
  end

  #############################################################################
  ## student_vet_grp_ipeds
  #############################################################################
  def student_vet_grp_ipeds
    raw = read_attribute(:student_vet_grp_ipeds).try(:downcase)
    raw.present? ? raw == "yes" : nil  
  end

  #############################################################################
  ## soc_member
  #############################################################################
  def soc_member
    raw = read_attribute(:soc_member).try(:downcase)
    raw.present? ? raw == "yes" : nil  
  end

  #############################################################################
  ## online_all
  #############################################################################
  def online_all
    raw = read_attribute(:online_all).try(:downcase)
    raw.present? ? raw == "yes" : nil  
  end

  #############################################################################
  ## correspondence?
  ## True if school is a correspondence school
  #############################################################################
  def correspondence?
    institution_type.name.downcase == 'correspondence'
  end

  #############################################################################
  ## flight?
  ## True if school is a flight school
  #############################################################################
  def flight?
    institution_type.name.downcase == 'flight'
  end

  #############################################################################
  ## ojt?
  ## True if school is ojt.
  #############################################################################
  def ojt?
    institution_type.name.downcase == 'ojt'
  end
  
  #############################################################################
  ## school?
  ## True if school is not ojt.
  #############################################################################
  def school?
    institution_type.name.downcase != 'ojt'
  end

  #############################################################################
  ## in_usa?
  ## True if school is in USA
  #############################################################################
  def in_usa?
    country.try(:downcase) == 'usa'
  end

  #############################################################################
  ## to_bool
  ## Converts boolean text values to boolean types
  #############################################################################
  def self.to_bool(value)
    TRUTHY.include?(value.try(:downcase))
  end

  #############################################################################
  ## autocomplete
  ## Given a search term representing a partial school name, returns all
  ## schools starting with the search term.
  #############################################################################
  def self.autocomplete(search_term)
    Institution.select("facility_code as value, institution as label")
      .where("lower(institution) LIKE (?)", "#{search_term.try(:downcase)}%")
  end

  #############################################################################
  ## search
  ## Searchs for schools containing the search_term in their name or city. 
  ## Also used when a facility_code is passed in. Results are returned as an
  ## array of hashes, even when there is only one hit.
  ##
  ## Search for cities and institutions are based on LIKE %term% and will 
  ## return every city and institution matching the wildcard %term%. Searching 
  ## by facility code is exact match.
  ##
  ## NOTE: facility_code is used for uniqueness, therefore it is possible that
  ## schools will appear to be duplicated since they have the same name but
  ## different facility codes.
  #############################################################################
  def self.search(search_term)
    if search_term.empty?
      @rset = Institution.with_type
    else
    
      search_term = search_term.downcase

      clause = ["facility_code = (?) OR lower(institution) LIKE (?) OR lower(city) LIKE (?)"]
      terms = [search_term, "%#{search_term}%", "%#{search_term}%"]

      @rset = Institution.with_type.where(clause + terms)
    end
  end

  #############################################################################
  ## get_veteran_retention_rate
  ## Calculates veteran retention rate adapted from Patrick's JS functions
  #############################################################################
  def get_veteran_retention_rate
    # If upper class use ba, otherwise use otb
    upper_class = [3, 4].include?(pred_degree_awarded)  || 
      va_highest_degree_offered.try(:downcase) == "4-year"

    if upper_class
      rate = retention_rate_veteran_ba.present? ? retention_rate_veteran_ba : retention_rate_veteran_otb
    else
      rate = retention_rate_veteran_otb.present? ? retention_rate_veteran_otb : retention_rate_veteran_ba
    end

    rate
  end

  #############################################################################
  ## get_all_student_retention_rate
  ## Calculates all students retention rate adapted from Patrick's JS functions
  #############################################################################
  def get_all_student_retention_rate
    # If upper class use ba, otherwise use otb
    upper_class = [3, 4].include?(pred_degree_awarded)  || 
      va_highest_degree_offered.try(:downcase) == "4-year"

    if upper_class
      rate = retention_all_students_ba.present? ? retention_all_students_ba : retention_all_students_otb
    else
      rate = retention_all_students_otb.present? ? retention_all_students_otb : retention_all_students_ba
    end
  
    rate
  end

  #############################################################################
  ## highest_degree
  ## Returns the highest degree offered.
  #############################################################################
  def highest_degree
    degrees = {
      0 => nil, "ncd" => "Certificate", 1 => "Certificate", 
      "2-year" => 2, 2 => 2, 3 => 4, 4 => 4, "4-year" => 4 
    }
    
    degrees[pred_degree_awarded] || degrees[va_highest_degree_offered.try(:downcase)] || "No Data" 
  end
end
