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
      t.references :doctor
      t.references :pharmacy
      t.references :patient

      t.timestamps
    end
  end
end
