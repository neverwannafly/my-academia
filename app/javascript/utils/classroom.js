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
