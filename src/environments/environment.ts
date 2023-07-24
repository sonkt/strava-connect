// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    basePort: 33333,
    baseUrl: 'http://localhost',
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
  redirectLink: 'http://localhost:4200',
  clubId: '1148881'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
