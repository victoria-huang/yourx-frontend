class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :specialty, :street_one, :street_two, :city, :state, :zipcode, :email, :phone
end
