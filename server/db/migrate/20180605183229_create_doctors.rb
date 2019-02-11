class CreateDoctors < ActiveRecord::Migration[5.2]
  def change
    create_table :doctors do |t|
      t.string :username
      t.string :password_digest
      t.string :image_url
      t.string :first_name
      t.string :last_name
      t.string :specialty
      t.string :street_one
      t.string :street_two
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
