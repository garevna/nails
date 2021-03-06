export default {
  firstName: {
    label: 'First name',
    type: 'text',
    required: true,
  },
  lastName: {
    label: 'Last name',
    type: 'text',
    required: true,
  },
  email: {
    label: 'Email',
    type: 'email',
    required: true,
  },
  phone: {
    label: 'Phone number',
    type: 'phone',
    required: true,
  },
  deliveryAddress: {
    label: 'Delivery address',
    type: 'autocomplete',
    required: false,
  },
};
