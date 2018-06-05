class CreateInsurances < ActiveRecord::Migration[5.2]
  def change
    create_table :insurances do |t|
      t.string :insurance_type
      t.string :insurance_id
      t.string :group
      t.string :bin
      t.string :pcn
      t.string :phone
      t.string :insurance_name
      t.references :patient, foreign_key: true

      t.timestamps
    end
  end
end
