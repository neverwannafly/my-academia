class ApplicationController < ActionController::Base
  attr_accessor :current_user

  before_action :set_user
  before_action :set_cache_headers

  private

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Mon, 01 Jan 1990 00:00:00 GMT"
  end

  def set_user
    token = session[:authorization]
    return unless token.present?

    token = ::JwtAuth.validate_token(token)
    return unless token.present?

    @current_user ||= User.find_by(id: token[:id])
  end

  def validate_user
    head :forbidden and return if current_user.blank?
  end

  def set_user_cookie(user)
    token = ::JwtAuth.issue_token(user)
    session[:authorization] = token
  end

  def invalidate_user_cookie
    session[:authorization] = nil
  end

  def json_response(object, status = :ok)
    render json: object, status: status
  end
end
