module ClassroomConcern
  extend ActiveSupport::Concern

  def set_classroom
    classrooms = current_user.classrooms
    classrooms = classrooms.where(id: params[:classroom_id]) if params[:classroom_id].present?

    @classroom = classrooms.first
    head :not_found and return if @classroom.blank?
  end

  def set_resource
    @resource = ClassroomResource.where(classroom_id: @classroom.id, id: params[:resource_id]).first
    head :not_found and return if @resource.blank?
  end
end
