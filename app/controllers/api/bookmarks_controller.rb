module Api
  class BookmarksController < ApplicationController
    include ClassroomConcern

    def index
      bookmarks = Bookmark
        .where(classroom_id: @classroom.id)
        .includes(%i[bookmarkable])
        .order('id DESC')        
        .map do |record|
          record.attributes.merge(
            bookmarkable: record.bookmarkable,
          )
        end

      json_response(bookmarks)
    end

    def create
      bookmark = Bookmark.find_by(bookmarkable_params)
      if bookmark.present?
        bookmark.update(status: Bookmark.statuses[bookmark.status] == 1 ? 0 : 1)
      else
        Bookmark.create!(bookmarkable_params.merge(status: :active))
      end

      head :ok
    end

    private

    def bookmarkable_params
      new_params = params.permit(:bookmarkable_type, :bookmarkable_id).merge({
        user_id: current_user.id
      })
      head :forbidden and return unless ALLOWED_BOOKMARKABLES.include?(new_params[:bookmarkable_type])

      new_params[:bookmarkable_type] = params[:bookmarkable_type].classify
      new_params
    end
  end
end