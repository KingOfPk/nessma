import api from './index';

export const getAllTicketType = async () => {
  const response = await api.request({
    url: `/admin/support/tickets-types`,
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
