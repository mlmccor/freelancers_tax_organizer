class TaxYear < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :employers, through: :checks
  validates :year, uniqueness: {scope: :user_id}

  def self.lucrative_employers
    tax_year.employers.select do |employer|
      employer.lucrative? == true
    end
  end

  def other_employers(tax_year)
    tax_year.employers.select do |employer|
      employer.lucrative? == false
    end
  end


end
