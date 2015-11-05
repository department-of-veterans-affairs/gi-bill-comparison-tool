class Institution < ActiveRecord::Base
  TRUTHY = %w(yes true t 1)
  EMPLOYER = 'ojt'

  belongs_to :institution_type, inverse_of: :institutions

  validates_presence_of :facility_code, :institution, :country, :institution_type_id
  validates_presence_of :state, :zip, :city, if: :in_usa?

  validates_uniqueness_of :facility_code

  validates_inclusion_of :poe, :yr, :student_veteran, :eight_keys, :dodmou, :online_all, 
      :sec_702, :accredited, :caution_flag, in: [true, false]

  scope :with_type, -> { 
    select('institutions.*, institution_types.name').joins(:institution_type) 
  }

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
    Institution.select('facility_code as value, institution as label')
      .where("institution ~* ?", "^#{search_term}")
  end

  #############################################################################
  ## search
  ## Searchs for schools containing the search_term in their name or city. 
  ## Also used when a facility_code is passed in. Results are returned as an
  ## array of hashes, even when there is only one hit.
  ##
  ## NOTE: facility_code is used for uniqueness, therefore it is possible that
  ## schools will appear to be duplicated since they have the same name but
  ## different facility codes.
  #############################################################################
  def self.search(search_term)
    fac = Institution.with_type.where(facility_code: search_term).to_sql
    inst = Institution.with_type.where("institution ~* ?", "#{search_term}").to_sql
    city = Institution.with_type.where("city ~* ?", "#{search_term}").to_sql

    if search_term.present?
      schools = ActiveRecord::Base.connection.execute("#{fac} UNION #{inst} UNION #{city} ORDER BY institution")
    else
      schools = ActiveRecord::Base.connection.execute(Institution.with_type.to_sql)
    end

    schools = schools.map do |school| 
      school.inject({}) { |m,r| m[r[0].to_sym] = r[1]; m }
    end.uniq { |school| school[:facility_code] }
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
end
