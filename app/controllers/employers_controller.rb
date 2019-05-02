class EmployersController < ApplicationController

  def edit
    @employer = Employer.find_by(id: params[:id])
  end
end
