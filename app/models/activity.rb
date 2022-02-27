class Activity < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :trackable, polymorphic: true
  belongs_to :classroom

  after_create :send_mails

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

  def send_mails
    mailer_name = self.key.split('.').join('_').to_sym
    puts mailer_name

    if ActivityNotifierMailer.respond_to? mailer_name
      ActivityNotifierMailer.send(mailer_name, self).deliver_later
    end
  end
end
