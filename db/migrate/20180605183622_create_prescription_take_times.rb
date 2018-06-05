class CreatePrescriptionTakeTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :prescription_take_times do |t|
      t.references :prescription
      t.references :take_time

      t.timestamps
    end
  end
end
