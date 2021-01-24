export default {
  items: [
    {
      id: 1,
      name: 'Shop',
      children: [
        {
          id: 2,
          name: 'Nippers',
          params: { categoryName: 'cuticle-nippers' },
          routeName: 'shop',
        },
        {
          id: 3,
          name: 'Scissors',
          params: { categoryName: 'cuticle-scissors' },
          routeName: 'shop',
        },
        {
          id: 4,
          name: 'Drill bits',
          params: { categoryName: 'diamond-drill-bits' },
          routeName: 'shop',
        },
        {
          id: 5,
          name: 'Brushers',
          params: { categoryName: 'brushes' },
          routeName: 'shop',
        },
        {
          id: 6,
          name: 'more...',
          children: [
            {
              id: 7,
              name: 'Cosmetics',
              params: { categoryName: 'cosmetics' },
              routeName: 'shop',
            },
            {
              id: 8,
              name: 'Promotions',
              params: { categoryName: 'Promotions' },
              routeName: 'shop',
            },
          ],
        },
      ],
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
