import apiRequest from '@app/lib/api';

const index = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/activities`)
);

export default { index };
