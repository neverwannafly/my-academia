/* eslint-disable import/prefer-default-export */
import { extractDateTime } from '@app/utils/datetime';

export const groupResourcesByDate = (resources) => {
  const groupedResources = {};
  resources.forEach((resource) => {
    const [date] = extractDateTime(resource.created_at);
    if (date in groupedResources) {
      groupedResources[date].push(resource);
    } else {
      groupedResources[date] = [resource];
    }
  });

  return groupedResources;
};

export const filterResources = (classroomItem, filterState) => {
  const { tags, state, type } = filterState;
  const {
    props: {
      resource_tags: resourceTags,
      resource_type: resourceType,
      bookmarked,
      score,
    },
  } = classroomItem;

  let shouldAllow = true;
  if (tags.length > 0) {
    shouldAllow = false;
    if (resourceTags) {
      tags.forEach((tag) => {
        if (resourceTags.includes(tag)) {
          shouldAllow ||= true;
        }
      });
    }
  }

  if (state.length > 0) {
    shouldAllow = false;
    if (state.includes('bookmarked') && bookmarked) {
      shouldAllow = true;
    }

    if (state.includes('complete') && score && score > 0) {
      shouldAllow = true;
    }

    if (state.includes('incomplete') && !score) {
      shouldAllow = true;
    }
  }

  if (type.length > 0) {
    shouldAllow = false;
    if (type.includes(resourceType)) {
      shouldAllow = true;
    }
  }

  return shouldAllow;
};
