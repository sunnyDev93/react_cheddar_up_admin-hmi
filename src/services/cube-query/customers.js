export const CUBE_CUSTOMERS = {
  dimensions: [
    'Customers.email',
    'Customers.name',
    'Users.name',
    'Payments.total',
  ],
  measures: ['Payments.count', 'Tabs.count', 'PaymentItems.totalQuantity'],
  timeDimensions: [
    {
      dimension: 'Customers.lastSeenAt',
      dateRange: 'Last year',
    },
  ],
  filters: [],
};

export const CUBE_CUSTOMERS_COUNT = {
  measures: ['Customers.count'],
  timeDimensions: [
    {
      dimension: 'Customers.lastSeenAt',
      dateRange: 'Last year',
    },
  ],
  dimensions: [],
  filters: [],
};
