export const CUBE_DISTRIBUTORS = {
  dimensions: [
    'EnhancedUsers.uuid',
    'EnhancedUsers.id',
    'EnhancedUsers.name',
    'EnhancedUsers.createdAt',
    'EnhancedUsers.email',
    'EnhancedUsers.status',
    'EnhancedUsers.tabsCount',
    'EnhancedUsers.paymentsTotal',
    'EnhancedUsers.balance',
    'EnhancedUsers.lastActiveAt',
    'EnhancedUsers.profilePicturePath',
    'EnhancedUsers.profilePictureMetadata',
  ],
  measures: ['EnhancedUsers.count'],
  timeDimensions: [
    {
      dimension: 'EnhancedUsers.lastActiveAt',
      dateRange: 'Last year',
    },
  ],
  filters: [],
};

export const CUBE_DISTRIBUTORS_COUNT = {
  dimensions: [],
  measures: ['EnhancedUsers.count'],
  timeDimensions: [
    {
      dimension: 'EnhancedUsers.lastActiveAt',
      dateRange: 'Last year',
    },
  ],
  filters: [],
};
