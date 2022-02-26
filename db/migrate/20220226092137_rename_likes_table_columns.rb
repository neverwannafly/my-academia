class RenameLikesTableColumns < ActiveRecord::Migration[6.1]
  def change
    rename_column :likes, :association_type, :likeable_type
    rename_column :likes, :association_id, :likeable_id
    rename_column :likes, :users_id, :user_id
  end
end
