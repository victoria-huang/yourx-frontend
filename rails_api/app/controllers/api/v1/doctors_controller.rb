class Api::V1::DoctorsController < ApplicationController

  def create
    @doctor = Doctor.create(doctor_params)

    if @doctor.valid?
      render json: token_json(@doctor)
    else
      render json: {
        errors: @doctor.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private
  def doctor_params
    params.permit(
      :username,
      :password,
      :first_name,
      :last_name,
      :specialty,
      :street_one,
      :street_two,
      :city,
      :state,
      :zipcode,
      :email,
      :phone
    )
  end
end
