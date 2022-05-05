const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;



// 1. action => {type: ""}
// 2. reducer => func(prevState, action) => (newState)
// 3. store => {}

// 1. action : (variable, actionCreator)
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"

// action creator
function buyCake() {
    return {
        type: BUY_CAKE
    }
}
function buyIcecream() {
    return {
        type : BUY_ICECREAM
    }
}

// 2. reducer : how to tarnsform state
// (state, action) => (newState)

// const initialState = {
//     numOfCake : 10,
//     numOfIcecream : 20,
// }
const initialCakeState = {
    numOfCakes : 10,
}
const initialIcecreamState = {
    numOfIcecreams : 20,
}

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE:
//             return {...state, numOfCake : state.numOfCake-1}
//         case BUY_ICECREAM:
//             return {...state, numOfIcecream : state.numOfIcecream-1}    
//         default:
//             return state;    
//     }
// }

const cakeReduer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {...state, numOfCake: state.numOfCakes -1}    
        default:
            return state;
    }
}
const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {...state, numOfIcecreams: state.numOfIcecreams -1}  
        default:
            return state
         }
}
// combine Reducers:
const reducer = combineReducer({
    cake: cakeReduer,
    icecream : icecreamReducer,
})

// 3. store :
const store = createStore(reducer);

store.subscribe(() =>console.log("initial state", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

