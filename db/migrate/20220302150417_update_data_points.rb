class UpdateDataPoints < ActiveRecord::Migration[6.1]
  def change
    classroom = Classroom.first
    users = classroom.users
    
    classroom.classroom_resources.each do |resource|
      # Update progress of users
      users.each do |user|
        ucp = user.user_classroom_progresses.where(classroom_resource_id: resource.id).first
        unless ucp.present?
          UserClassroomProgress.create(
            user_id: user.id,
            classroom_resource_id: resource.id,
            created_at: resource.created_at,
            updated_at: resource.created_at
          )
        end
      end
    end
  end
end
