// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapApiKey: "AIzaSyCF1nJKGXg2lm9EHP8SaEaWi_AjnmdCDBI",
  openWeatherApiKey: "ca70b88b42943586ca78dfb5b6e04721",
  openWeatherAPI: {
    baseUrl: "https://api.openweathermap.org",
    resourceBaseUrl: "http://openweathermap.org",
    data: "/data",
    image: "/img/wn",
    v2: "/2.5",
    v3: "/3.0",
    basic: "/weather",
    detail: "/onecall",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
