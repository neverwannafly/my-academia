module Api
  class ClassroomController < ApplicationController
    include ClassroomConcern

    before_action :validate_user
    before_action :set_classroom, except: %i[quote]

    def index
      json_response(@classroom)
    end

    def quote
      response = DailyQuotesService.execute
      head :service_unavailable and return unless response.success

      json_response({ data: response.data })
    end

    def search
      response = SearchService.execute({ search_term: params[:query] })
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

    private

    def likeable_params
      new_params = params.permit(:likeable_type, :likeable_id).merge({
        user_id: current_user.id
      })
      head :forbidden and return unless ALLOWED_COMMENTABLES.include?(new_params[:likeable_type])

      new_params[:likeable_type] = params[:likeable_type].classify
      new_params
    end
  end
end
