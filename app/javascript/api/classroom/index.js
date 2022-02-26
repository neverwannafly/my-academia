import apiRequest from '@app/lib/api';

import comments from './comments';
import resources from './resources';

const index = async () => (
  apiRequest('GET', '/api/classroom')
);

const quote = async () => (
  apiRequest('GET', '/api/classroom/0/quote/')
);

const like = async (classroomId, likeableType, likeableId) => (
  apiRequest('POST', `/api/classroom/${classroomId}/like`, {
    likeable_type: likeableType,
    likeable_id: likeableId,
  })
);

export default {
  index,
  like,
  quote,
  comments,
  resources,
};
