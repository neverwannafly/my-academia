class WebScrapper < Kimurai::Base
  @engine = :selenium_chrome

  class << self
    attr_accessor :response
  end

  def parse(response, url:, data: {})
    sleep 1
    response = browser.current_response
    WebScrapper.response = []

    response.css('a[class^=topic-tag]').each do |row|
      WebScrapper.response << row.children.children.text
    end
  end
end
