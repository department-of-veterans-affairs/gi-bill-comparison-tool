class InstitutionsController < ApplicationController

  NUM_PAGE_LINKS = 10

  def home
    @url = Rails.env.production? ? request.host : 'http://localhost:3000'
    @inputs = {
      military_status: 'veteran',
      spouse_active_duty: 'no',
      gi_bill_chapter: '33',
      cumulative_service: '1.0',
      enlistment_service: '3',
      consecutive_service: '0.8',
      elig_for_post_gi_bill: 'no',
      number_of_dependents: 0,
      online_classes: 'no',
      institution_search: ''
    }
  end

  def profile
    @id = params[:id]
    @inputs = {
      military_status: params[:military_status],
      spouse_active_duty: params[:spouse_active_duty],
      gi_bill_chapter: params[:gi_bill_chapter],
      cumulative_service: params[:cumulative_service],
      enlistment_service: params[:enlistment_service],
      consecutive_service: params[:consecutive_service],
      elig_for_post_gi_bill: params[:elig_for_post_gi_bill],
      number_of_dependents: params[:number_of_dependents],
      online_classes: params[:online_classes],
      institution_search: params[:institution_search],
      source: params[:source]
    }

    @school = Institution.find_by(facility_code: params[:facility_code])

    @back_url = make_url(params, search_page_path, params[:page] || 1)
    @veteran_retention_rate = @school.get_veteran_retention_rate
    @all_student_retention_rate = @school.get_all_student_retention_rate

    respond_to do |format|
      format.json { render json: @school }
      format.html
    end
  end

  def autocomplete
    search_term = params[:term]

    results = Institution.autocomplete(search_term)
    respond_to do |format|
      format.json { render json: results }
    end
  end

  def search
    # Required inputs
    @inputs = {
      military_status: params[:military_status],
      spouse_active_duty: params[:spouse_active_duty],
      gi_bill_chapter: params[:gi_bill_chapter],
      cumulative_service: params[:cumulative_service],
      enlistment_service: params[:enlistment_service],
      consecutive_service: params[:consecutive_service],
      elig_for_post_gi_bill: params[:elig_for_post_gi_bill],
      number_of_dependents: params[:number_of_dependents],
      online_classes: params[:online_classes],
      institution_search: params[:institution_search],
      source: params[:source]
    }

    @inputs[:type_name] = params[:type_name].try(:downcase)
    @inputs[:state] = params[:state].try(:downcase)
    @inputs[:country] = params[:country].try(:downcase)
    @inputs[:student_veteran_group] = params[:student_veteran_group].try(:downcase)
    @inputs[:yellow_ribbon_scholarship] = params[:yellow_ribbon_scholarship].try(:downcase)
    @inputs[:principles_of_excellence] = params[:principles_of_excellence].try(:downcase)
    @inputs[:f8_keys_to_veteran_success] = params[:f8_keys_to_veteran_success].try(:downcase)
    @inputs[:types] = params[:types].try(:downcase)

    @rset = Institution.search(@inputs[:institution_search])
    @kilter = Kilter.new(@rset)

    @kilter.track(:name).track(:state).track(:country).track(:student_veteran)
      .track(:yr).track(:poe).track(:eight_keys)

    # Institution types are "all", "employer" (ojt), "school" (!ojt)
    if @inputs[:type_name] == "school"
      @kilter.add(:name, "ojt", "!=")
    elsif @inputs[:type_name] == "employer"
      @kilter.add(:name, "ojt")
    end

    # States are "all", or distinct states in the rset
    if @inputs[:state].present? && @inputs[:state] != "all"
      @kilter.add(:state, @inputs[:state]) 
    end

    # Countries are "all", or distinct countries in the rset
    if @inputs[:country].present? && @inputs[:country] != "all"
      @kilter.add(:country, @inputs[:country]) 
    end

    # Student veterans groups are nil or boolean text values
    if @inputs[:student_veteran_group].present?
      @kilter.add(:student_veteran, Institution.to_bool(@inputs[:student_veteran_group]))
    end

    # Yellow ribbon scholarships are nil or boolean text values
    if @inputs[:yellow_ribbon_scholarship].present?
      @kilter.add(:yr, Institution.to_bool(@inputs[:yellow_ribbon_scholarship]))
    end

    # Principles of excellence are nil or boolean text values
    if @inputs[:principles_of_excellence].present?
      @kilter.add(:poe, Institution.to_bool(@inputs[:principles_of_excellence]))
    end

    # 8 keys to veterans success are nil or boolean text values
    if @inputs[:f8_keys_to_veteran_success].present?
      @kilter.add(:eight_keys, Institution.to_bool(@inputs[:f8_keys_to_veteran_success]))
    end

    # Types may be "all", or distinct institution types
    if @inputs[:types].present? && @inputs[:types] != "all"
      @kilter.add(:name, @inputs[:types])
    end

    @kilter.filter.count



    # # Perform query
    # @types = InstitutionType.pluck(:name).uniq.map { |t| t.downcase }
    # @results = Institution.search(@inputs[:institution_search])

    # # Filter collections
    # @total_results = @results.length
    # @schools = []
    # @employers = []
    # @states = {}
    # @countries = {}
    # @feature_student_veteran_group = []
    # @feature_yellow_ribbon_scholarship = []
    # @feature_principles_of_excellence = []
    # @feature_8_keys_to_veteran_success = []
    # @type_counts = {}

    # # For filter counts
    # @results.each do |result|
    #   # Institutions
    #   if result[:name].downcase != "ojt"
    #     @schools << result
    #   else
    #     @employers << result
    #   end

    #   # States
    #   if result[:state].present?
    #     state = result[:state].downcase
    #     if @states[state].present?
    #       @states[state] << result
    #     else
    #       @states[state] = [result]
    #     end
    #   end

    #   # Countries
    #   if result[:country].present?
    #     country = result[:country].downcase
    #     if @countries[country].present?
    #       @countries[country] << result
    #     else
    #       @countries[country] = [result]
    #     end
    #   end

    #   # Features
    #   @feature_student_veteran_group << result if result[:student_veteran]
    #   @feature_yellow_ribbon_scholarship << result if result[:yr]
    #   @feature_principles_of_excellence << result if result[:poe]
    #   @feature_8_keys_to_veteran_success << result if result[:eight_keys]

    #   # Types
    #   type = result[:name].downcase
    #   if @type_counts[type].present?
    #     @type_counts[type] << result
    #   else
    #     @type_counts[type] = [result]
    #   end
    # end

    # # Filter out the results based on criteria
    # # @inputs[:schools] = params[:schools].present?
    # if @inputs[:schools]
    #   @results = @results & @schools
    # # @inputs[:employers] = params[:employers].present?
    # elsif @inputs[:employers]
    #   @results = @results & @employers
    # end

    # # @inputs[:state] = params[:state].downcase if params[:state].present?
    # if @inputs[:state]
    #   @results = @results & @states[@inputs[:state]]
    # end

    # # @inputs[:country] = params[:country].downcase if params[:country].present?
    # if @inputs[:country]
    #   @results = @results & @countries[@inputs[:country]]
    # end

    # # @inputs[:student_veteran_group] = params[:student_veteran_group].present?
    # if @inputs[:student_veteran_group]
    #   @results = @results & @feature_student_veteran_group
    # end

    # # @inputs[:yellow_ribbon_scholarship] = params[:yellow_ribbon_scholarship].present?
    # if @inputs[:yellow_ribbon_scholarship]
    #   @results = @results & @feature_yellow_ribbon_scholarship
    # end

    # # @inputs[:principles_of_excellence] = params[:principles_of_excellence].present?
    # if @inputs[:principles_of_excellence]
    #   @results = @results & @feature_principles_of_excellence
    # end

    # # @inputs[:f8_keys_to_veteran_success] = params[:f8_keys_to_veteran_success].present?
    # if @inputs[:f8_keys_to_veteran_success]
    #   @results = @results & @feature_8_keys_to_veteran_success
    # end

    # # @input[:types] = params[:types] if params[:types].present?
    # if @inputs[:types]
    #   types = @inputs[:types].split(',')
    #   types.each do |type|
    #     if @type_counts[type].present?
    #       @results = @results & @type_counts[type]
    #     else
    #       @results = []
    #     end
    #   end
    # end
    # @total_filtered_results = @results.length

    # # Pagination
    # @page = 1
    # @total_pages = 1
    # @before_pages = []
    # @after_pages = []
    # if has_a_valid_int(params, :page) && has_a_valid_int(params, :num_results) && @results.length > 1
    #   page_param = params[:page].to_i
    #   num_results_param = params[:num_results].to_i

    #   @total_pages = (@results.length.to_f / num_results_param.to_f).ceil
    #   if @total_pages >= page_param.to_f
    #     @page = page_param
    #   end

    #   start_index = (@page * num_results_param) - num_results_param
    #   end_index = start_index + num_results_param - 1

    #   @results = @results[start_index..end_index]

    #   # TODO: Move the rest of the pagination logic to the ERB
    #   @start_page = 1
    #   @end_page = @total_pages
    #   @page_url = make_url(@inputs, search_page_path, @page)

    #   # When < 10 pages: Do nothing

    #   # Page is 1-5 for more than 10 results
    #   if @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) < 1
    #     @start_page = 1
    #     @end_page = NUM_PAGE_LINKS
    #   # Current page has 4 prior pages and 4 pages ahead
    #   elsif @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) >= 1 && (@page+NUM_PAGE_LINKS/2) <= @total_pages
    #     @start_page = @page - NUM_PAGE_LINKS/2 + 1
    #     @end_page = @page + NUM_PAGE_LINKS/2
    #   # Current page has 4 prior pages, but not 4 pages ahead
    #   elsif @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) >= 1 && (@page+NUM_PAGE_LINKS/2) > @total_pages
    #     pages_to_end = (@total_pages - @page)
    #     @start_page = @page - (NUM_PAGE_LINKS - pages_to_end) + 1
    #     @end_page = @total_pages
    #   end
    #   @page_range = (@start_page..@end_page)

    #   @page_urls = {}
    #   @page_range.each { |p| @page_urls[p] = make_url(@inputs, search_page_path, p) }
    #   @page_urls[:first] = make_url(@inputs, search_page_path, 1)
    #   @page_urls[:last] = make_url(@inputs, search_page_path, @total_pages)
    # end

    # # If from the home page, we may need to notate for skipping when only 1 result
    # # set the source to search for the purposes of creating a url for the profile to return to
    # from_home = @inputs[:source] == "home" 
    # @inputs[:source] = "search" if !from_home || from_home && @results.try(:length) > 1
      
    # # Generate URLs for school profiles
    # @results.each do |result|
    #   result[:student_veteran] = to_bool(result[:student_veteran])
    #   result[:poe] = to_bool(result[:poe])
    #   result[:yr] = to_bool(result[:yr])
    #   result[:eight_keys] = to_bool(result[:eight_keys])
    #   # This is a tri-state boolean as a string, needs downcase
    #   result[:caution_flag] = to_bool(result[:caution_flag].try(:downcase))
    #   result[:profile_url] = make_url(@inputs, profile_path, @page, result)
    # end

    # respond_to do |format|
      # format.json { render json: @results }
      # format.html { redirect_to @results[0][:profile_url] if @results.length == 1 && from_home }
    # end
  end

  # TODO: Move this logic into a view
  def make_url(inputs, path, page_num, school=nil)
    url = "#{path}?" + inputs.map{|k,v| "#{k}=#{v}"}.join('&') + "&page=#{page_num}&num_results=#{RESULTS_PER_PAGE}"

    if school
      url += "&facility_code=#{school[:facility_code]}"
    end

    url
  end

  def to_bool (val)
    %w(yes true t 1).include?(val.to_s)
  end

  def has_a_valid_int(a_hash, key)
    a_hash.has_key?(key) && a_hash[key] =~ /^\d+$/ && a_hash[key].to_i > 0
  end

  def has_a_valid_instituion_type(a_hash, key)
    a_hash.has_key?(key) && %w(school, employer).include?(a_hash[key].downcase)
  end
end
