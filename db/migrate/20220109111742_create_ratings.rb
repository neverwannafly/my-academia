class CreateRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :ratings do |t|
      t.integer :type
      t.references :users, foreign_key: true, null: false
      t.integer :rating, default: 1200

      t.timestamps
    end
  end
end
