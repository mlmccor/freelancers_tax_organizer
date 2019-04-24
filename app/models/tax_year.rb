class TaxYear < ApplicationRecord
  belongs_to :user
  has_many :checks
  has_many :employers, through: :checks
  validates :year, uniqueness: {scope: :user_id}
end
