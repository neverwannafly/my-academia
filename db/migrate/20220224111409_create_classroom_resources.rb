class CreateClassroomResources < ActiveRecord::Migration[6.1]
  def change
    create_table :classroom_resources do |t|
      t.references :classroom, index: true
      t.integer :type
      t.string :link
      t.string :title
      t.text :content
      t.integer :status

      t.timestamps
    end
  end
end
