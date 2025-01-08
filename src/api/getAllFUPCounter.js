import api from './index';

export const gteAllFUPCounter = async id => {
  console.log(`/admin/fup/counter/${id}`);
  const response = await api.request({
    url: `/admin/fup/counter/${id}`,
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
