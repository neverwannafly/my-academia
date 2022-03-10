class CreateTagAssociations < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_associations do |t|
      t.references :tag, foreign_key: true, index: true
      t.string :taggable_type
      t.integer :taggable_id

      t.timestamps
    end

    add_index :tag_associations, %i[taggable_type taggable_id]
  end
end
