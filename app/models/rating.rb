class Rating < ApplicationRecord
  belongs_to :user

  enum rating_type: %i[hyperbullet bullet blitz rapid classical puzzle]
end
