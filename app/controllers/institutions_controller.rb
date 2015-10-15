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
end
