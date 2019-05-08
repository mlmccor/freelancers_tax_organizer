class Check < ApplicationRecord
  belongs_to :user
  belongs_to :tax_year
  belongs_to :employer

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

  def self.other_total_mileage(employer_collection)
    total = 0
    Check.total_mileage(employer_collection.map {|employer| employer.checks }.flatten)
  end


end
