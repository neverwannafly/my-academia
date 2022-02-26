module Api
  class ResourcesController < ApplicationController
    include ClassroomConcern

    before_action :set_classroom
    before_action :set_resource, only: %i[update destroy mark_completed]
    before_action :validate_ownership, only: %i[update destroy]

    def index
      response = Academia::TimelineQuery.call({
        classroom_id: @classroom.id,
        user_id: current_user.id
      })

      json_response(response)
    end

    def create
      resource = ClassroomResource.create(resource_params)
      
      json_response(resource.as_json)
    end

    def update
      @resource.update!(resource_params)
      head :ok
    end

    def destroy
      @resource.inactive!
      head :ok
    end

    def mark_completed
      resource = @resource
        .user_classroom_progresses
        .where(user_id: current_user.id)
        .first

      unless resource.present?
        resource = UserClassroomProgress.create(
          classroom_resource_id: @resource.id,
          user_id: current_user.id,
          score: UserClassroomProgress::SCORE_MAPPINGS[@resource.resource_type.to_sym]
        )
      end

      json_response(resource)
    end

    private

    def validate_ownership
      head :forbidden and return if @resource.user_id != current_user.id
    end

    def resource_params
      params.permit(:title, :link, :resource_type).merge({
        status: :active,
        user_id: current_user.id,
        classroom_id: @classroom.id
      })
    end
  end
end
