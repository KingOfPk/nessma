import api from './index';
import {transformUserResponse} from './transform/userTransform';
export const userDetail = async () => {
  const response = await api.request({
    url: '/admin/customers/customer?mail_attributes[id]=1',
    method: 'get',
  });
  if (response.remote === 'success') {
    return {
      remote: response.remote,
      data: transformUserResponse(response.data[0]),
    };
  }
  return response;
};
