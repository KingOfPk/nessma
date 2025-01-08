import api from './index';

export const getUserInvoice = async () => {
  const response = await api.request({
    url: '/admin/finance/invoices',
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
