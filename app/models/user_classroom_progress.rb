class UserClassroomProgress < ApplicationRecord
  belongs_to :user
  belongs_to :classroom_resource
end
