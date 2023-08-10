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
const MJR_SERVICE_ITEM = BASE_CORE + '/service-item';
const MJR_BOOKING = BASE_CORE + '/booking';

/**
 * END_POINT URL URL
 */
export const URL = {

    // ******************************************************************
    // Org API endpoint
    ADD_UPDATE_ORG: MJR_ORG + ADD_UPDATE,
    ORG_LIST: MJR_ORG + LIST,
    ADD_UPDATE_SERVICE_ITEM: MJR_SERVICE_ITEM + ADD_UPDATE,
    SERVICE_ITEM_LIST: MJR_SERVICE_ITEM + LIST,
    DOCTOR_ITEM_LIST: MJR_USER + '/staff-subrole-list',
    LAST_ORDER_NO: MJR_ORG + '/last-order-no',

    // ******************************************************************
    // User API endpoint
    ADD_UPDATE_USER: MJR_ORG + ADD_UPDATE,
    STAFF_LIST: MJR_USER + '/staff-list',
    ADD_UPDATE_STAFF: MJR_USER + '/staff-add-update',
    ACCESS_LIST: MJR_USER + '/access-list',

    // ******************************************************************
    // Booking API endpoint
    ADD_UPDATE_BOOKING: MJR_BOOKING + ADD_UPDATE,
    BOOKING_LIST: MJR_BOOKING + LIST,
    ORG_BOOKING_LIST: MJR_BOOKING + '/list-by-org',
    ADD_UPDATE_DEPARTMENT: MJR_ORG + '/department-add-update',
    ORG_DEPARTMENT_LIST: MJR_ORG + '/department-list',
    
    // ************************************************************************************************
    Z_LAST: 'Do-Not-Delete'
};
