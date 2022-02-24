class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :users, index: true
      t.string :association_type
      t.integer :association_id
      t.string :title
      t.text :content
      t.integer :status

      t.timestamps
    end

    add_index :comments, %i[association_type association_id]
  end
end
