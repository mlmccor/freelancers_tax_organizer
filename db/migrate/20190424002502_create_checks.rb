class CreateChecks < ActiveRecord::Migration[5.2]
  def change
    create_table :checks do |t|
      t.string :name
      t.integer :amount
      t.integer :user_id
      t.integer :employer_id
      t.integer :mileage
      t.integer :tax_year_id

      t.timestamps
    end
  end
end
