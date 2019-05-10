class TaxYearsController < ApplicationController

  def show
    @tax_year = TaxYear.find_by(id: params[:id])
    if current_user == @tax_year.user
      session[:current_tax_year_id] = @tax_year.id
    else
      redirect_to new_session_path
    end
  end
end
