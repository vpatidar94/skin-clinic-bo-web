/**
 * app-data-type
 *
 * - this will show message '1' which is number representation of enum member
 * console.log(DbKey.TOKEN);
 *
 * - this will show message 'TOKEN' as string representation of enum member
 * console.log(DbKey[DbKey.TOKEN]);
 *
 * To get number value of enum member from string value, use this:
 * - this will show message '2'
 * console.log(DbKey['TOKEN']);
 *
 * - this will show message 'TOKEN'
 * console.log(DbKey[2]);
 */
export enum DbKey {

  /* ************************************ Static Fields ************************************ */
  TOKEN_IID, /* iid - FirebaseInstanceId - String */
  TOKEN_JWT, /* JWT - String */
  FB_USER,
  ROLE,
  ORG_ID,
  SUB_ROLE,
  ORG,
  USER_ACCESS_LIST,
  // DEVICE,
  // NAVIGATION, /* Array */

  APP_CACHE,
  APP_CACHE_GLOBAL,
  SYNC_AT,
  // USE_EXT,

  // Global
  // PROFILE,
  SETTING, /* Setting - SettingDto */
  ORDER,
  // ORDER_ITEM,

// ObjectStoreType
  STAFF,
  USER,

  // Ride - Global
  BASE_RATE,
  VEHICLE_MAKE,

  // Ride - org
  VEHICLE,
}
