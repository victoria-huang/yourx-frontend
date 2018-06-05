class CreateEmergencyContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :emergency_contacts do |t|
      t.string :name
      t.string :relationship
      t.string :street_one
      t.string :street_two
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :phone
      t.string :email
      t.references :patient

      t.timestamps
    end
  end
end
