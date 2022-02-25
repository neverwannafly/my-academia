class AddUserIdToClassroomResources < ActiveRecord::Migration[6.1]
  def change
    add_column :classroom_resources, :user_id, :integer
    add_index :classroom_resources, :user_id
  end
end
