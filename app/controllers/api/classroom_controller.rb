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

    def handle_like
      like = Like.find_by(likeable_params)

      if like.present?
        like.delete
      else
        Like.create(likeable_params.merge(status: :active))
      end

      head :ok
    end
  end
end
