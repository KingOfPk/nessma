import api from './index';

export const getAllTarrifPlan = async id => {
  console.log(`/admin/tariffs/tariffs-for-change?type=internet&id=${id}`);
  const response = await api.request({
    url: `/admin/tariffs/tariffs-for-change?type=internet&id=${id}`,
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
