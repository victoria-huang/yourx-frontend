class Api::V1::PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show, :update, :destroy]

  def index
    prescriptions = Prescription.all
    render json: prescriptions, status: 200
  end

  def create
    prescription = Prescription.create(prescription_params)
    render json: prescription, status: 201
  end

  def update
    @prescription.update(prescription_params)
    render json: @prescription, status: 200
  end

  def destroy
    prescription_id = @prescription.id
    @prescription.destroy
    render json: {message: "Prescription deleted", prescriptionId: prescription_id}
  end

  def show
    render json: @prescription, status: 200
  end

  private
  def prescription_params
    params.permit(
      :drug_name,
      :amount_per_dose,
      :dosage,
      :formulation,
      :route,
      :daily_freq,
      :weekly_freq,
      :start_date,
      :end_date,
      :doctor_id,
      :pharmacy_id,
      :patient_id
    )
  end

  def set_prescription
    @prescription = Prescription.find(params[:id])
  end
end
