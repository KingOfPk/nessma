import api from './index';

export const getCustomerCapedData = async () => {
  const response = await api.request({
    url: `/admin/fup/capped-data`,
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
