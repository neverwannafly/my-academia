class Task < ApplicationRecord
  belongs_to :classroom

  enum status: %i[pending complete]
end
