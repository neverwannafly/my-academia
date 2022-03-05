import apiRequest from '@app/lib/api';

const index = async (classroomId) => (
  apiRequest('GET', `/api/classroom/${classroomId}/bookmarks`)
);

const create = async (classroomId, type, id) => (
  apiRequest('POST', `/api/classroom/${classroomId}/bookmarks`, {
    bookmarkable_type: type,
    bookmarkable_id: id,
  })
);

export default { index, create };
