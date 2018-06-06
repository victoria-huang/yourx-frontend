class Api::V1::PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :update, :destroy]

  def index
    patients = Patient.all
    render json: patients, status: 200
  end

  def create
    patient = Patient.create(patient_params)
    render json: patient, status: 201
  end

  def update
    @patient.update(patient_params)
    render json: @patient, status: 200
  end

  def destroy
    patient_id = @patient.id
    @patient.destroy
    render json: {message: "Patient deleted", patientId: patient_id}
  end

  def show
    render json: @patient, status: 200
  end

  private
  def patient_params
    params.permit(:username, :password, :first_name, :last_name, :dob, :gender, :street_one, :street_two, :city, :state, :zipcode, :email, :phone)
  end

  def set_patient
    @patient = Patient.find(params[:id])
  end
end
