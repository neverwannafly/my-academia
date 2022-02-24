const { environment } = require('@rails/webpacker');

const path = require('path');

const additionalConfig = {
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, '..', '..', 'app/javascript/'),
    },
  },
};

environment.config.merge(additionalConfig);

module.exports = environment;
