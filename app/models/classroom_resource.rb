class ClassroomResource < ApplicationRecord
  belongs_to :classroom
  belongs_to :user
  has_many :comments, as: :commentable
  has_many :likes, as: :likeable
  has_many :user_classroom_progresses

  enum resource_type: %i[problem article]
  enum status: %i[active inactive]
end
