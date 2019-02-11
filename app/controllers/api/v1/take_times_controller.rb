class Api::V1::TakeTimesController < ApplicationController

  def create
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      take_time = TakeTime.find_or_create_by(take_time_params)
      render json: take_time, status: 201
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  private
  def take_time_params
    params.permit(:day, :rx_time)
  end
end
