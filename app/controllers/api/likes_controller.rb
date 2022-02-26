module Api
  class LikesController
    include ClassroomConcern

    def handle_like
      like = Like.find_by(like_params)

      if like.present?
        like.update!(status: !Like.statuses[like.status])
      else
        like.create(like_params.merge(status: :active))
      end

      head :ok
    end

    private

    def like_params
      params.permit(:likeable_type, :likeable_id).merge({
        user_id: current_user.id
      })
    end
  end
end
