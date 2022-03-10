desc "Populate classroom resources links with necessary tags"

task populate_tags: :environment do
  if ENV["GOOGLE_CHROME_BIN"].present?
    Selenium::WebDriver::Chrome.path = ENV["GOOGLE_CHROME_BIN"]
    Selenium::WebDriver::Chrome.driver_path = '/app/.chromedriver/bin/chromedriver'
  end

  ClassroomResource.problem.all.each do |resource|
    next unless resource.link.match(/.*leetcode.com.*/)

    WebScrapper.class_eval { @start_urls = [resource.link] }
    WebScrapper.crawl!

    tag_ids = []
    WebScrapper.response.each do |tag|
      tag_ids << Tag.find_or_create_by(name: tag.downcase, tag_type: :generic).id
    end

    TagAssociation.update_associations(resource, tag_ids: tag_ids)
  end
end
