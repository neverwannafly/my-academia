class UserClassroomProgress < ApplicationRecord
  belongs_to :user
  belongs_to :classroom_resource

  SCORE_MAPPINGS = {
    problem: 10,
    article: 5,
  }
end
