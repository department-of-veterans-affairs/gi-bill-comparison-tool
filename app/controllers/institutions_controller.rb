# frozen_string_literal: true

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
    params_to_inputs

    @school = Institution.find_by(facility_code: params[:facility_code])
    @kilter = Kilter.new(Institution.none)

    @back_url = @kilter.to_href(search_page_path, @inputs, page: @page)
    @veteran_retention_rate = @school.try(:get_veteran_retention_rate)
    @all_student_retention_rate = @school.try(:get_all_student_retention_rate)

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
    params_to_inputs

    @rset = Institution.search(@inputs[:institution_search])
    @kilter = Kilter.new(@rset)

    @kilter.track(:name).track(:state).track(:country).track(:student_veteran)
           .track(:yr).track(:poe).track(:eight_keys)

    # Institution types are "all", "employer" (ojt), "school" (!ojt)
    if @inputs[:type_name].present? && @inputs[:type_name] != 'all'
      @kilter.add(:name, Institution::EMPLOYER, @inputs[:type_name] == 'school' ? '!=' : '=')
    end

    # States are "all", or distinct states in the rset
    if @inputs[:state].present? && @inputs[:state] != 'all'
      @kilter.add(:state, @inputs[:state])
    end

    # Countries are "all", or distinct countries in the rset
    if @inputs[:country].present? && @inputs[:country] != 'all'
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
    if @inputs[:types].present? && @inputs[:type_name] != 'all'
      @kilter.add(:name, @inputs[:types])
    end

    # Sort by institution ascending
    @kilter.filter.sort(:institution).count

    # Page the returned institutions
    @kilter.set_size.page(@page)

    # Go directly to school if only one result
    if @kilter.count_filtered == 1 && @inputs[:source] == 'home'
      @inputs[:facility_code] = @kilter.filtered_rset.first.facility_code
      profile = @kilter.to_href(profile_path, @inputs)
    else
      @inputs[:source] = 'search'
      profile = nil
    end

    respond_to do |format|
      format.json { render json: @kilter.page(@page) }
      format.html { redirect_to profile if profile.present? }
    end
  end

  def params_to_inputs
    # Standard "about you" parameters
    @inputs = {
      military_status: params[:military_status],
      spouse_active_duty: params[:spouse_active_duty],
      gi_bill_chapter: params[:gi_bill_chapter],
      cumulative_service: params[:cumulative_service],
      enlistment_service: params[:enlistment_service],
      consecutive_service: params[:consecutive_service],
      elig_for_post_gi_bill: params[:elig_for_post_gi_bill],
      number_of_dependents: params[:number_of_dependents],
      online_classes: params[:online_classes]
    }

    # Search parameters
    @inputs[:source] = params[:source].try(:downcase)
    @inputs[:institution_search] = params[:institution_search].try(:strip)
    @inputs[:type_name] = params[:type_name].try(:downcase)
    @inputs[:state] = params[:state].try(:downcase)
    @inputs[:country] = params[:country].try(:downcase)
    @inputs[:student_veteran_group] = params[:student_veteran_group].try(:downcase)
    @inputs[:yellow_ribbon_scholarship] = params[:yellow_ribbon_scholarship].try(:downcase)
    @inputs[:principles_of_excellence] = params[:principles_of_excellence].try(:downcase)
    @inputs[:f8_keys_to_veteran_success] = params[:f8_keys_to_veteran_success].try(:downcase)
    @inputs[:types] = params[:types].try(:downcase)

    # Pagination - do not put in inputs
    @page = params[:page].try(:to_i) || 1
  end
end
