class ChangeCommentsPolymorphicColumns < ActiveRecord::Migration[6.1]
  def change
    rename_column :comments, :association_type, :commentable_type
    rename_column :comments, :association_id, :commentable_id
  end
end
