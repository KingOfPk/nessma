import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './index';
export const login = async data => {
  const response = await api.request({
    url: '/admin/auth/tokens',
    method: 'POST',
    data,
  });
  if (response.remote === 'success') {
    // localStorage.setItem("token", response.data.token);
    console.log(response.data);
    await AsyncStorage.setItem('token', response.data.access_token); // set access token on local storage which is provided by splynx
    await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
    return {
      remote: response.remote,
      data: response,
    };
  }
  return response;
};
