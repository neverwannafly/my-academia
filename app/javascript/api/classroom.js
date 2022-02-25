import apiRequest from '@app/lib/api';

const resources = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/resources`)
);

const quote = async () => (
  apiRequest('GET', '/api/classroom/0/quote/')
);

const comments = async (classroomId, resourceId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/${resourceId}/comments`)
);

const createResource = async (classroomId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/resources`, body)
);

const createComment = async (classroomId, resourceId, body) => (
  apiRequest('POST', `/api/classroom/${classroomId}/${resourceId}/comments`, body)
);

export default {
  resources,
  quote,
  comments,
  createResource,
  createComment,
};
