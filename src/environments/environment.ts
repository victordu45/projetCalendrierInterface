// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//sqdlkksq
export const environment = {
  production: false,

  //mettre l'adresse ip des deux serveurs
  adressePython: 'http://192.168.1.9:5000',
  adresseSocket: 'http://192.168.1.59:5001'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.ss
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
