class DailyQuotesService < ::ServiceBase
  API_ENDPOINT = "https://motivational-quotes1.p.rapidapi.com/motivation"
  HEADERS = {
    'content-type': 'application/json',
    'x-rapidapi-host': 'motivational-quotes1.p.rapidapi.com',
    'x-rapidapi-key': 'f26b693153msh7aeaae3dc14a221p1b92d5jsn20e8b60c192e'
  }
  CACHE_KEY = 'QUOTE_OF_THE_DAY'

  def initialize
  end

  def execute
    super do
      success(fetch_quote)
    end
  end

  private

  def fetch_quote
    Rails.cache.fetch(CACHE_KEY, expires_in: 1.hours) do
      api_response = api_request
      api_response.body
    end
  end

  def api_request
    ApiRequest.request api_request_params
  end

  def api_request_params
    {
      method: :post,
      url: API_ENDPOINT,
      headers: HEADERS,
      body: {}
    }
  end
end
