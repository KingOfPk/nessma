import api from './index';

export const getStatics = async () => {
  const response = await api.request({
    url: '/admin/customers/customer-traffic-counter',
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
