class InstitutionsController < ApplicationController
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
    @schools.each do |school|
      school[:student_veteran] = to_bool(school[:student_veteran])
      school[:poe] = to_bool(school[:poe])
      school[:yr] = to_bool(school[:yr])
      school[:eight_keys] = to_bool(school[:eight_keys])
      school[:caution_flag] = to_bool(school[:caution_flag])

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

  def to_bool(val)
    %w(yes true t 1).include?(val.to_s)
  end
end