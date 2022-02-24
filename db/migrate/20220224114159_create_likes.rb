class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.references :users, index: true
      t.string :association_type
      t.integer :association_id
      t.integer :status

      t.timestamps
    end

    add_index :likes, %i[association_type association_id]
  end
end
