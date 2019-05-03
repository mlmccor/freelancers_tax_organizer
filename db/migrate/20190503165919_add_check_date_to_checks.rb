class AddCheckDateToChecks < ActiveRecord::Migration[5.2]
  def change
    add_column :checks, :check_date, :datetime
  end
end
