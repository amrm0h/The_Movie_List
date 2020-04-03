import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import {allMoviesReducer} from "../ducks/movies";
import {filtersReducer} from "../ducks/filter";




/* Store creation */

const reducerCombination = combineReducers({
    movies: allMoviesReducer,
    filters: filtersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducerCombination,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;