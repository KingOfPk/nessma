import api from './index';

export const getAllUserService = async id => {
  const response = await api.request({
    url: `/admin/customers/customer/${id}/internet-services`,
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
