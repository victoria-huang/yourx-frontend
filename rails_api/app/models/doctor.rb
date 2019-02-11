class Doctor < ApplicationRecord
  has_secure_password

  has_many :prescriptions
  has_many :patients, through: :prescriptions
  has_many :pharmacies, through: :prescriptions

  validates :username, presence: true, uniqueness: true, length: { in: 4..20 }
  validates :password, presence: true, length: { in: 6..20 }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :specialty, presence: true
  validates :email, presence: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
