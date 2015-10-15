class InstitutionsController < ApplicationController
  def home
    @url = Rails.env.production? ? request.host : 'http://localhost:3000'
  end

  def autocomplete
    search = params[:term]

    results = Institution.select('facility_code as value, institution as label').where("institution ~* ?", "^#{search}")
    respond_to do |format|
      format.json { render json: results }
    end
  end
end
