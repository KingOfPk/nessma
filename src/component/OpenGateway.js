import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../comman/CommanHeader';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {BaseURL2} from '../config/config';
import axios from 'axios';
import moment from 'moment';
import {showStatus} from '../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {userDetail} from '../api/userDetail';
import {setUserDetail} from '../store/userReducer';
import {refreshToken} from '../api/refreshToken';
const OpengateWay = ({navigation, route}) => {
  const {language, user, languageString} = useSelector(state => state.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [isloading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const handleResponse = data => {
    console.log(data);
    setLoading(data.loading);
    if (data.url.includes('https://portal.nessmanet.com')) {
      showStatus(
        toast,
        languageString.yourPaymentSuccess,
        'custom_error_toast',
      );
      getUserData();
    }
  };

  useEffect(() => {
    console.log(user);
    addPayment();
  }, []);

  const addPayment = async () => {
    if (!user.phone || user.phone === '') {
      showStatus(
        toast,
        languageString.pleaseUpdateYourPhoneNumber,
        'custom_error_toast',
      );
    } else if (!user.email || user.email === '') {
      showStatus(
        toast,
        languageString.pleaseUpdateYourEmail,
        'custom_error_toast',
      );
    } else {
      const data = {
        id: 'lKw0NXjxk8Gd6V7vnJwD4laRbOmNMy9XERZo2j0LAXxrKYzgeEB5QqPp1rDBRkg2',
        amount: route.params.amount,
        phone: user.phone,
        email: user.email,
        backend_url: 'https://portal.nessmanet.com/api/success-transaction',
        frontend_url: 'https://portal.nessmanet.com/admin/login',
        custom_ref: `${user.id}-${moment().format('YYYYMMDDHHmm')}`,
      };
      console.log(data);
      const config = {
        method: 'post',
        url: `https://wla3xiw497.execute-api.eu-central-1.amazonaws.com/payment/initiate`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer VTzpinRsMbzv1MuYitCVWLLiCO3LwAC3mb9xC7Tx`,
        },
        data: JSON.stringify(data),
      };
      try {
        const response = await axios(config);
        if (response.status === 200) {
          const paymentData = response.data;
          console.log(paymentData);
          setPaymentUrl(paymentData.url);
        } else {
          showStatus(toast, 'Something went wrong', 'custom_error_toast');
        }
      } catch (err) {
        console.log('err.response', err.response.data.message);
        showStatus(toast, err.response.data.message, 'custom_error_toast');
        setLoading(false);
        navigation.goBack();
        return err.response;
      }
    }
  };

  const getUserData = async () => {
    const response = await userDetail();
    if (response.remote === 'success') {
      dispatch(setUserDetail(response.data));
    } else {
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getUserData();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'Add Money'}
        />
        {isloading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              zIndex: 1,
            }}>
            <ActivityIndicator size={'large'} color="#A70057" />
          </View>
        )}
        <View style={{flex: 1}}>
          <WebView
            onNavigationStateChange={data => handleResponse(data)}
            source={{
              uri: paymentUrl,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OpengateWay;
