import api from './index';

export const getCapedDataById = async id => {
  const response = await api.request({
    url: `/admin/fup/cap-tariff?main_attributes[tariff_id]=${id}`,
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
