class Patient < ApplicationRecord
  has_secure_password

  has_many :insurances
  has_many :emergency_contacts
  has_many :labs
  has_many :prescriptions
  has_many :adherences
  has_many :doctors, through: :prescriptions
  has_many :pharmacies, through: :prescriptions

  validates :username, presence: true, uniqueness: true, length: { in: 4..20 }
  validates :password, presence: true, length: { in: 6..20 }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def get_daily_rx_take_times
    self.prescriptions.map { |pres| pres.daily_rx_take_times }.flatten
  end

  def get_daily_meds_and_times
    daily_meds_with_times = []

    daily_meds = self.prescriptions.select { |pres| pres.daily_take_times.length > 0}

    daily_meds.each do |med|
      med_obj = {}
      med_obj["med"] = ActiveModelSerializers::SerializableResource.new(med, serializer: MedSerializer)
      med_obj["times"] = med.daily_rx_take_times
      daily_meds_with_times.push(med_obj)
    end

    daily_meds_with_times
  end

  def get_daily_times_taken
    self.get_daily_rx_take_times.select { |time| time["rx_take_time"].taken == true }
  end

  def daily_adherence
    total_times = self.get_daily_rx_take_times.length.to_f
    total_taken = self.get_daily_times_taken.length.to_f

    if total_times === 0
      100
    else
      (total_taken / total_times) * 100
    end
  end

  def self.track_adherence
    self.all.each do |patient|
      percent = patient.daily_adherence
      Adherence.create(percent: percent, patient_id: patient.id, created_at: 1.days.ago)
    end

    PrescriptionTakeTime.reset_taken
    # Rails.logger.info("Adherences created at #{Time.now}")
  end
end
