export default {
  auth: {
    get: {
      error: true,
      errorType: 'Get user',
      errorMessage: 'Process failed... Data was not received',
    },
    put: {
      error: true,
      errorType: 'User preservation error',
      errorMessage: 'Process failed... Data was not saved',
    },
    signIn: {
      error: true,
      errorType: 'Sign in error',
      errorMessage: 'Process failed... Data was not saved',
    },
    signUp: {
      error: true,
      errorType: 'Sign up error',
      errorMessage: 'Process failed... Data was not saved',
    },
  },

  online: {
    get: {
      error: true,
      errorType: 'Reading online requests',
      errorMessage: 'Process failed. Data was not received',
    },
    post:{

    },
    delete: {
      error: true,
      errorType: 'Delete requests',
      errorMessage: 'Process failed...'
    },
    buy: {
      error: true,
      errorType: 'Buy online course',
      errorMessage: 'Process failed. Message has not been delivered',
    },
    addLesson:{
      error: true,
      errorType: 'Upload requests',
      errorMessage: 'Process failed... Data was not saved',
    },
    addPdf:{
      error: true,
      errorType: 'Upload requests',
      errorMessage: 'Process failed... Data was not saved',
    }
  },
  offline: {
    get: {
      error: true,
      errorType: 'Reading offline requests',
      errorMessage: 'Process failed. Data was not received',
    },
    buy: {
      error: true,
      errorType: 'Buy offline course',
      errorMessage: 'Process failed. Message has not been delivered',
    },
  },
  instagram: {
    get: {
      error: true,
      errorType: 'Reading instagram request',
      errorMessage: 'Process failed. Data was not received',
    },
  }
};
