class PatientSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :first_name, :last_name, :dob, :gender, :street_one, :street_two, :city, :state, :zipcode, :email, :phone, :prescriptions
  has_many :prescriptions
end
