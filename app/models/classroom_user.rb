class ClassroomUser < ApplicationRecord
  belongs_to :user
  belongs_to :classroom
end
