import api from './index';

export const getExpireData = async id => {
  const response = await api.request({
    url: `/admin/customers/billing-info/${id}?format_values=true`,
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
