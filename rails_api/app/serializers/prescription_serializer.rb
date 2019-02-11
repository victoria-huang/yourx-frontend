class PrescriptionSerializer < ActiveModel::Serializer
  attributes :med, :times

  def med
    ActiveModelSerializers::SerializableResource.new(object, serializer: MedSerializer)
  end

  def times
    times = []

    object.take_times.each do |t|
      time_obj = {}
      time_obj["take_time"] = ActiveModelSerializers::SerializableResource.new(t, serializer: TakeTimeSerializer)
      rx_take_time = PrescriptionTakeTime.find_by(prescription_id: object.id, take_time_id: t.id)
      time_obj["rx_take_time"] = rx_take_time
      times << time_obj
    end

    times
  end
end
