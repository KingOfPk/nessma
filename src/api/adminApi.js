/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://portal.nessmanet.com/api';
// const baseUrl = 'https://digimonk.live/nessmadev/public/api';
import axios from 'axios';
export const postApisWithoutToken = async (url, data) => {
  const config = {
    method: 'post',
    url: `${baseUrl + url}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  try {
    console.log('Config: ', config);
    const response = await axios(config);
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: err.response,
    };
  }
};

export const getApiWithtoken = async url => {
  const token = await AsyncStorage.getItem('token');
  console.log(`${baseUrl + url}`);
  if (token) {
    const config = {
      method: 'get',
      url: `${baseUrl + url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (err) {
      console.log(err);
      // alert(err.message);
      return {
        success: false,
        data: err.message,
      };
    }
  }
};

export const getApiWithouttoken = async url => {
  console.log(`${baseUrl + url}`);

  const config = {
    method: 'get',
    url: `${baseUrl + url}`,
  };
  try {
    const response = await axios(config);
    // console.log(response)
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        data: response.data,
      };
    }
  } catch (err) {
    console.log(err);
    // alert(err.message);
    return {
      success: false,
      data: err.message,
    };
  }
};

export const deleteApiWithtoken = async url => {
  const token = await AsyncStorage.getItem('token');

  console.log(`${baseUrl + url}`);
  if (token) {
    const config = {
      method: 'delete',
      url: `${baseUrl + url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (err) {
      console.log(err);
      // alert(err.message);
      return err.response;
    }
  }
};

export const patchApiWithtoken = async (url, data) => {
  const token = await AsyncStorage.getItem('token');
  console.log(`${baseUrl + url}`, JSON.stringify(data));
  if (token) {
    const config = {
      method: 'patch',
      url: `${baseUrl + url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data ? data : {},
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (err) {
      console.log('err', err);
      return err.response;
    }
  }
};

export const postApisWithToken = async (url, data, showAlert = false) => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  if (token) {
    const config = {
      method: 'post',
      url: `${baseUrl + url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios(config);
      console.log(response);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      if (showAlert) {
        alert(err.response.data.error);
      }
      console.log('err.response', err.response);
      return err.response;
    }
  }
};

export const postApisFormDataWithToken = async (
  url,
  payload,
  showAlert = false,
) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    const config = {
      method: 'post',
      url: `${baseUrl + url}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    try {
      const response = await axios(config);
      return {
        success: true,
        data: response?.data,
      };
    } catch (err) {
      if (showAlert) {
        alert(err?.response?.data?.error);
      }
      return err.response;
    }
  }
};

export const putApisFormDataWithToken = async (
  url,
  payload,
  showAlert = false,
) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    const config = {
      method: 'put',
      url: `${baseUrl + url}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    try {
      const response = await axios(config);
      return {
        success: true,
        data: response?.data,
      };
    } catch (err) {
      if (__DEV__) {
        console.log(err);
      }

      if (showAlert) {
        alert(err?.response?.data?.error);
      }
      return err.response;
    }
  }
};

export const putApisWithToken = async (url, data, showAlert = false) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    const config = {
      method: 'put',
      url: `${baseUrl + url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data ? data : {},
    };
    // if (data) {
    //   config['data'] = data;
    // }

    try {
      const response = await axios(config);
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (err) {
      if (__DEV__) {
        console.log(err);
      }
      if (showAlert) {
        alert(err.response.data.error);
      }
      return err.response;
    }
  }
};

export const apiWithtoken = async (url, method = 'get', data = {}) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return;
  }

  try {
    const response = await axios({
      method,
      url: `${baseUrl + url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    // alert(err.response);
    return err.response;
  }
};
