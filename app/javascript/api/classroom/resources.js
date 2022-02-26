import apiRequest from '@app/lib/api';

const index = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/resources`)
);

const create = async (classroomId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/resources`, body)
);

const update = async (classroomId, resourceId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/resources/${resourceId}`, body)
);

const destroy = async (classroomId, resourceId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/resources/${resourceId}`, body)
);

const markCompleted = async (classroomId, resourceId) => (
  apiRequest('POST', `/api/classroom/${classroomId}/resources/${resourceId}/mark_completed`)
);

export default {
  index,
  create,
  update,
  destroy,
  markCompleted,
};
