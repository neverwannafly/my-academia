import apiRequest from '@app/lib/api';

const index = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/stats`)
);

export default { index };
