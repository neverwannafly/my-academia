Kimurai.configure do |config|
  config.colorize_logger = true
  config.log_level = :info

  if ENV["GOOGLE_CHROME_BIN"].present?
    config.selenium_chrome_path = ENV["GOOGLE_CHROME_BIN"]
  end
  
  if ENV["CHROME_DRIVER_BIN"].present?
    config.chromedriver_path = ENV["CHROME_DRIVER_BIN"]
  end
end