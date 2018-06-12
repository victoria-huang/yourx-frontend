class PrescriptionTakeTime < ApplicationRecord
  belongs_to :prescription
  belongs_to :take_time

  def self.reset_taken
    self.all.each { |t| t.update(taken: false) }
    Rails.logger.info("TakeTimes updated at #{Time.now}")
  end
end
