class PrescriptionTakeTime < ApplicationRecord
  belongs_to :prescription
  belongs_to :take_time
end
