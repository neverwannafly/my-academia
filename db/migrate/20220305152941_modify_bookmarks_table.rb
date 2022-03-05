class ModifyBookmarksTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :bookmarks, :classroom_resource_id

    add_column :bookmarks, :bookmarkable_type, :string
    add_column :bookmarks, :bookmarkable_id, :integer
    
    add_index :bookmarks, %i[bookmarkable_type bookmarkable_id]
  end
end
