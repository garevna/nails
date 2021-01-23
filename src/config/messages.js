export default {
  user: {
    put: {
      message: true,
      messageType: 'User data saving',
      messageText: 'User have been saved'
    }
  },
  address: {
    history: {
      message: true,
      messageType: 'Send message back',
      messageText: 'Success. Message has been delivered'
    }
  },
  connection: {
    post: {
      message: true,
      messageType: 'Create connection',
      messageText: 'Success. Message has been delivered'
    }
  },
  common: {
    post: {
      message: true,
      messageType: 'Create ticket',
      messageText: 'Success. Message has been delivered'
    },
    history: {
      message: true,
      messageType: 'Send message back',
      messageText: 'Success. Message has been delivered'
    }
  }
}
