class CreateAdherences < ActiveRecord::Migration[5.2]
  def change
    create_table :adherences do |t|
      t.decimal :percent
      t.references :patient

      t.timestamps
    end
  end
end
