class SessionsController < ApplicationController
  def index
  end
  
  def new
  end

  def create
    @user = User.find_by(id: params[:user_id])
    return head(:forbidden) unless @user.authenticate(params[:password])
    session[:user_id] = @user.id
    @user.tax_years.find_or_create_by(year: Datetime.now.year)
    redirect_to user_path(@user)
  end
end
