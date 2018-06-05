class Prescription < ApplicationRecord
  belongs_to :doctor
  belongs_to :pharmacy
  belongs_to :patient
end
