class UsersController < ApplicationController
  before_action :redirect_unless_logged_in, only: [:show, :update]

  def show
    @user = User.find_by(id: params[:id])
    if !@user == current_user
      redirect_to new_session_path
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.tax_years.build(year: DateTime.now.year)
     if @user.save
       session[:user_id] = @user.id
       redirect_to user_path(@user)
     else
       render :new
     end
  end

  def update
    current_user.update(user_params)
  end

  def destroy
    @user = User.find_by(id: session[:user_id])
    session.clear
    @user.destroy
    redirect_to '/'
  end



  private



  def user_params
    params.require(:user).permit(:username, :email, :password)
  end


end
