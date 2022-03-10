puts 'hello'

Kimurai.configure do |config|
  config.colorize_logger = true
  config.log_level = :info

  if ENV["GOOGLE_CHROME_BIN"].present?
    config.selenium_chrome_path = '/app/.apt/usr/bin/google-chrome'
  end
  
  if ENV["CHROME_DRIVER_BIN"].present?
    config.chromedriver_path = '/app/.chromedriver/bin/chromedriver'
  end
end

Kimurai::BrowserBuilder.module_eval do
  def self.new_build(engine, config = {}, spider:)
    browser = build(engine, config, spider: spider)

    browser.driver.instance_eval {
      def current_memory
        return 0
      end
    }

    return browser
  end
end

module Kimurai
  class Base
    def browser
      @browser ||= BrowserBuilder.new_build(@engine, @config, spider: self)
    end
  end
end
