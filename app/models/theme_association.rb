class ThemeAssociation < ApplicationRecord
  belongs_to :theme
  belongs_to :associate, polymorphic: true
end
