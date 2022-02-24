class ServiceBase
  def execute
    initialize_response

    yield
  end

  def self.execute(*args, &block)
    new(*args, &block).execute
  end

  def initialize_response
    @response = Struct.new(:success, :data, :error).new
  end

  def success(data)
    @response.success = true
    @response.data = data

    @response
  end

  def error(error)
    @response.success = false
    @response.error = error

    @response
  end
end
