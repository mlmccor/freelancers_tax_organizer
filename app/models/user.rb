class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  has_many :tax_years
  has_many :checks, through: :tax_years
  has_many :employers, through: :checks

  def current_tax_year
    TaxYear.find_by(id: self.current_tax_year_id)
  end

  def current_tax_year=(year)
    self.current_tax_year_id = year.id
  end

  def self.lucrative_employers
    self.employers.select do |employer|
      employer.lucrative? == true
    end
  end

  def self.other_employers
    self.employers.select do |employer|
      employer.lucrative? == false
    end
  end


end
