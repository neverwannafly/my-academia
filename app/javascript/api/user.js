import apiRequest from '@app/lib/api';

const logout = async () => (
  apiRequest('DELETE', '/api/sessions/1')
);

export default {
  logout,
};
