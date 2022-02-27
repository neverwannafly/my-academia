class Like < ApplicationRecord
  enum status: %i[active deleted]

  belongs_to :user
  belongs_to :likeable, polymorphic: true
  has_many :activites, as: :trackable
end
