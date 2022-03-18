module Api
  class SessionsController < ApplicationController
    before_action :validate_user, only: %i[destroy]

    def create
      user = User.find_by(username: params[:username])

      if user.present? && user.authenticate(params[:password])
        set_user_cookie(user)
        json_response({
          username: user.username,
          name: user.name || '',
          profilePic: user.profile_pic,
          id: user.id,
        })
      else
        json_response({ error: 'Invalid username or password' })
      end
    end

    def destroy
      invalidate_user_cookie

      head :ok
    end
  end
end
