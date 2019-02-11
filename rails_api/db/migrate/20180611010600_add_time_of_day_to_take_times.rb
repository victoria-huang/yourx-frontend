class AddTimeOfDayToTakeTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :take_times, :time_of_day, :string
  end
end
