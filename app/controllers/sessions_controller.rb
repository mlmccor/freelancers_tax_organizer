class SessionsController < ApplicationController
  def index
  end

  def new
    @user = User.new
  end

  def create
    if auth
      @user = User.find_or_create_by(email: auth['info']['email']) do |u|
        u.username = auth['info']['name']
        u.password = SecureRandom.urlsafe_base64(n=6)
      end
      if @user.save
        session[:user_id] = @user.id
        @user.tax_years.find_or_create_by(year: DateTime.now.year)
        redirect_to user_path(@user)
      else
        redirect_to '/'
      end
    else
      @user = User.find_by(email: params[:email])
      if @user.authenticate(params[:password])
        session[:user_id] = @user.id
        @user.tax_years.find_or_create_by(year: DateTime.now.year)
        redirect_to user_path(@user)
      else
        redirect_to new_session_path, danger: 'Invalid Email or Password'
      end
    end
  end

  def destroy
    session.clear
    redirect_to '/'
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
