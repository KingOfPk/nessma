import api from './index';

export const getUserPayments = async () => {
  const response = await api.request({
    url: '/admin/finance/payments',
    method: 'get',
  });
  if (response.remote === 'success') {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
};
