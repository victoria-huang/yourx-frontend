class CreateLabs < ActiveRecord::Migration[5.2]
  def change
    create_table :labs do |t|
      t.decimal :glucose
      t.integer :heart_rate
      t.integer :systolic_bp
      t.integer :diastolic_bp
      t.integer :height_inches
      t.decimal :weight_lbs
      t.decimal :temperature_f
      t.integer :resp_rate
      t.references :patient

      t.timestamps
    end
  end
end
