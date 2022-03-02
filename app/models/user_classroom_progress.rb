class UserClassroomProgress < ApplicationRecord
  belongs_to :user
  belongs_to :classroom_resource

  before_create :handle_before_create

  SCORE_MAPPINGS = {
    problem: 10,
    article: 5,
  }

  def handle_before_create
    self.score = UserClassroomProgress::SCORE_MAPPINGS[self.classroom_resource.resource_type.to_sym]
  end
end
