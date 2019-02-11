class Api::V1::PatientsController < ApplicationController
  before_action :set_patient, only: [:show]

  def create
    @patient = Patient.create(patient_params)

    if @patient.valid?
      render json: token_json(@patient)
    else
      render json: {
        errors: @patient.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show
    if authorized?(@patient)
      render json: @patient, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def get_daily_meds
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      render json: @patient.get_daily_meds_and_times
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def get_daily_adherence
    @patient = Patient.find(current_user_id)
    if authorized?(@patient)
      render json: @patient.daily_adherence
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  private
  def patient_params
    params.permit(
      :username,
      :password,
      :first_name,
      :last_name,
      :dob,
      :gender,
      :street_one,
      :street_two,
      :city,
      :state,
      :zipcode,
      :email,
      :phone
    )
  end

  def set_patient
    @patient = Patient.find(current_user_id)
  end
end
