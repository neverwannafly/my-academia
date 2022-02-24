class AddIndexToPuzzleRating < ActiveRecord::Migration[6.1]
  def change
    add_index :puzzles, :rating
  end
end
