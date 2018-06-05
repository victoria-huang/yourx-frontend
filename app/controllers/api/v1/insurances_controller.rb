class Api::V1::InsurancesController < ApplicationController
  before_action :set_insurance, only: [:show, :update, :destroy]

  def index
    insurances = Insurance.all
    render json: insurances, status: 200
  end

  def create
    insurance = Insurance.create(insurance_params)
    render json: insurance, status: 201
  end

  def update
    @insurance.update(insurance_params)
    render json: @insurance, status: 200
  end

  def destroy
    insurance_id = @insurance.id
    @insurance.destroy
    render json: {message: "Insurance deleted", insuranceId: insurance_id}
  end

  def show
    render json: @insurance, status: 200
  end

  private
  def insurance_params
    params.permit(:insurance_type, :insurance_id, :group, :bin, :pcn, :phone, :insurance_name, :patient_id)
  end

  def set_insurance
    @insurance = Insurance.find(params[:id])
  end
end
