module ClassroomConcern
  extend ActiveSupport::Concern

  ALLOWED_BOOKMARKABLES = %w[classroom_resource comment]
  ALLOWED_COMMENTABLES = %w[classroom_resource comment]
  ALLOWED_LIKEABLES = %w[classroom_resource comment]

  def set_classroom
    @classroom = current_user.classrooms.last

    head :not_found and return if @classroom.blank?
  end

  def set_resource
    resource_id = params[:id] || params[:resource_id]
    @resource = ClassroomResource.where(classroom_id: @classroom.id, id: resource_id).first
    head :not_found and return if @resource.blank?
  end

  def set_commentable
    head :forbidden and return unless ALLOWED_COMMENTABLES.include?(params[:commentable_type])

    @commentable = params[:commentable_type].classify.constantize.find_by_id(params[:commentable_id])
    head :not_found and return if @commentable.blank?
  end
end
