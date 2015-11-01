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
      institution_search: params[:institution_search]
    }

    @school = Institution.find_by(facility_code: params[:facility_code])


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
      institution_search: params[:institution_search]
    }

    @types = InstitutionType.pluck(:name).uniq.map { |t| t.downcase }
    @countries = []
    @states = []

    @schools = Institution.search(@inputs[:institution_search])
    @total_schools = @schools.length

    # Pagination
    @page = 1
    @total_pages = 1
    @before_pages = []
    @after_pages = []
    if has_a_valid_int(params, :page) && has_a_valid_int(params, :num_schools) && @total_schools > 1
      page_param = params[:page].to_i
      num_schools_param = params[:num_schools].to_i

      @total_pages = (@schools.length.to_f / num_schools_param.to_f).ceil
      if @total_pages >= page_param.to_f
        @page = page_param
      end

      start_index = (@page * num_schools_param) - num_schools_param
      end_index = start_index + num_schools_param - 1

      @schools = @schools[start_index..end_index]

      # TODO: Move the rest of the pagination logic to the ERB
      @start_page = 1
      @end_page = @total_pages
      @page_url = make_search_page_url(@inputs, @page)

      # When < 10 pages: Do nothing

      # Page is 1-5 for more than 10 results
      if @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) < 1
        @start_page = 1
        @end_page = NUM_PAGE_LINKS
      # Current page has 4 prior pages and 4 pages ahead
      elsif @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) >= 1 && (@page+NUM_PAGE_LINKS/2) <= @total_pages
        @start_page = @page - NUM_PAGE_LINKS/2 + 1
        @end_page = @page + NUM_PAGE_LINKS/2
      # Current page has 4 prior pages, but not 4 pages ahead
      elsif @total_pages > NUM_PAGE_LINKS && (@page-NUM_PAGE_LINKS/2) >= 1 && (@page+NUM_PAGE_LINKS/2) > @total_pages
        pages_to_end = (@total_pages - @page)
        @start_page = @page - (NUM_PAGE_LINKS - pages_to_end) + 1
        @end_page = @total_pages
      end
      @page_range = (@start_page..@end_page)

      @page_urls = {}
      @page_range.each { |p| @page_urls[p] = make_search_page_url(@inputs, p) }
      @page_urls[:first] = make_search_page_url(@inputs, 1)
      @page_urls[:last] = make_search_page_url(@inputs, @total_pages)
    end

    # Generate URLs for school profiles and construct a list of states and countries
    @schools.each do |school|
      school[:student_veteran] = to_bool(school[:student_veteran])
      school[:poe] = to_bool(school[:poe])
      school[:yr] = to_bool(school[:yr])
      school[:eight_keys] = to_bool(school[:eight_keys])
      school[:caution_flag] = to_bool(school[:caution_flag])

      school[:profile_url] = make_search_page_url(@inputs, @page, school)

      school[:profile_url] = "#{profile_path}?facility_code=#{school[:facility_code]}"
      school[:profile_url] += "&military_status=" + @inputs[:military_status]
      school[:profile_url] += "&spouse_active_duty=" + @inputs[:spouse_active_duty]
      school[:profile_url] += "&gi_bill_chapter=" + @inputs[:gi_bill_chapter]
      school[:profile_url] += "&cumulative_service=" + @inputs[:cumulative_service]
      school[:profile_url] += "&enlistment_service=" + @inputs[:enlistment_service]
      school[:profile_url] += "&consecutive_service=" + @inputs[:consecutive_service]
      school[:profile_url] += "&elig_for_post_gi_bill=" + @inputs[:elig_for_post_gi_bill]
      school[:profile_url] += "&number_of_dependents=" + @inputs[:number_of_dependents]
      school[:profile_url] += "&online_classes=" + @inputs[:online_classes]
      school[:profile_url] += "&institution_search" + @inputs[:institution_search]
      school[:profile_url] += "&page=#{@page}"
      school[:profile_url] += "&num_schools=#{SCHOOLS_PER_PAGE}"

      @states << school[:state] if school[:state].present?
      @countries << school[:country] if school[:country].present?
    end

    @countries = @countries.uniq
    @states = @states.uniq

    respond_to do |format|
      format.json { render json: @schools }
      format.html { redirect_to @schools[0][:profile_url] if @schools.length == 1 }
    end
  end

  # TODO: Move this logic into a view
  def make_search_page_url(inputs, page, school=nil)
    url = ["#{search_page_path}?",
      "military_status=#{inputs[:military_status]}",
      "&spouse_active_duty=#{inputs[:spouse_active_duty]}",
      "&gi_bill_chapter=#{inputs[:gi_bill_chapter]}",
      "&cumulative_service=#{inputs[:cumulative_service]}",
      "&enlistment_service=#{inputs[:enlistment_service]}",
      "&consecutive_service=#{inputs[:consecutive_service]}",
      "&elig_for_post_gi_bill=#{inputs[:elig_for_post_gi_bill]}",
      "&number_of_dependents=#{inputs[:number_of_dependents]}",
      "&online_classes=#{inputs[:online_classes]}",
      "&institution_search=#{inputs[:institution_search]}",
      "&page=#{page}",
      "&num_schools=#{SCHOOLS_PER_PAGE}"].join

    if school
      url += "facility_code=#{school[:facility_code]}"
    end

    url
  end

  def to_bool (val)
    %w(yes true t 1).include?(val.to_s)
  end

  def has_a_valid_int(a_hash, key)
    a_hash.has_key?(key) && a_hash[key] =~ /^\d+$/ && a_hash[key].to_i > 0
  end
end
