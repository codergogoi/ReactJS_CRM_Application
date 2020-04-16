import store from './../Stores';

//live server

//'http://localhost:8888/sales_engine/api/'; 
//'http://betaapp.benzyinfotech.com/beta/sales/sales_engine/api/'


// //Local Server [Development]
export const UPLOAD_URL = 'http://localhost:8888/sales_engine/api/';  
export const BASE_URL = 'http://localhost:8888/sales_engine/api/'

// // Remote Server [Production]
// export const UPLOAD_URL = '/sales_engine/api/';  
// export const BASE_URL = '/sales_engine/api/'

// Remote Server [Development]
// export const UPLOAD_URL = '/beta/sales/sales_engine/api/';  
// export const BASE_URL = '/beta/sales/sales_engine/api/'

// PackageJSON
// "homepage": "http://betaapp.benzyinfotech.com/beta/sales/",
// "homepage": "http://salesapp.benzyinfotech.com/",

export const MAPKEY = "AIzaSyDOsCY0VM3PTppPhHBqhrqXRX-JUaexPbs";

export const COUNTRY = localStorage.getItem('currency');

export const ROLE = () => {
    const current_state = store.getState();
    const { role } = current_state.userReducer;
    return role;
};
