class WebScrapper < Kimurai::Base
  @engine = :selenium_chrome

  if ENV["GOOGLE_CHROME_BIN"].present?
    Selenium::WebDriver::Chrome.path = ENV["GOOGLE_CHROME_BIN"]
  end
  
  if ENV["CHROME_DRIVER_BIN"].present?
    Selenium::WebDriver::Chrome.driver_path = ENV["CHROME_DRIVER_BIN"]
  end

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
