class Bookmark < ApplicationRecord
  belongs_to :bookmarkable, polymorphic: true

  enum status: %i[inactive active]
end
