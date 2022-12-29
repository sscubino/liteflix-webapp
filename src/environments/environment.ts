// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movies_api_base_url: 'https://api.themoviedb.org/3',
  movies_api_key: '6f26fd536dd6192ec8a57e94141f8b20',
  movies_api_configuration_cache_days_to_live: 7,
  my_movies_list_api_base_url: 'http://127.0.0.1:8000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
