class CreateBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookmarks do |t|
      t.references :user, index: true
      t.references :classroom_resource, index: true
      t.integer :status

      t.timestamps
    end
  end
end
