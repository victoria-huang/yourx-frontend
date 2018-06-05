class Api::V1::LabsController < ApplicationController
  before_action :set_lab, only: [:show, :update, :destroy]

  def index
    labs = Lab.all
    render json: labs, status: 200
  end

  def create
    lab = Lab.create(lab_params)
    render json: lab, status: 201
  end

  def update
    @lab.update(lab_params)
    render json: @lab, status: 200
  end

  def destroy
    lab_id = @lab.id
    @lab.destroy
    render json: {message: "Lab deleted", labId: lab_id}
  end

  def show
    render json: @lab, status: 200
  end

  private
  def lab_params
    params.permit(:glucose, :heart_rate, :systolic_bp, :diastolic_bp, :height_inches, :weight_lbs, :temperature_f, :resp_rate, :patient_id)
  end

  def set_lab
    @lab = Lab.find(params[:id])
  end
end
