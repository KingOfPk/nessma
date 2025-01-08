import api from './index';

export const getAllTickets = async () => {
  const response = await api.request({
    url: `/admin/support/tickets`,
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
