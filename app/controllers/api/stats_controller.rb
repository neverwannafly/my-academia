module Api
  class StatsController < ApplicationController
    include ClassroomConcern

    before_action :set_classroom

    def index
      end_date = DateTime.now
      start_date = end_date - 7.days

      progress_data = UserClassroomProgress
        .where(created_at: start_date..end_date)
        .select(:score, :created_at, :id)

      total_problems = base_relation
      problems_solved = base_relation(join: true)

      json_response({
        progress_data: progress_data,
        total_problems: total_problems,
        problems_solved: problems_solved
      })
    end

    private

    def base_relation(join: false)
      relation = @classroom.classroom_resources
      relation = relation.joins(:user_classroom_progresses) if join
      relation.active.count
    end
  end
end
