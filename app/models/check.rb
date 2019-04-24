class Check < ApplicationRecord
  belongs_to :user
  belongs_to :tax_year
  belongs_to :employer
end
