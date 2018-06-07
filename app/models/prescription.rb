class Prescription < ApplicationRecord
  belongs_to :doctor, optional: true
  belongs_to :pharmacy, optional: true
  belongs_to :patient
  has_many :prescription_take_times, dependent: :delete_all
  has_many :take_times, through: :prescription_take_times, dependent: :delete_all

  def daily_take_times
    self.take_times.select { |time| time.day === DateTime.now.strftime("%A") }
  end
end
