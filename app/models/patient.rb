class Patient < ApplicationRecord
  has_many :insurances
  has_many :emergency_contacts
  has_many :labs
  has_many :prescriptions
  has_many :doctors, through: :prescriptions
  has_many :pharmacies, through: :prescriptions
end
