class Check < ApplicationRecord
  belongs_to :user
  belongs_to :tax_year
  belongs_to :employer

  def self.total_amount(checks)
    total = 0
    checks.each do |check|
      total += check.amount
    end
    total
  end

  def self.other_total_amount(employer_collection)
    total = 0
    Check.total_amount(employer_collection.map {|employer| employer.checks }.flatten)
  end

  def self.total_mileage(checks)
    total = 0
    checks.each do |check|
      total += check.mileage
    end
    total
  end

  def self.other_total_mileage(employer_collection)
    total = 0
    Check.total_mileage(employer_collection.map {|employer| employer.checks }.flatten)
  end
end
