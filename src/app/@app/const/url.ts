/**
 * ApiService -
 * we can inject this service into any component to get Api Endpoint.
 */
// in java @see ApiConstants.ENDPOINT
const ENV_URL = '';

// const BASE = ENV_URL + '/api';// + '/api/edu/v1';
// const BASE_REST = ENV_URL + '/rest';

// major operations  api/...
// const CHANNEL = BASE + '/channel';
// const ASSET = BASE + '/asset';
// const DATA_CLEAN = BASE + '/data-clean';
// const DEVICE = BASE + '/device';
// const PROFILE = BASE + '/profile'; // GET
// const EMPLOYEE = BASE + '/employee';
// const REPORT_SECURE = BASE + '/report';

// ******************************************
// const APP_DATA = BASE + '/app-data';
// const MJR_ORG = BASE + '/org';
// const MJR_BRANCH = BASE + '/branch';

// Common operations
const PARTLY_UPDATE = '/partly-update';
const ADD_UPDATE = '/add-update';
const ADD_UPDATE_ALL = '/add-update-all';
const DELETE = '/delete';
const LIST = '/list';
const DETAIL = '/detail';

// ************************************************************************************************
// ***************************************          BASE         **********************************
// ************************************************************************************************
// APP operations /api/ride/v1/...
const BASE_CORE = ENV_URL + '/api/core/v1';


// major operations  /api/commerce/v1/...
const MJR_ORG = BASE_CORE + '/org';
const MJR_USER = BASE_CORE + '/user';

/**
 * END_POINT URL URL
 */
export const URL = {

    // ******************************************************************
    // Org API endpoint
    ADD_UPDATE_ORG: MJR_ORG + ADD_UPDATE,
    ORG_LIST: MJR_ORG + LIST,

    // ******************************************************************
    // Org API endpoint
    ADD_UPDATE_USER: MJR_ORG + ADD_UPDATE,
   

    // ************************************************************************************************
    Z_LAST: 'Do-Not-Delete'
};
