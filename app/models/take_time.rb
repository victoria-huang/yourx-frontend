class TakeTime < ApplicationRecord
  has_many :prescription_take_times, dependent: :delete_all
  has_many :prescriptions, through: :prescription_take_times

  # validates :day, presence: true, inclusion: { in: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }
  # validates :rx_time, presence: true

  before_create :determine_time_of_day

  def determine_time_of_day
    hour = self.rx_time.strftime("%I").to_i
    meridian = self.rx_time.strftime("%p")

    if meridian === "AM"
      if hour >= 12 || hour < 6
        self.time_of_day = "night"
      else
        self.time_of_day = "morning"
      end
    else
      if hour >= 12 || hour < 6
        self.time_of_day = "afternoon"
      else
        self.time_of_day = "evening"
      end
    end
  end
end
