class Employer < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :tax_years, through: :checks
  scope :tax_form, -> { where(tax_form: true)}

  def self.no_form
    where(tax_form: false)
  end

  def self.current_tax_year
    TaxYear.find_by(id: session[:current_tax_year_id])
  end

end
