import {getApiWithouttoken} from './adminApi';
import api from './index';
import {UpdateUserProfile} from './updateUserProfile';
export const refillCard = async data => {
  const response = await api.request({
    url: '/admin/finance/refill-cards/0?redeem=true',
    method: 'PUT',
    data,
  });
  if (response.remote === 'success') {
    const result = getApiWithouttoken(`/status-change/${data.customer_id}`);
    console.log(result);
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
};
