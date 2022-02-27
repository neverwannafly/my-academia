class Activity < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :trackable, polymorphic: true
  belongs_to :classroom

  def self.create_activity(action:, owner:, trackable:, classroom_id:, params: {})
    key = "#{trackable.class.name.underscore}.#{action}"

    self.create!(
      key: key,
      owner: owner,
      trackable: trackable,
      classroom_id: classroom_id,
      params: params
    )
  end
end
