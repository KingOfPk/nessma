import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './index';
export const dashboard = async () => {
  const response = await api.request({
    url: '/portal/dashboard/dashboard',
    method: 'get',
  });
  if (response.remote === 'success') {
    return {
      remote: response.remote,
      data: response,
    };
  }
  return response;
};
