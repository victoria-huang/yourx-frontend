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
end
