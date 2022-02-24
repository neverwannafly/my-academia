class ApiRequest
  SUPPORTED_REQUESTS = [:get, :post, :patch, :delete, :put]
  UNSUPPORTED_HTTP_REQUEST_ERROR = "This request type isnt supported. Use #{ApiRequest::SUPPORTED_REQUESTS}"

  class << self
    def request(method:, body: {}, url:)
      raise ApiRequest::UNSUPPORTED_HTTP_REQUEST_ERROR unless ApiRequest::SUPPORTED_REQUESTS.include?(method)

      url = create_hit_url(url, body) if method == :get

      http = create_http_request(method, url)
      request = request_object(method, url)

      request.body = body.to_json unless method == :get

      http.request(request)
    end

    private

    def create_http_request(method, url, use_ssl = true)
      formatted_url = URI(url)
      http = Net::HTTP.new(formatted_url.host, formatted_url.port)
      http.use_ssl = use_ssl
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      http.read_timeout = 5 # 5 seconds

      http
    end

    def request_object(method, url)
      Object.const_get("Net::HTTP::#{method.to_s.titleize}").new(url)
    end

    def create_hit_url(url, params = {})
      params = Rack::Utils.build_query(params) if params.present?
      "#{url}?#{params}".gsub("+", "%20")
    end
  end
end
