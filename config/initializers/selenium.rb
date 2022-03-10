if ENV["GOOGLE_CHROME_BIN"].present?
  Selenium::WebDriver::Chrome.path = ENV["GOOGLE_CHROME_BIN"]
end

if ENV["CHROME_DRIVER_BIN"].present?
  Selenium::WebDriver::Chrome.driver_path = ENV["CHROME_DRIVER_BIN"]
end
