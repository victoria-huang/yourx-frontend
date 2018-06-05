class Prescription < ApplicationRecord
  belongs_to :doctor
  belongs_to :pharmacy
  belongs_to :patient
  has_many :prescription_take_times, dependent: :delete_all
  has_many :take_times, through: :prescription_take_times, dependent: :delete_all
end
