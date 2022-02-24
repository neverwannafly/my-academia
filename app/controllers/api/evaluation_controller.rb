module Api
  class EvaluationController < ApplicationController
    def index
      json_response(EngineEvaluationService.execute(params[:fen_notation]))
    end
  end
end
