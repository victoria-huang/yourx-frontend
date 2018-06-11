class PatientSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :first_name, :last_name, :dob, :gender, :street_one, :street_two, :city, :state, :zipcode, :email, :phone, :prescriptions
  has_many :prescriptions

  def med
    meds = []

    object.prescriptions.each do |p|
      meds << ActiveModelSerializers::SerializableResource.new(p, serializer: PrescriptionSerializer)
    end

    meds
  end
end
