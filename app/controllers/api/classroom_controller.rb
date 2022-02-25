module Api
  class ClassroomController < ApplicationController
    before_action :validate_user
    before_action :assign_classroom, except: %i[quote]
    before_action :set_resource, only: %i[comments add_comment]

    def index
      json_response(@classroom.as_json)
    end

    def resources
      response = @classroom.classroom_resources.joins(:users)
      response = response.select('classroom_resources.*', 'users.username', 'users.profile_pic')

      json_response(@classroom.classroom_resources)
    end

    def comments
      response = @resource.comments.joins(:user)
      response = response.select('comments.*', 'users.username', 'users.profile_pic')

      json_response(response)
    end

    def quote
      response = DailyQuotesService.execute
      head :service_unavailable and return unless response.success

      json_response({ data: response.data })
    end

    def create_resource
      resource = ClassroomResource.create(resource_params)
      
      json_response(resource.as_json)
    end

    def add_comment
      comment = Comment.create(comment_params)

      json_response(comment.as_json)
    end

    private

    def assign_classroom
      classrooms = current_user.classrooms
      classrooms = classrooms.where(id: params[:classroom_id]) if params[:classroom_id].present?

      @classroom = classrooms.first
      head :not_found and return if @classroom.blank?
    end

    def resource_params
      params.permit(:title, :link, :resource_type).merge({
        status: :pending,
        user_id: current_user.id,
        classroom_id: @classroom.id
      })
    end

    def comment_params
      params.permit(:title, :content).merge({
        user_id: current_user.id,
        commentable: @resource,
        status: :active
      })
    end

    def set_resource
      @resource = ClassroomResource.where(classroom_id: @classroom.id, id: params[:resource_id]).first
      head :not_found and return if @resource.blank?
    end
  end
end
