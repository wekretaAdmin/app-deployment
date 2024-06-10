import {createSlice} from '@reduxjs/toolkit';
import {MouseButton} from 'react-native-gesture-handler';

const LoginSlice = createSlice({
  name: 'Login Reducer',
  initialState: {
    user: {
      isLogin: false,
      cardId: '',
    },
  },
  reducers: {
    addUserData: (state, action) => {
      console.log(action.payload);
      const updateState = {
        idToken: action.payload.object?.idToken,
        refreshToken: action.payload.object?.refreshToken,
        isLogin: true,
        cardId: state.user.cardId,
      };
      state.user = updateState;
    },
    logoutUser: (state, action) => {
      state.user = {isLogin: false, cardId: ''};
    },
    cardId: (state, action) => {
      // console.log('action.payload', action.payload);
      const updateState = {
        ...state.user,
        cardId: action.payload,
      };
      state.user = updateState;
    },
    updateUser: (state, action) => {
      const updateState = {
        ...state.user,
        idToken: action.payload?.id_token,
        refreshToken: action.payload?.refresh_token,
      };
      state.user = updateState;
    },
    addPhonenumber: (state, action) => {
      const updateState = {
        ...state.user,
        phoneNumber: action.payload,
      };
      state.user = updateState;
    },
    addStoreData: (state, action) => {
      const updateState = {
        ...state.user,
        storeData: action.payload,
      };
      state.user = updateState;
    },
  },
});

export const {
  addUserData,
  logoutUser,
  cardId,
  updateUser,
  addPhonenumber,
  addStoreData,
} = LoginSlice.actions;
export default LoginSlice;
