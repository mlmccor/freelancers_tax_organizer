class Employer < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :tax_years, through: :checks
  scope :tax_form, -> { where(tax_form: true)}

  def self.no_form
    where(tax_form: false)
  end

  def self.employer_checks(year)
    checks = []
    self.all.each {|employer| checks << employer.checks.by_year(year)}
    checks
  end

  def self.no_form_total_amount(current_tax_year)
    self.no_form.employer_checks.by_year(current_tax_year).total_amount
  end

  def self.no_form_total_mileage
    self.map{|employer| employer.mileage}.by_year(current_tax_year).total_mileage
  end

  def self.no_form_check_amounts
    total = 0
    map {|employer| employer.checks}.uniq
  end


end
