import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage를 사용할 경우

import counterReducer from '@/stores/counterStoreTemplate';
import authReducer from '@/stores/authStore';
import testReducer from '@/stores/testStore';
import journeyReducer from '@/stores/journeyStore';
import itemReducer from '@/stores/itemStore';
import taskReducer from '@/stores/taskStore';
import journeyAllReducer from '@/stores/journeyAllStore';
import flightInfoReducer from '@/stores/flightInfoStore';

const rootReducer = combineReducers({
    counter: counterReducer,
    test: testReducer,
    auth: authReducer,
    item: itemReducer,
    task: taskReducer,
    journey: journeyReducer,
    journeyAll: journeyAllReducer,
    flightInfo: flightInfoReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
