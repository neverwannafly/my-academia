class ClassroomResource < ApplicationRecord
  belongs_to :classroom

  enum classroom_type: %i[problem article]
  enum status: %i[pending solved]

  def comments
    Comment.where(association_type: self.class.name, association_id: self.id)
  end
end
