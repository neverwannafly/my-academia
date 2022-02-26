import apiRequest from '@app/lib/api';

import comments from './comments';
import resources from './resources';

const index = async () => (
  apiRequest('GET', '/api/classroom')
);

const quote = async () => (
  apiRequest('GET', '/api/classroom/0/quote/')
);

export default {
  index,
  quote,
  comments,
  resources,
};
