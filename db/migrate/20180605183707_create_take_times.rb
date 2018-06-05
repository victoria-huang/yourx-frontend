class CreateTakeTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :take_times do |t|
      t.string :day
      t.time :rx_time

      t.timestamps
    end
  end
end
