class EmployersController < ApplicationController

  def show
    @employer = Employer.find_by(id: params[:id])
  end

  def edit
    @employer = Employer.find_by(id: params[:id])
  end

  def update
    @employer = Employer.find_by(id: params[:id])
    @employer.update(update_params)
    if @employer.save
      tax_year = TaxYear.find_by(id: session[:current_tax_year_id])
      redirect_to tax_year_path(tax_year)
    else
      render :edit
    end
  end

  def destroy
    @employer = Employer.find_by(id: params[:id])
    @employer.destroy
    redirect_to tax_year_path(id: session[:current_tax_year_id])
  end

  private

  def update_params
    params.require(:employer).permit(:name, :tax_form)
  end
end
