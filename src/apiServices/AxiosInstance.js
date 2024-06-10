import axios from 'axios';
import Logger from './logger';
import {store} from '../redux/Store';
import {addUserData, updateUser} from '../redux/Reducer/login/LoginSlice';
import {RefreshToken} from './apiHelper';
export const SimpleAxiosInstance = axios.create();
SimpleAxiosInstance.interceptors.response.use(
  response => {
    console.log(
      '.\n\nAxiosInstance :: request : \nURL :: ',
      response.config.url,
      '.\n\nHeader :: ',
      response.config?.headers?.Authorization,
    );
    Logger.net('AXIOS Request', response.config?.url);
    Logger.net(response.config?.data, 'Body');
    Logger.net('AXIOS :: RESPONSE :', JSON.stringify(response.data));
    return response;
  },
  async error => {
    try {
      // console.warn(".\n\nAxiosInstance :: request ERROR : \nURL :: ", error?.config?.url,".\n\nHeader :: ", error.config?.headers?.Authorization)
      Logger.net('AXIOS :: URL :', error.config?.url);
      Logger.net('AXIOS :: BODY :', error.config?.data);
      Logger.net('AXIOS :: RESPONSE :', JSON.stringify(error.response?.data));
      Logger.net('AXIOS :: ERROR :  ', error);
      const originalRequest = error.config;
      if (!error.response) {
        return Promise.reject('Network Error');
      }
      // if (error.response.status === 401 && !originalRequest._retry) {
      //     if(!IS_REFRESHING){
      //         await refreshToken()
      //     }
      //     originalRequest._retry = true;
      //     return AxiosInstance(error.config);
      // }
      return Promise.reject(error);
    } catch (error) {
      if (IS_REFRESHING) IS_REFRESHING = false;
      return Promise.reject(error);
    }
  },
);
let IS_REFRESHING = false;
async function refreshToken() {
  IS_REFRESHING = true;
  // const userData = await AsyncStorage.getItem('userData');
  // const { refreshToken } = JSON.parse(userData);
  console.log('user data in instance', store.getState().loginReducer.user);
  const refreshUrl = RefreshToken(
    store.getState().loginReducer.user?.refreshToken,
    store.getState().loginReducer.user?.idToken,
  );
  console.log('.\n\nAXIOS :: Refreshing Token \n\n.', refreshUrl);
  const res = await SimpleAxiosInstance.get(refreshUrl);
  if (res?.data?.status) {
    const data = res.data.object[0];
    store.dispatch(updateUser(data));
  }
  IS_REFRESHING = false;
}
function canProceed() {
  return new Promise((resolve, reject) => {
    if (!IS_REFRESHING) resolve(true);
    let intervalInstance = null;
    let elapsedDuration = 0;
    intervalInstance = setInterval(() => {
      // console.log(".\n\nAXIOS :: waiting for token refresh\n\n.");
      if (!IS_REFRESHING) {
        resolve(true);
        clearInterval(intervalInstance);
      }
      if (elapsedDuration > 10000) {
        reject(false);
        clearInterval(intervalInstance);
      }
      ++elapsedDuration * 1000;
    }, 1000);
  });
}
const AxiosInstance = axios.create();
AxiosInstance.interceptors.request.use(
  async config => {
    // console.log("Store \n."+config.url+".\n\n\n\n\n\n.", Store.getState().login, ".\n\n\n\n\n.");
    if (IS_REFRESHING) {
      await canProceed();
    }
    const access_token = store.getState().loginReducer.user?.idToken;
    // console.log('access_token \n\n\n\n\n\n\n', access_token, '\n\n\n\n\n');
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      // Authorization: `Bearer 1234`,
    };
    // console.log(".\n\nAxiosInstance :: request : \nURL :: ", config.url,".\n\nHeader :: ", config?.headers?.Authorization)
    return config;
  },
  error => {
    // console.log("AxiosInstance :: request error :", error);
    Promise.reject('AXIOS :: request interceptor : error --', error);
  },
);
AxiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    // console.log(".\n\nAxiosInstance :: request : \nURL :: ", response.config.url,".\n\nHeader :: ", response.config?.headers?.Authorization)
    Logger.net('AXIOS Request', response.config?.url);
    Logger.net(response.config?.data, 'Body');
    Logger.net('AXIOS :: RESPONSE :', JSON.stringify(response.data));
    return response;
  },
  async error => {
    try {
      // console.warn(".\n\nAxiosInstance :: request ERROR : \nURL :: ", error?.config?.url,".\n\nHeader :: ", error.config?.headers?.Authorization)
      Logger.net('AXIOS :: URL :', error.config?.url);
      Logger.net('AXIOS :: BODY :', error.config?.data);
      Logger.net('AXIOS :: RESPONSE :', JSON.stringify(error.response?.data));
      Logger.net('AXIOS :: ERROR :  ', error);
      const originalRequest = error.config;
      if (!error.response) {
        return Promise.reject('Network Error');
      }
      if (error.response.status === 401 && !originalRequest._retry) {
        if (!IS_REFRESHING) {
          await refreshToken();
        }
        originalRequest._retry = true;
        return AxiosInstance(error.config);
      }
      return Promise.reject(error);
    } catch (error) {
      if (IS_REFRESHING) IS_REFRESHING = false;
      return Promise.reject(error);
    }
  },
);
export default AxiosInstance;
