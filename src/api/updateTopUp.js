import api from './index';
export const updateTopUpPlan = async data => {
  const response = await api.request({
    url: `/admin/fup/capped-data`,
    method: 'POST',
    data,
  });
  if (response.remote === 'success') {
    // localStorage.setItem("token", response.data.token);
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
};
