class ClassroomResource < ApplicationRecord
  belongs_to :classroom
  has_many :comments, as: :commentable

  enum classroom_type: %i[problem article]
  enum status: %i[pending solved]
end
