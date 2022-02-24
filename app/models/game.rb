class Game < ApplicationRecord
  belongs_to :white_player, class_name: :User, foreign_key: :white_player_id
  belongs_to :black_player, class_name: :User, foreign_key: :black_player_id

  enum game_type: %i[hyperbullet bullet blitz rapid classical]
end
