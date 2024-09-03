// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas';
// import rootReducer from "./reducers";
// const sagaMiddleware = createSagaMiddleware();
//
// export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//
// sagaMiddleware.run(rootSaga);

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {movieReducer} from './reducers/movieReducers';
import {userReducer} from "./reducers/userReducers";
import authReducer from "./reducers/authReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); // Run the root saga

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
