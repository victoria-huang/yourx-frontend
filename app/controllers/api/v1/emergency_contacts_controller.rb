# class Api::V1::EmergencyContactsController < ApplicationController
#   before_action :set_emergency_contact, only: [:show, :update, :destroy]
#
#   def index
#     emergency_contacts = EmergencyContact.all
#     render json: emergency_contacts, status: 200
#   end
#
#   def create
#     emergency_contact = EmergencyContact.create(emergency_contact_params)
#     render json: emergency_contact, status: 201
#   end
#
#   def update
#     @emergency_contact.update(emergency_contact_params)
#     render json: @emergency_contact, status: 200
#   end
#
#   def destroy
#     emergency_contact_id = @emergency_contact.id
#     @emergency_contact.destroy
#     render json: {message: "Emergency contact deleted", emergencyContactId: emergency_contact_id}
#   end
#
#   def show
#     render json: @emergency_contact, status: 200
#   end
#
#   private
#   def emergency_contact_params
#     params.permit(
#       :name,
#       :relationship,
#       :street_one,
#       :street_two,
#       :city,
#       :state,
#       :zipcode,
#       :phone,
#       :email,
#       :patient_id
#     )
#   end
#
#   def set_emergency_contact
#     @emergency_contact = EmergencyContact.find(params[:id])
#   end
# end
