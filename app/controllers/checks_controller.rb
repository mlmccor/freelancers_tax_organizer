class ChecksController < ApplicationController
  def index
    employer = Employer.find_by(id: params[:employer_id])
    @checks = employer.checks
    respond_to do |format|
      format.html
      format.json {render json: @checks, each_serializer: CheckSerializer, status: 201}
    end
  end

  def show
    @check = Check.find_by(id: params[:id].to_i)
    respond_to do |format|
      format.html
      format.json {render json: @check, status: 201}
    end
  end

  def new
    @check = Check.new
    @check.tax_year = TaxYear.find_by(id: session[:current_tax_year_id])
  end

  def create
    @check = Check.new(check_params)
    @check.tax_year = TaxYear.find_by(id: params[:tax_year_id])
    @check.user = User.find_by(id: session[:user_id])
    if !params[:check][:employer].empty?
      @check.employer = Employer.find_or_create_by(name: params[:check][:employer], user: User.find(session[:user_id]))
    end
    if @check.save
      render json: @check, status: 201
    else
      render :new
    end
  end

  def edit
    @check = Check.find_by(id: params[:id])
  end

  def update
    @check = Check.find_by(id: params[:id])
    if @check.update(check_params)
      redirect_to tax_year_check_path(@check)
    else
      render :edit
    end
  end

  def destroy
    @check = Check.find_by(id: params[:id])
    @tax_year = @check.tax_year
    @check.destroy
    redirect_to tax_year_path(@tax_year)
  end


  private

  def check_params
    params.require(:check).permit(:name, :amount, :mileage, :employer_id, :check_date, :description, employer_attributes: [:name])
  end
end
