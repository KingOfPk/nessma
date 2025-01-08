import api from './index';
export const UpdateUserProfile = async (data, id) => {
  console.log(data, id);
  const response = await api.request({
    url: `/admin/customers/customer/${id}`,
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
