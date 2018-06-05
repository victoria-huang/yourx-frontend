Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :patients
      resources :prescriptions
      resources :doctors
      resources :take_times
      resources :prescription_take_times
      resources :pharmacies
    end
  end
end
