module Academia
  class TimelineQuery < QueryBase
    base_query ClassroomResource

    private

    def query
      relation
        .joins(:user)
        .joins("LEFT OUTER JOIN user_classroom_progresses ON user_classroom_progresses.classroom_resource_id = classroom_resources.id AND user_classroom_progresses.user_id = #{@options[:user_id]}")
        .joins("LEFT OUTER JOIN bookmarks ON bookmarks.bookmarkable_type = 'ClassroomResource' AND bookmarks.bookmarkable_id = classroom_resources.id AND bookmarks.status = 1 AND bookmarks.user_id = #{options[:user_id]}")
        .left_outer_joins(:comments)
        .left_outer_joins(:likes)
        .left_outer_joins(:tags)
        .where({ classroom_id: @options[:classroom_id] })
        .where({ classroom_resources: { status: :active } })
        .group("classroom_resources.id", "users.id", "user_classroom_progresses.id", "bookmarks.id")
    end

    def selector(current_query)
      current_query
        .select(
          'classroom_resources.*',
          'users.username',
          'users.profile_pic',
          'COUNT(distinct comments.id) as comments_count',
          'COUNT(distinct likes.id) as likes_count',
          'user_classroom_progresses.score as score',
          "bit_or(CAST (likes.user_id=#{@options[:user_id]} as integer)) as liked",
          "bookmarks.id as bookmarked",
          "string_agg(tags.name, ',') as resource_tags"
        )
        .order('classroom_resources.id DESC')
    end
  end
end
