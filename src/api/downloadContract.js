import api from './index';

export const downloadContract = async id => {
  console.log(`/admin/fup/counter/${id}`);
  const response = await api.request({
    url: `admin/config/download/customer_documents--${id}`,
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
