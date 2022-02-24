module Api
  class ClassroomController < ApplicationController
    before_action :assign_classroom, except: %i[quote]
    before_action :set_resource, only: %i[comments likes]

    def index
      json_response(@classroom.as_json)
    end

    def resources
      json_response(@classroom.classroom_resources)
    end

    def comments
      json_response(@resource.comments)
    end

    def quote
      response = DailyQuotesService.execute
      head :service_unavailable and return unless response.success

      json_response({ data: response.data })
    end

    private

    def assign_classroom
      classrooms = current_user.classrooms.where(params[:classroom_id])

      @classroom = classrooms.first
      head :not_found and return if @classroom.blank?
    end

    def set_resource
      @resource = ClassroomResource.where(classroom_id: @classroom.id, id: params[:resource_id])
      head :not_found and return if @resource.blank?
    end
  end
end
