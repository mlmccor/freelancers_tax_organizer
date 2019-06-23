class CheckSerializer < ActiveModel::Serializer
  attributes :id, :name, :check_date, :amount, :mileage
  belongs_to :employer
end
