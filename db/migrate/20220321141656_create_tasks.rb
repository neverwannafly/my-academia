class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.text :content
      t.integer :status
      t.datetime :deadline
      t.references :classroom, foreign_key: true, index: true

      t.timestamps
    end
  end
end
