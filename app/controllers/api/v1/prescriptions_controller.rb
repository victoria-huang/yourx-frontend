class Api::V1::PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show, :update, :destroy]

  def create
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      @prescription = Prescription.create(prescription_params)

      if @prescription.valid?
        render json: @prescription, status: 201
      else
        render json: {
          errors: @prescription.errors.full_messages
        }, status: :unprocessable_entity
      end
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def update
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      @prescription.update(prescription_params)
      render json: @prescription, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def destroy
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      prescription_id = @prescription.id
      @prescription.destroy
      render json: {message: "Prescription deleted", prescriptionId: prescription_id}
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  def show
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      render json: @prescription, status: 200
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  private
  def prescription_params
    params.permit(
      :brand_name,
      :rxcui,
      :sig,
      :dosage,
      :image_url,
      :patient_id
    )
  end

  def set_prescription
    @prescription = Prescription.find(params[:id])
  end
end
