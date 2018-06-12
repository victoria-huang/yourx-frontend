class Api::V1::TakeTimesController < ApplicationController
  # before_action :set_take_time, only: [:show, :update, :destroy]

  # def index
  #   take_times = TakeTime.all
  #   render json: take_times, status: 200
  # end

  def create
    @patient = Patient.find(current_user_id)

    if authorized?(@patient)
      take_time = TakeTime.find_or_create_by(take_time_params)
      render json: take_time, status: 201
    else
      render json: { unauthorized: true }, status: :unauthorized
    end
  end

  # def update
  #   @take_time.update(take_time_params)
  #   render json: @take_time, status: 200
  # end

  # def destroy
  #   take_time_id = @take_time.id
  #   @take_time.destroy
  #   render json: {message: "Take time deleted", take_timeId: take_time_id}
  # end

  # def show
  #   render json: @take_time, status: 200
  # end

  private
  def take_time_params
    params.permit(:day, :rx_time)
  end

  # def set_take_time
  #   @take_time = TakeTime.find(params[:id])
  # end
end
