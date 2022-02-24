class EngineEvaluationService < ::ServiceBase
  API_TOKEN = 'access_token'
  STRENGTH = 1
  API_ENDPOINT = 'https://playchesswebsite.herokuapp.com/api/stockfish/'
  SERVICE_UNREACHABLE_ERROR = 'Engine Evaluation Service is currently unavailable'
  INVALID_FEN = 'Supplied FEN is invalid'

  def initialize(fen)
    @fen = fen
  end

  def execute
    super do
      api_response = api_request
      unless api_response.code == "200"
        return error(SERVICE_UNREACHABLE_ERROR)
      end

      body = JSON.parse(api_response.body)
      if body['fen_notation_error'].present?
        return error(INVALID_FEN)
      end

      success(JSON.parse(api_response.body))
    end
  end

  private

  def api_request
    ApiRequest.request api_request_params
  end

  def api_request_params
    {
      method: :get,
      url: API_ENDPOINT,
      body: {
        token: API_TOKEN,
        strength: STRENGTH,
        fen_notation: @fen,
      }
    }
  end
end
