class TaxYearsController < ApplicationController

  def show
    @tax_year = TaxYear.find_by(id: params[:id])
    session[:current_tax_year_id] = @tax_year.id
  end
end
