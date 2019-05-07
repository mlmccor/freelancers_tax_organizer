class SessionsController < ApplicationController
  def index
  end

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      @user.tax_years.find_or_create_by(year: DateTime.now.year)
      redirect_to user_path(@user)
    else
      redirect_to new_session_path, danger: 'Invalid Email or Password'
    end
  end

  def destroy
    session.clear
    redirect_to '/'
  end
end
