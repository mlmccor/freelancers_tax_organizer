class TaxYear < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :employers, through: :checks
  validates :year, uniqueness: {scope: :user_id}

  def self.employer_gigs(tax_year, employer)
    tax_year.checks.select do |check|
      check.employer == employer
    end
  end



end
