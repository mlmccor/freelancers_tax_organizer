class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :email, presence: true
  validates :password, presence: true
  has_many :tax_years
  has_many :checks, through: :tax_years
  has_many :employers, through: :checks

  def lucrative_employers
    self.employers.select do |employer|
      employer.lucrative? == true
    end
  end

  def other_employers
    self.employers.select do |employer|
      employer.lucrative? == false
    end
  end


end
