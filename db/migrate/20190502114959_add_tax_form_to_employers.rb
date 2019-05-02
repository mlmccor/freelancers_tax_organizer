class AddTaxFormToEmployers < ActiveRecord::Migration[5.2]
  def change
    add_column :employers, :tax_form, :boolean, :default => false
  end
end
