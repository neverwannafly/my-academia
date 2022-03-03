module Academia
  class TimelineQuery < QueryBase
    base_query ClassroomResource

    private

    def query
      relation
        .joins(:user)
        .joins("LEFT OUTER JOIN user_classroom_progresses ON user_classroom_progresses.classroom_resource_id = classroom_resources.id AND user_classroom_progresses.user_id = #{@options[:user_id]}")
        .left_outer_joins(:comments)
        .where({ classroom_id: @options[:classroom_id] })
        .where({ classroom_resources: { status: :active } })
        .group("classroom_resources.id", "users.id", "user_classroom_progresses.id")
    end

    def selector(current_query)
      current_query
        .select(
          'classroom_resources.*',
          'users.username',
          'users.profile_pic',
          'COUNT(comments.id) as comments_count',
          'user_classroom_progresses.score as score',
        )
        .order('classroom_resources.id DESC')
    end
  end
end
