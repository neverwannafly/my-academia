module Api
  class RegistrationsController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        set_user_cookie(user)
        # Move the below code to an appropriate presenter
        json_response({
          username: user.username,
          name: user.name || '',
        })
      else
        json_response({ error: user.errors }, :unprocessable_entity)
      end
    end

    private

    def user_params
      params.require(:registration).permit(:email, :username, :password, :password_confirmation)
    end
  end
end
