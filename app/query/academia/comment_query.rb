module Academia
  class CommentQuery < QueryBase
    base_query Comment

    private

    def query
      relation
        .joins(:user)
        .joins("LEFT OUTER JOIN bookmarks ON bookmarks.bookmarkable_type = 'Comment' AND bookmarks.bookmarkable_id = comments.id AND bookmarks.status = 1")
        .left_outer_joins(:likes)
        .where({ commentable: @options[:commentable], status: :active })
        .group("comments.id", "users.id", "bookmarks.id")
    end

    def selector(current_query)
      current_query
        .select(
          'comments.*',
          'users.username, users.profile_pic',
          'COUNT(likes.id) as likes_count',
          "bit_or(CAST (likes.user_id=#{@options[:user_id]} AND likes.status=0 as integer)) as liked",
          "bookmarks.id as bookmarked",
        )
        .order('comments.id ASC')
    end
  end
end
