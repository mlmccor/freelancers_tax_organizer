class ApplicationController < ActionController::Base
  add_flash_types :danger, :info, :warning, :success

  private

  def redirect_unless_logged_in
    redirect_to new_session_path unless logged_in?
  end

  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end
end
