class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :brand_name, :generic_name, :rxcui, :image_url, :amount_per_dose, :dosage, :formulation, :route, :daily_freq, :weekly_freq, :start_date, :end_date, :prescription_take_times, :take_times
  has_many :prescription_take_times
  has_many :take_times, through: :prescription_take_times
end
