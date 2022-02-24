class CreateThemeAssociations < ActiveRecord::Migration[6.1]
  def change
    create_table :theme_associations do |t|
      t.references :themes, foreign_key: true, null: false
      t.string :associate_type, null: false
      t.integer :associate_id, null: false

      t.timestamps
    end

    add_index :theme_associations, [:associate_type, :associate_id]
  end
end
