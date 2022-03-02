module Academia
  class TimelineQuery < QueryBase
    base_query ClassroomResource

    private

    def query
      relation
        .joins(:user)
        .left_outer_joins(:comments)
        .left_outer_joins(:user_classroom_progresses)
        .where({ classroom_id: @options[:classroom_id] })
        .where({ classroom_resources: { status: :active } })
        .where({ user_classroom_progresses: { user_id: @options[:user_id] } })
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
