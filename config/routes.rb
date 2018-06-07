Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :patients do
        resources :insurances
        resources :labs
        resources :emergency_contacts
        resources :prescriptions
        resources :take_times
      end

      resources :doctors do
        resources :prescriptions
      end
      
      resources :prescription_take_times

      resources :pharmacies do
        resources :prescriptions
      end

      post '/patient_sessions', to: 'sessions#create_patient'
      post '/doctor_sessions', to: 'sessions#create_doctor'
    end
  end
end
