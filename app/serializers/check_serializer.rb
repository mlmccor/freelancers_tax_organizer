class CheckSerializer < ActiveModel::Serializer
  attributes :id, :name, :check_date, :amount, :mileage, :description
  belongs_to :employer
end
