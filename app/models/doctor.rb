class Doctor < ApplicationRecord
  has_secure_password

  has_many :prescriptions
  has_many :patients, through: :prescriptions
  has_many :pharmacies, through: :prescriptions

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
