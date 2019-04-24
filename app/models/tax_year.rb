class TaxYear < ApplicationRecord
  belongs_to :user
  has_many :checks
end
