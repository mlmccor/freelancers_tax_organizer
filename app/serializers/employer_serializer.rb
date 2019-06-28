class EmployerSerializer < ActiveModel::Serializer
  attributes :id, :name, :tax_form
  has_many :checks
end
