export const CUBE_SALES_PAGES = {
  measures: ['Tabs.count'],
  timeDimensions: [
    {
      dimension: 'Tabs.updatedAt',
      dateRange: 'Last year',
    },
  ],
  dimensions: [
    'Tabs.id',
    'Tabs.name',
    'Users.name',
    'Users.email',
    'Users.uuid',
    'Tabs.createdAt',
    'Tabs.status',
    'Tabs.paymentsTotal',
  ],
  filters: [],
};

export const CUBE_SALES_PAGES_COUNT = {
  measures: ['Tabs.count'],
  timeDimensions: [
    {
      dimension: 'Tabs.updatedAt',
      dateRange: 'Last year',
    },
  ],
  dimensions: [],
  filters: [],
};
