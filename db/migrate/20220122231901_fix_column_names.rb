class FixColumnNames < ActiveRecord::Migration[6.1]
  def change
    rename_column :ratings, :users_id, :user_id
    rename_column :theme_associations, :themes_id, :theme_id
    rename_column :ratings, :type, :rating_type
    rename_column :games, :type, :game_type
  end
end
