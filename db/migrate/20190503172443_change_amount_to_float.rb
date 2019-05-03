class ChangeAmountToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :checks, :amount, :float
  end
end
