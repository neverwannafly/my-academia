class CreateUserClassroomProgresses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_classroom_progresses do |t|
      t.references :user, index: true
      t.references :classroom_resource, index: true
      t.integer :score

      t.timestamps
    end

    add_index :user_classroom_progresses, :created_at
  end
end
