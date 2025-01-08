import api from './index';

export const getCustomerDocument = async id => {
  const response = await api.request({
    url: `/admin/customers/customer-documents/${id}`,
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
