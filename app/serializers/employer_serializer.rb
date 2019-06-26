class EmployerSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :checks
end
