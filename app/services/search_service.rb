class SearchService < ::ServiceBase
  attr_accessor :search_term

  def initialize(*args)
    @search_term = args[0][:search_term]
  end

  def execute
    super do
      success(relevant_searches)
    end
  end

  private

  def relevant_searches
    comments + resources
  end

  def comments
    Comment
      .joins(:user)
      .where("title iLIKE '%#{search_term}%'")
      .select(:id, :title, :commentable_type, :commentable_id, 'users.profile_pic')
      .limit(5)
  end

  def resources
    ClassroomResource
      .joins(:user)
      .where("title iLIKE '%#{search_term}%'")
      .select(:id, :title, 'users.profile_pic')
      .limit(5)
  end
end
