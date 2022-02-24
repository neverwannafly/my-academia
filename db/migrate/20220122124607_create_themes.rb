class CreateThemes < ActiveRecord::Migration[6.1]
  def change
    create_table :themes do |t|
      t.string :title
      t.string :slug
      t.string :description
      t.timestamps
    end

    add_index :themes, :slug, { unique: true }
  end
end
