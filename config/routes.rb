Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :patients do
        get '/daily_meds', to: 'patients#get_daily_meds'
        get '/daily_adherence', to: 'patients#get_daily_adherence'

        # resources :prescriptions
        # resources :take_times

        # resources :insurances
        # resources :labs
        # resources :emergency_contacts
      end

      resources :doctors do
        resources :prescriptions
      end

      resources :prescription_take_times

      # resources :pharmacies do
      #   resources :prescriptions
      # end

      post '/patient_sessions', to: 'sessions#create_patient'
      post '/doctor_sessions', to: 'sessions#create_doctor'
    end
  end
end
