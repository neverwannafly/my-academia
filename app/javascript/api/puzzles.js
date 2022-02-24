import apiRequest from '@app/lib/api';

const random = async (strength) => {
  const options = {};
  if (strength) {
    options.params = { strength };
  }
  return apiRequest('GET', '/api/puzzles/random-puzzle', null, options);
};

const load = async (slug) => (
  apiRequest('GET', `/api/puzzles/${slug}`)
);

export default {
  random,
  load,
};
