import apiRequest from '@app/lib/api';

const index = async (classroomId, resourceId, resourceType) => (
  apiRequest('GET', `/api/classroom/${classroomId}/${resourceType}/${resourceId}/comments`)
);

const create = async (classroomId, resourceId, resourceType, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/${resourceType}/${resourceId}/comments`, body)
);

const update = async (classroomId, resourceId, resourceType, commentId, body) => (
  apiRequest('PATCH', `/api/classroom/${classroomId}/${resourceType}/${resourceId}/comments/${commentId}`, body)
);

const destroy = async (classroomId, resourceId, resourceType, commentId) => (
  apiRequest('DELETE', `/api/classroom/${classroomId}/${resourceType}/${resourceId}/comments/${commentId}`)
);

export default {
  index,
  create,
  update,
  destroy,
};
