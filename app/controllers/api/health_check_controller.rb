module Api
  class HealthCheckController < ApplicationController
    def index
      head :ok
    end
  end
end
