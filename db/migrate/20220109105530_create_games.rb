class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :slug
      t.string :pgn
      t.integer :result
      t.integer :type
      t.integer :rating_change
      t.boolean :is_rated
      t.references :white_player, foreign_key: { to_table: :users }, null: true
      t.references :black_player, foreign_key: { to_table: :users }, null: true

      t.timestamps
    end

    add_index :games, :slug, :unique => true
  end
end
