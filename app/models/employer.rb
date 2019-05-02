class Employer < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :tax_years, through: :checks
  validates :id, uniqueness: true


  
end
