class PrescriptionTakeTimeSerializer < ActiveModel::Serializer
  attributes :id, :prescription_id, :take_time_id, :taken
end
