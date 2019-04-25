class UsersController < ApplicationController
  require 'date'

  def show
    return head(:forbidden) unless session.include? :user_id
    @user = User.find_by(id: session[:user_id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
     if @user.save
       @user.tax_years.find_or_create_by(year: DateTime.now.year).save
       session[:user_id] = @user.id
       redirect_to user_path(@user)
     else
       render :new
     end
  end



  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :current_tax_year)
  end

end
