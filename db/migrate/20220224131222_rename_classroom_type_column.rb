class RenameClassroomTypeColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :classroom_resources, :type, :resource_type
  end
end
