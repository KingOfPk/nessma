import React, {useEffect} from 'react';
import {I18nManager, Image, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshToken} from '../api/refreshToken';
import Logo from '../../assets/images/Logo.svg';
import {getApiWithouttoken} from '../api/adminApi';
import {setAppLanguage, setLanguageString} from '../store/userReducer';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 1000);
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await refreshToken();
      console.log(response);
      if (response.remote === 'success') {
        navigation.replace('Tabs');
      } else {
        navigation.replace('LoginScreen');
      }
    } else {
      navigation.replace('LoginScreen');
    }
  };

  useEffect(() => {
    // SetLanguage();
  }, []);

  const SetLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
      const appVersion = await AsyncStorage.getItem('appVersion');
      const response = await getApiWithouttoken(
        `/get-language?language=${lang || 'ar'}&version=${appVersion}`,
      );
      if (response.success) {
        dispatch(setLanguageString(response.data.data.values));
        dispatch(setAppLanguage(lang));
      }
    } else {
      await AsyncStorage.setItem('language', 'ar');
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  };

  // useEffect(() => {
  //   const subscribe = navigation.addListener('focus', () => {
  //     navigation.dispatch(StackActions.replace('LoginScreen'));
  //   });
  //   return subscribe;
  // }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#A70057',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Image source={require('../../assets/images/Logo.png')} /> */}
      <Logo width={250} height={80} />
    </View>
  );
};
export default SplashScreen;
