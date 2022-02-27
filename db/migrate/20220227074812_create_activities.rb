class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :key, index: true
      t.string :trackable_type
      t.integer :trackable_id
      t.string :owner_type
      t.integer :owner_id
      t.json :params
      t.references :classroom, index: true

      t.timestamps
    end

    add_index :activities, [:trackable_type, :trackable_id]
    add_index :activities, [:owner_type, :owner_id]
  end
end
