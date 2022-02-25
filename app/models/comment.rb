class Comment < ApplicationRecord
  enum status: %i[active deleted]

  belongs_to :user
  belongs_to :commentable, polymorphic: true
end
