class Classroom < ApplicationRecord
  has_many :classroom_resources
  has_many :classroom_users
  has_many :users, :through => :classroom_users
  has_many :activities

  DEFAULT_CLASSROOM = 'Simple Classroom'
end
