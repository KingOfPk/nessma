// https://my.nessmanet.ly/api/2.0/admin/config/download/invoices--29001
import api from './index';

export const getDocumentFile = async (type, id) => {
  const response = await api.request({
    url: `/admin/config/download/${type}--${id}`,
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
