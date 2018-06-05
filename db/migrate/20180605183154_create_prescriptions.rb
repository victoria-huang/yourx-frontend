class CreatePrescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :prescriptions do |t|
      t.string :drug_name
      t.integer :amount_per_dose
      t.string :formulation
      t.string :route
      t.integer :daily_freq
      t.string :weekly_freq
      t.datetime :start_date
      t.datetime :end_date
      t.references :doctor, foreign_key: true
      t.references :pharmacy, foreign_key: true
      t.references :patient, foreign_key: true

      t.timestamps
    end
  end
end
