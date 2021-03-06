module Api
  class TasksController < ApplicationController
    include ClassroomConcern

    before_action :validate_user
    before_action :set_classroom
    before_action :set_task, only: %i[update destroy]

    def index
      json_response(Task.where(classroom_id: @classroom.id, user_id: current_user.id))
    end

    def create
      task = Task.create(task_params.merge({
        classroom_id: @classroom.id,
        content: '',
        status: :pending,
        deadline: DateTime.now,
        user_id: current_user.id
      }))

      json_response(task.as_json)
    end

    def update
      @task.update(task_params)

      head :ok
    end

    def destroy
      @task.destroy

      head :ok
    end

    private

    def task_params
      params.permit(:content, :deadline, :status)
    end

    def set_task
      @task = Task.find_by_id(params[:id])
      head :not_found and return unless @task.present?
      head :forbidden and return unless @task.user_id == current_user.id
    end
  end
end