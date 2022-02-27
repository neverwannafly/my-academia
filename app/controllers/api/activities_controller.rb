module Api
  class ActivitiesController < ApplicationController
    include ClassroomConcern

    before_action :set_classroom

    def index
      activities = Activity
        .where(classroom_id: @classroom.id)
        .includes(%i[trackable owner])
        .order('id DESC')
        .limit(20)
        .map do |record|
          record.attributes.merge(
            trackable: record.trackable,
            owner: record.owner
          )
        end

      json_response(activities)
    end
  end
end
