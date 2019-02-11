class MedSerializer < ActiveModel::Serializer
  attributes :id, :brand_name, :rxcui, :sig, :dosage, :image_url
end
