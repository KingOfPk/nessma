import api from './index';

export const getAllTransaction = async () => {
  const response = await api.request({
    url: '/admin/finance/transactions',
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
