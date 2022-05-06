// async js => 
const redux = require("redux");
const { default: logger } = require("redux-logger");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;  
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");


// fetch users :
// 1. request => loading...
// 2. success => data
// 3. failure => error

// 1. 
// action:
const FETCH_USERS_REQUESTS = "FETCH_USERS_REQUESTS";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// action creator func :
function fetchUsersRequest() {
    return {
        type : FETCH_USERS_REQUESTS
    }
};
function fetchUsersSuccess(users) {
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users,
    }
};
function fetchUsersFailure(error) {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error,
    }
};

// 2. reducer
const initialState = {
    loading : false,
    data : [],
    error : "",
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTS:
            return {...state, loading: true};
        case FETCH_USERS_FAILURE:
            return {loading: false, error: action.payload, data:[]};    
        case FETCH_USERS_SUCCESS:
            return {loading: false, error: "", data: action.payload};    
        default:
            state;
    }
}



// 4. async action creator :
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
             .then((res) => {
                 const userId = res.data.map((u) => u.id);
                 dispatch(fetchUsersSuccess(userId));
             })
             .catch((err) => {
                 dispatch(fetchUsersFailure(err))
             })
    }
}
// 3. store
const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

store.dispatch(fetchUsers());