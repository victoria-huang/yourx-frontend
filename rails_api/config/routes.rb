Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :patients, only: [:create, :show] do
        get '/daily_meds', to: 'patients#get_daily_meds'
        get '/daily_adherence', to: 'patients#get_daily_adherence'
      end

      resources :doctors, only: [:create]
      resources :prescriptions, only: [:create, :update, :destroy, :show]
      resources :take_times, only: [:create]
      resources :prescription_take_times, only: [:create, :update, :destroy]

      post '/patient_sessions', to: 'sessions#create_patient'
      post '/doctor_sessions', to: 'sessions#create_doctor'
    end
  end

  get '/get_user', to: 'application#get_user'
end
