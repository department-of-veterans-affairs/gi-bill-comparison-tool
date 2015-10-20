class InstitutionsController < ApplicationController
  def home
    @url = Rails.env.production? ? request.host : 'http://localhost:3000'
  end

  def autocomplete
    search_term = params[:term]

    results = Institution.autocomplete(search_term)
    respond_to do |format|
      format.json { render json: results }
    end
  end

  def search
    @military_status = params[:military_status]
    @spouse_active_duty = to_bool(params[:spouse_active_duty])
    @gi_bill_chapter = params[:gi_bill_chapter]
    @post_911_service = params[:post_911_service]
    @enlistment = params[:enlistment]
    @consecutive_service = params[:consecutive_service]
    @post_911_eligible = to_bool(params[:post_911_eligible])
    @dependents = params[:dependents]
    @institution = params[:institution]
    @online = to_bool(params[:online])
    @search_term = params[:institution]

    @results = @search_term.blank? ? [] : Institution.search(@search_term)
    respond_to do |format|
      format.json { render json: @results }
      format.html
    end
  end

  def to_bool(val)
    %w(yes true t 1).include?(val.to_s)
  end
end
