export const environment = {
  production: true,
  api: {
    basePort: 8100,
    baseUrl: 'http://runner.bagps.vn',
    authentication: {
      login: 'api/v1/authentication/login',
      register: 'api/v1/authentication/register',
    },
    users: {
      all: 'api/v1/users/all',
      active: 'api/v1/users/active',
      profile: 'api/v1/users/profile',
      sync: 'api/v1/users/sync'
    },
    event: {
      current: 'api/v1/events/current',
      list: 'api/v1/events/list',
      register: 'api/v1/events/reg-event'
    }
  },
  redirectLink: 'http://runner.bagps.vn',
  clubId: '1148881'
};
