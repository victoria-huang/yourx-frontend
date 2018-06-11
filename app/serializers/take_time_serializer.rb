class TakeTimeSerializer < ActiveModel::Serializer
  attributes :id, :day, :formatted_time

  def formatted_time
    object.rx_time.strftime("%l:%M %p")
  end
end
