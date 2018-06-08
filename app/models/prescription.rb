class Prescription < ApplicationRecord
  belongs_to :doctor, optional: true
  belongs_to :pharmacy, optional: true
  belongs_to :patient
  has_many :prescription_take_times, dependent: :delete_all
  has_many :take_times, through: :prescription_take_times, dependent: :delete_all

  def daily_take_times
    self.take_times.select { |time| time.day === DateTime.now.strftime("%A") }
  end

  def daily_rx_take_times
    times = []

    self.daily_take_times.each do |t|
      time_obj = {}
      time_obj["take_time"] = t
      rx_take_time = PrescriptionTakeTime.find_by(prescription_id: self.id, take_time_id: t.id)
      time_obj["rx_take_time"] = rx_take_time
      times << time_obj
    end

    times
  end
end
