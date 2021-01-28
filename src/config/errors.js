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

  online: {
    get: {
      error: true,
      errorType: 'Reading requests',
      errorMessage: 'Process failed. Data was not received',
    },
    buy: {
      error: true,
      errorType: 'Buy online course',
      errorMessage: 'Process failed. Message has not been delivered',
    },
  },
  offline: {
    get: {
      error: true,
      errorType: 'Reading requests',
      errorMessage: 'Process failed. Data was not received',
    },
    buy: {
      error: true,
      errorType: 'Buy offline course',
      errorMessage: 'Process failed. Message has not been delivered',
    },
  },
};
