class ChecksController < ApplicationController
  def index
  end

  def show
  end

  def new
    binding.pry
    @check = Check.new
    @check.tax_year = TaxYear.find_by(id: session[:current_tax_year_id])
  end

  def create
    @check = Check.new(check_params)
    @check.tax_year = TaxYear.find_by(id: session[:current_tax_year_id])
    @check.user = User.find_by(id: session[:user_id])
    if !params[:check][:employer].empty?
      @check.employer = Employer.find_or_create_by(name: params[:check][:employer], user: User.find(session[:user_id]))
    end
    if @check.save
      redirect_to tax_year_path(@check.tax_year)
    else
      render :new
    end
  end

  def destroy
  end


  private

  def check_params
    params.require(:check).permit(:name, :amount, :mileage, :employer_id, :check_date)
  end
end
