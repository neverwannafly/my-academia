class ClassroomResource < ApplicationRecord
  belongs_to :classroom
  belongs_to :user
  has_many :comments, as: :commentable
  has_many :bookmarks, as: :bookmarkable
  has_many :likes, as: :likeable
  has_many :activites, as: :trackable
  has_many :user_classroom_progresses
  has_many :tag_associations, as: :taggable
  has_many :tags, :through => :tag_associations

  enum resource_type: %i[problem article tutorial]
  enum status: %i[active inactive]
end
