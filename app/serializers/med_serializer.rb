class MedSerializer < ActiveModel::Serializer
  attributes :id, :brand_name 
  # :generic_name, :rxcui, :image_url, :amount_per_dose, :dosage, :formulation, :route, :daily_freq, :weekly_freq, :start_date, :end_date
end
