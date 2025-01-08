import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './index';

export const refreshToken = async () => {
  const token = await AsyncStorage.getItem('refreshToken');

  const response = await api.request({
    url: `/admin/auth/tokens/${token}`,
    method: 'get',
  });

  if (response.remote === 'success') {
    await AsyncStorage.setItem('token', response.data.access_token);
    await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return refreshToken;
};
