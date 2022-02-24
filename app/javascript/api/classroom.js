import apiRequest from '@app/lib/api';

const resources = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/resources`)
);

const quote = async () => (
  apiRequest('GET', '/api/classroom/0/quote/')
);

export default {
  resources,
  quote,
};
