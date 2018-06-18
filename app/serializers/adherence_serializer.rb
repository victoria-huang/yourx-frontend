class AdherenceSerializer < ActiveModel::Serializer
  attributes :id, :percent, :adh_date

  def adh_date
    object.created_at.strftime("%b %e, %Y")
  end
end
