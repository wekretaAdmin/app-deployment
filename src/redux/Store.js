import {combineReducers, configureStore} from '@reduxjs/toolkit';
import Api from './Reducer/Api';
import ComponetsData from './Reducer/ComponentsData';
import LoginSlice from './Reducer/login/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const combineReducer = combineReducers({
  api: Api.reducer,
  ComponetsData: ComponetsData.reducer,
  loginReducer: LoginSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, combineReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(Api.middleware, ComponetsData.middleware),
});
export const persistor = persistStore(store);
