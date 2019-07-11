class Check < ApplicationRecord
  belongs_to :user
  belongs_to :tax_year
  belongs_to :employer
  validates :check_date, presence: true
  validates :name, presence: true
  validates :amount, presence: true
  validates :mileage, presence: true

  def has_1099
    self.employer.tax_form
  end

  def self.by_year(year)
    where(tax_year: year)
  end

  def self.by_employer(employer)
    where(employer: employer)
  end

  def self.total_amount
    sum(&:amount)
  end

  def self.other_total_amount
    amounts = self.map{|check| check.amount}
    amounts.sum
  end

  def self.total_mileage
    sum(&:mileage)
  end

  def self.no_checks
    self.select{|check| check.employer.tax_form === false }
  end

end
