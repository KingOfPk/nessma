import api from './index';

export const getDetailedTicket = async (id, customerId) => {
  const response = await api.request({
    url: `/admin/support/ticket-messages?main_attributes[ticket_id]=${id}&main_attributes[customer_id]=${customerId}`,
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
