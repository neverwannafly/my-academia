module Api
  class ClassroomController < ApplicationController
    include ClassroomConcern

    before_action :validate_user
    before_action :set_classroom, except: %i[quote]

    def index
      json_response(@classroom.as_json)
    end

    def quote
      response = DailyQuotesService.execute
      head :service_unavailable and return unless response.success

      json_response({ data: response.data })
    end
  end
end
