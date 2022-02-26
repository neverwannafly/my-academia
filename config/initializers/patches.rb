Dir["#{Rails.root.join('app/patches/').to_s}*.rb"].each {|file| require file }
