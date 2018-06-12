# class Api::V1::PharmacysController < ApplicationController
#   before_action :set_pharmacy, only: [:show, :update, :destroy]
#
#   def index
#     pharmacys = Pharmacy.all
#     render json: pharmacys, status: 200
#   end
#
#   def create
#     pharmacy = Pharmacy.create(pharmacy_params)
#     render json: pharmacy, status: 201
#   end
#
#   def update
#     @pharmacy.update(pharmacy_params)
#     render json: @pharmacy, status: 200
#   end
#
#   def destroy
#     pharmacy_id = @pharmacy.id
#     @pharmacy.destroy
#     render json: {message: "Pharmacy deleted", pharmacyId: pharmacy_id}
#   end
#
#   def show
#     render json: @pharmacy, status: 200
#   end
#
#   private
#   def pharmacy_params
#     params.permit(
#       :name,
#       :street_one,
#       :street_two,
#       :city,
#       :state,
#       :zipcode,
#       :phone
#     )
#   end
#
#   def set_pharmacy
#     @pharmacy = Pharmacy.find(params[:id])
#   end
# end
