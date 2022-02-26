module Api
  class CommentsController < ApplicationController
    include ClassroomConcern

    before_action :set_classroom
    before_action :set_commentable
    before_action :validate_ownership, only: %i[update destroy]

    def index
      response = Academia::CommentQuery.call({
        commentable: @commentable,
        user_id: current_user.id
      })

      json_response(response)
    end

    def create
      comment = Comment.create(comment_params)

      json_response(comment.as_json)
    end

    def update
      @comment.update!(resource_params)
      head :ok
    end

    def destroy
      @comment.inactive!
      head :ok
    end

    private

    def validate_ownership
      @comment = Comment.find_by_id(params[:comment_id])
      head :forbidden and return if @comment&.user_id != current_user.id
    end

    def comment_params
      params.permit(:title, :content).merge({
        user_id: current_user.id,
        commentable: @resource,
        status: :active
      })
    end
  end
end
