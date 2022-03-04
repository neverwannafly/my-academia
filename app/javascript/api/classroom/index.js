import apiRequest from '@app/lib/api';

import comments from './comments';
import resources from './resources';
import activities from './activities';
import stats from './stats';

const index = async () => (
  apiRequest('GET', '/api/classroom')
);

const quote = async () => (
  apiRequest('GET', '/api/classroom/0/quote/')
);

const search = async (classroomId, searchTerm) => (
  apiRequest('GET', `/api/classroom/${classroomId}/search?query=${searchTerm}`)
);

const like = async (classroomId, likeableType, likeableId) => (
  apiRequest('POST', `/api/classroom/${classroomId}/like`, {
    likeable_type: likeableType,
    likeable_id: likeableId,
  })
);

export default {
  index,
  search,
  like,
  activities,
  quote,
  comments,
  resources,
  stats,
};
