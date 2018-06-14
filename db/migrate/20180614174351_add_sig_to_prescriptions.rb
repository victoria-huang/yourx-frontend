class AddSigToPrescriptions < ActiveRecord::Migration[5.2]
  def change
    add_column :prescriptions, :sig, :string, default: ''
  end
end
