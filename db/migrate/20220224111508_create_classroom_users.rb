class CreateClassroomUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :classroom_users do |t|
      t.references :classroom, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
