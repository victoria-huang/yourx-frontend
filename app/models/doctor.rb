class Doctor < ApplicationRecord
  has_many :prescriptions
  has_many :patients, through: :prescriptions
  has_many :pharmacies, through: :prescriptions
end
