class Classroom < ApplicationRecord
  has_many :classroom_resources
  has_many :classroom_users
  has_many :classrooms, :through => :classroom_users
end
