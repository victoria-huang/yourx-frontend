class MedSerializer < ActiveModel::Serializer
  attributes :id, :brand_name, :rxcui, :sig, :dosage, :image_url
  # :generic_name, :amount_per_dose, :formulation, :route, :daily_freq, :weekly_freq, :start_date, :end_date
end
