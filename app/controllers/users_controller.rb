class UsersController < ApplicationController
  before_action :redirect_unless_logged_in, only: [:show, :update]

  def show
    @user = User.find_by(id: session[:user_id])
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
    binding.pry
    current_user.update(update_params)
  end

  def destroy
  end



  private



  def user_params
    params.require(:user).permit(:username, :email, :password, :current_tax_year)
  end

  def update_params
    params.require(:user).permit(:current_tax_year)
  end
end
