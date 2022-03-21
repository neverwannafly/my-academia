import apiRequest from '@app/lib/api';

const index = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/tasks`)
);

const create = async (classroomId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/tasks`, body)
);

const update = async (classroomId, taskId, body) => (
  apiRequest('PATCH', `/api/classroom/${classroomId}/tasks/${taskId}`, body)
);

const destroy = async (classroomId, taskId) => (
  apiRequest('DELETE', `/api/classroom/${classroomId}/tasks/${taskId}`)
);

export default {
  index,
  create,
  update,
  destroy,
};
