import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(...middlewares)
    ),
);

export default store