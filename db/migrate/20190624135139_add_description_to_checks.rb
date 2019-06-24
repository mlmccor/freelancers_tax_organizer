class AddDescriptionToChecks < ActiveRecord::Migration[5.2]
  def change
    add_column :checks, :description, :text
  end
end
