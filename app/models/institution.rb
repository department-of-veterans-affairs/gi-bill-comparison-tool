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

  before_save :numbers_with_null, on: [:create]

  #############################################################################
  ## numbers_with_null
  ## Certain number-like fields are allowed to contain nulls or strings too.
  ## If blank, these fields equate to null as well.
  #############################################################################
  def numbers_with_null
    if insturl.blank? || insturl.downcase == "null"
      self.locale = "Data not available" 
    end

    if locale.blank? || locale.downcase == "null"
      self.locale = "Data not available" 
    end

    if undergrad_enrollment.blank? || undergrad_enrollment.downcase == "null"
      self.undergrad_enrollment = "Data not available" 
    end

    if graduation_rate_veteran.blank? || graduation_rate_veteran.downcase == "null"
      self.graduation_rate_veteran = "Data not available" 
    end

    if graduation_rate_all_students.blank? || graduation_rate_all_students.downcase == "null"
      self.graduation_rate_all_students = "Data not available" 
    end

    if transfer_out_rate_veteran.blank? || transfer_out_rate_veteran.downcase == "null"
      self.transfer_out_rate_veteran = "Data not available" 
    end

    if transfer_out_rate_all_students.blank? || transfer_out_rate_all_students.downcase == "null"
      self.transfer_out_rate_all_students = "Data not available" 
    end

    if salary_all_students.blank? || salary_all_students.downcase == "null"
      self.salary_all_students = "Data not available" 
    end

    if repayment_rate_all_students.blank? || repayment_rate_all_students.downcase == "null"
      self.repayment_rate_all_students = "Data not available" 
    end

    if avg_stu_loan_debt.blank? || avg_stu_loan_debt.downcase == "null"
      self.avg_stu_loan_debt = "Data not available" 
    end

    if tuition_in_state.blank? || tuition_in_state.downcase == "null"
      self.tuition_in_state = "Data not available" 
    end

    if tuition_out_of_state.blank? || tuition_out_of_state.downcase == "null"
      self.tuition_out_of_state = "Data not available" 
    end

    if books.blank? || books.downcase == "null"
      self.books = "Data not available" 
    end

    true
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
end