class Api::V1::DoctorsController < ApplicationController
  before_action :set_doctor, only: [:show, :update, :destroy]

  def index
    if valid_token?
      doctors = Doctor.all
      render json: doctors, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def create
    @doctor = Doctor.create(doctor_params)

    if @doctor
      render json: token_json(@doctor)
    else
      render json: {
        errors: @doctor.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if (authorized(@doctor))
      @doctor.update(doctor_params)
      render json: @doctor, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def destroy
    if (authorized(@doctor))
      doctor_id = @doctor.id
      @doctor.destroy
      render json: {message: "Doctor deleted", doctorId: doctor_id}
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def show
    if (authorized?(@doctor))
      render json: @doctor, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
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

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end
end
