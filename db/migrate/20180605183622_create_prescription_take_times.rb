class CreatePrescriptionTakeTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :prescription_take_times do |t|
      t.references :prescription, foreign_key: true
      t.references :take_time, foreign_key: true

      t.timestamps
    end
  end
end
