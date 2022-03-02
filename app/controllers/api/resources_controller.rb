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
      Activity.create_activity(
        action: :create,
        owner: current_user,
        trackable: resource,
        classroom_id: @classroom.id
      )

      json_response(resource.as_json)
    end

    def update
      @resource.update!(resource_params)
      json_response(@resource.reload)
    end

    def destroy
      @resource.inactive!
      head :ok
    end

    def mark_completed
      progress = @resource
        .user_classroom_progresses
        .where(user_id: current_user.id)
        .first

      unless progress.present?
        progress = UserClassroomProgress.create(
          classroom_resource_id: @resource.id,
          user_id: current_user.id
        )
      end

      json_response(progress)
    end

    private

    def validate_ownership
      head :forbidden and return if @resource.user_id != current_user.id
    end

    def resource_params
      params.permit(:title, :link, :resource_type, :content).merge({
        status: :active,
        user_id: current_user.id,
        classroom_id: @classroom.id
      })
    end
  end
end
