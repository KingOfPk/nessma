import api from './index';
export const changeTariffPlan = async (data, serviceId) => {
  console.log(`/admin/tariffs/change-tariff/${serviceId}?type=internet`, data);
  const response = await api.request({
    url: `/admin/tariffs/change-tariff/${serviceId}?type=internet`,
    method: 'PUT',
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
