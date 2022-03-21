class Task < ApplicationRecord
  belongs_to :classroom
  belongs_to :user

  enum status: %i[pending complete]
end
