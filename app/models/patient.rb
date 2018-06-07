class Patient < ApplicationRecord
  has_secure_password

  has_many :insurances
  has_many :emergency_contacts
  has_many :labs
  has_many :prescriptions
  has_many :doctors, through: :prescriptions
  has_many :pharmacies, through: :prescriptions

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  def get_daily_take_times
    self.prescriptions.map { |pres| pres.daily_take_times }.flatten
  end

  def get_daily_meds_and_times
    daily_meds_with_times = {}

    daily_meds = self.prescriptions.select { |pres| pres.daily_take_times.length > 0}

    daily_meds.each do |med|
      daily_meds_with_times[med] = med.daily_take_times
    end

    daily_meds_with_times
  end

  def get_daily_meds_taken
    self.get_daily_take_times.select { |time| time.taken == true }
  end

  def daily_adherence
    total_times = self.get_daily_take_times.length
    total_taken = self.get_daily_meds_taken.length

    total_taken / total_times
  end
end
