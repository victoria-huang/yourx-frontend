class Api::V1::SessionsController < ApplicationController

  def create_patient
    @user = Patient.find_by(username: params["username"])
    authenticate_user(@user)
  end

  def create_doctor
    @user = Doctor.find_by(username: params["username"])
    authenticate_user(@user)
  end

  def authenticate_user(user)
    if (user && user.authenticate(params["password"]))
      render json: token_json(user)
    else
      render json: {
        errors: "We couldn't find a user in our database that matches those credentials"
      }, status: :unauthorized
    end
  end

end
