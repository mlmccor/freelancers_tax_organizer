class Employer < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :tax_years, through: :checks
  validates :id, uniqueness: true



  def lucrative?
    total = 0
    self.checks.each do |check|
      total += check.amount
    end
    if total > 600
      true
    else
      false
    end
  end
end
