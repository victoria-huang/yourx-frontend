class TakeTime < ApplicationRecord
  has_many :prescription_take_times
  has_many :prescriptions, through: :prescription_take_times
end
