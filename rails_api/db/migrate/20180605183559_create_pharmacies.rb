class CreatePharmacies < ActiveRecord::Migration[5.2]
  def change
    create_table :pharmacies do |t|
      t.string :name
      t.string :street_one
      t.string :street_two
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :phone

      t.timestamps
    end
  end
end
