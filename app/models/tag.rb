class Tag < ApplicationRecord
  enum tag_type: %i[generic]
  enum status: %i[active inactive]
end
