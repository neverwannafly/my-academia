class Comment < ApplicationRecord
  enum status: %i[active deleted]

  belongs_to :user
  belongs_to :commentable, polymorphic: true

  has_many :bookmarks, as: :bookmarkable
  has_many :likes, as: :likeable
  has_many :comments, as: :commentable
  has_many :activites, as: :trackable
end
