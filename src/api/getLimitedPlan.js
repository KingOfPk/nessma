import api from './index';

export const getLimitedPlans = async () => {
  const response = await api.request({
    url: '/admin/fup/cap-tariff',
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
