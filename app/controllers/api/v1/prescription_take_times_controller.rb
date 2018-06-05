class Api::V1::PrescriptionTakeTimesController < ApplicationController
  before_action :set_prescription_take_time, only: [:show, :update, :destroy]

  def index
    prescription_take_times = PrescriptionTakeTime.all
    render json: prescription_take_times, status: 200
  end

  def create
    prescription_take_time = PrescriptionTakeTime.create(prescription_take_time_params)
    render json: prescription_take_time, status: 201
  end

  def update
    @prescription_take_time.update(prescription_take_time_params)
    render json: @prescription_take_time, status: 200
  end

  def destroy
    prescription_take_time_id = @prescription_take_time.id
    @prescription_take_time.destroy
    render json: {message: "PrescriptionTakeTime deleted", prescription_take_timeId: prescription_take_time_id}
  end

  def show
    render json: @prescription_take_time, status: 200
  end

  private
  def prescription_take_time_params
    params.permit(:prescription_id, :take_time_id)
  end

  def set_prescription_take_time
    @prescription_take_time = PrescriptionTakeTime.find(params[:id])
  end
end
