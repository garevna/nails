export default {
  user: {
    put: {
      message: true,
      messageType: 'User data saving',
      messageText: 'User have been saved',
    },
  },
  auth: {
    signUpMessage: {
      message: true,
      messageType: 'Registration request',
      messageText: 'Please check your email to complete registration',
    },
    requestReset: {
      message: true,
      messageType: 'Request reset',
      messageText: 'A link to reset your password has been sent to your email',
    },
    resetPass: {
      message: true,
      messageType: 'Reset password',
      messageText: 'Your password has been successfully changed',
    },
    changePass: {
      message: true,
      messageType: 'Change password',
      messageText: 'Your password has been successfully changed',
    }
  },
  online: {
    post: {
      message: true,
      messageType: 'Create online course',
      messageText: 'Your online course has been successfully create',
    },
    put: {
      message: true,
      messageType: 'Update online course',
      messageText: 'Your online course has been successfully update',
    },
    delete: {
      message: true,
      messageType: 'Delete online course',
      messageText: 'Your online course has been successfully remove',
    }
  }
};
