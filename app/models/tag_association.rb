class TagAssociation < ApplicationRecord
  belongs_to :tag
  belongs_to :taggable, polymorphic: true

  def self.add_tags_by_id(taggable, tag_ids)
    return false unless tag_ids.present?

    tag_ids.each do |tag_id|
      TagAssociation.find_or_create_by(:taggable => taggable, :tag_id => tag_id)
    end
  end

  def self.update_associations(taggable, tag_type: nil, tag_names: nil, tag_ids: nil)
    existing_tag_ids = TagAssociation
                        .where(taggable: taggable)
                        .joins(:tag)
                        .where(:tags => {:tag_type => tag_type})
                        .pluck(:tag_id)

    ids_to_be = tag_ids || Tag.where(:name => tag_names, :tag_type => tag_type).pluck(:id)
    new_tag_ids = ids_to_be - existing_tag_ids
		TagAssociation.add_tags_by_id(taggable, new_tag_ids)
    old_tag_ids = existing_tag_ids - ids_to_be
    TagAssociation.where(:taggable => taggable, :tag_id => old_tag_ids).destroy_all
  end
end
