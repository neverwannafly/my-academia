class CreatePuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :puzzles do |t|
      t.string :starting_position_fen
      t.string :solution
      t.string :slug, null: false
      t.integer :rating
      t.integer :rating_deviation
      t.integer :initial_popularity, default: 0
      t.integer :upvotes, default: 0
      t.integer :downvotes, default: 0

      t.timestamps
    end

    add_index :puzzles, :slug, { unique: true }
  end
end
