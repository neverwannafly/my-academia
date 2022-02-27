class ActivityNotifierMailer < ApplicationMailer
  default :from => 's0.alively@gmail.com'

  def comment_create(activity)
    @activity = activity
    @resource = @activity.trackable.commentable
    @creator = activity.owner.username
    subject = "#{@creator} added a comment to #{@resource.title}"

    mail(to: recipients, subject: subject)
  end

  def classroom_resource_create(activity)
    @activity = activity
    @resource = @activity.trackable
    @creator = activity.owner.username
    subject = "#{@creator} added a new #{@resource.resource_type}"

    mail(to: recipients, subject: subject)
  end

  private

  def recipients
    classroom = Classroom.find_by_id(@activity.classroom_id)
    classroom.users.pluck(:email)
  end
end
