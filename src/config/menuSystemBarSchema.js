export default {
  items: [
    {
      id: 1,
      name: 'Shop',
      children: [],
    },
    {
      id: 9,
      name: 'NailsAustralia courses',
      children: [
        {
          id: 10,
          name: 'Online courses',
          routeName: 'courses-online',
        },
        {
          id: 11,
          name: 'Offline courses',
          routeName: 'courses-offline',
        },
      ],
    },
    {
      id: 12,
      name: 'All courses',
      routeName: 'courses',
    },
    {
      id: 13,
      name: 'Add courses',
      routeName: 'add-course',
    },
  ],
};
