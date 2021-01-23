export default {
  user: {
    get: {
      error: true,
      errorType: 'Get user',
      errorMessage: 'Process failed... User was not received',
    },
    put: {
      error: true,
      errorType: 'User preservation error',
      errorMessage: 'Process failed... Data was not saved',
    },
  },

  address: {
    get: {
      error: true,
      errorType: 'Reading requests',
      errorMessage: 'Process failed. Data was not received',
    },
    history: {
      error: true,
      errorType: 'Send message back',
      errorMessage: 'Process failed. Message has not been delivered',
    },
  },
  connection: {
    post: {
      error: true,
      errorType: 'Create connection',
      errorMessage: 'Process failed. Data was not saved',
    },
  },
  common: {
    get: {
      error: true,
      errorType: 'Reading tikets',
      errorMessage: 'Process failed. Data was not received',
    },
    post: {
      error: true,
      errorType: 'Creating tiket',
      errorMessage: 'Process failed. Data was not saved',
    },
    history: {
      error: true,
      errorType: 'Send message back',
      errorMessage: 'Process failed. Message has not been delivered',
    },
  },
  tariff: {
    get: {
      error: true,
      errorType: 'Reading tikets',
      errorMessage: 'Process failed. Data was not received',
    },
  },
  polygons: {
    get: {
      error: true,
      errorType: 'Get polygons',
      errorMessage: 'Process failed. Data was not received',
    },
  },
  pits: {
    get: {
      error: true,
      errorType: 'Get pits',
      errorMessage: 'Process failed. Data was not received',
    },
  },
};
