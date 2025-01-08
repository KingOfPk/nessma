import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  I18nManager,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Checkbox, DateTimePicker} from 'react-native-ui-lib';
import {CustomText} from '../comman/customText';
import {Fonts} from '../helper/theme';
import LOGO from '../../assets/images/Logo2.svg';
import {styles} from '../helper/styles';
import SMS from '../../assets/images/Icons/sms.svg';
import Lock from '../../assets/images/Icons/key.svg';
import Eye from '../../assets/images/Icons/eye.svg';
import EyeSlash from '../../assets/images/Icons/eye-slash.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useToast} from 'react-native-toast-notifications';
import {showStatus} from '../utils/showToast';
import {login} from '../api/login';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setAppLanguage,
  setLanguageString,
  setShowedModal,
} from '../store/userReducer';
import {getApiWithouttoken} from '../api/adminApi';
import RNRestart from 'react-native-restart';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';

const {width, height} = Dimensions.get('window');
const LoginScreen = ({navigation}) => {
  const toast = useToast();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const buttons = ['English', 'Arabic'];
  const {languageString, language} = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (user === '') {
      showStatus(
        toast,
        languageString.pleaseEnterYourUserId,
        'custom_error_toast',
      );
    } else if (password === '') {
      showStatus(
        toast,
        languageString.pleaseEnterYourPassword,
        'custom_error_toast',
      );
    } else {
      setLoading(true);
      const data = {
        auth_type: 'customer',
        login: user,
        password: password,
      };
      const response = await login(data);
      console.log(response);
      if (response.remote === 'success') {
        dispatch(setShowedModal(true));
        navigation.dispatch(StackActions.replace('Tabs'));
      } else {
        showStatus(toast, response.errors.errors, 'custom_error_toast');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('hello');
      // scrollRef.current.scrollTo({
      //   x: 0,
      //   y: 150,
      //   animated: true,
      // });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // scrollRef.current.scrollTo({
      //   x: 0,
      //   y: 0,
      //   animated: true,
      // });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    SetLanguage();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    }
  };

  const SetLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    const response = await getApiWithouttoken(`/get-language?language=${lang}`);
    if (response.success) {
      dispatch(setLanguageString(response.data.data.values));
      dispatch(setAppLanguage(lang));
    }
  };

  const changeRtl = () => {
    I18nManager.forceRTL(true);
    RNRestart.Restart();
  };

  const updateIndex = async lang => {
    setLoading(true);
    AsyncStorage.setItem('language', lang);
    try {
      const response = await getApiWithouttoken(
        `/get-language?language=${lang}`,
      );
      if (response.success) {
        dispatch(setLanguageString(response.data.data.values));
        dispatch(setAppLanguage(lang));
        if (lang === 'en') {
          I18nManager.forceRTL(false);
        } else {
          I18nManager.forceRTL(true);
        }
        setLoading(false);
        RNRestart.Restart();
      } else {
        showStatus(
          toast,
          languageString.pleaseCheckYourNetwork,
          'custom_error_toast',
        );
      }
    } catch (error) {
      showStatus(
        toast,
        languageString.pleaseCheckYourNetwork,
        'custom_error_toast',
      );
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
            position: 'absolute',
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#008183" size={'large'} />
        </View>
      )}
      <View style={{flex: 1, padding: 20}}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
            <View
              style={{
                width: '100%',
              }}>
              <View style={{width: '100%', alignItems: 'flex-end'}}>
                <View style={{width: 150}}>
                  <ButtonGroup
                    onPress={value => {
                      const lang = value === 0 ? 'en' : 'ar';
                      if (lang !== language) {
                        updateIndex(lang);
                      }
                    }}
                    selectedIndex={language == 'ar' ? 1 : 0}
                    buttons={buttons}
                    buttonStyle={{color: '#f00'}}
                    innerBorderStyle={{color: '#ccc', width: 0}}
                    textStyle={{
                      fontSize: 11,
                      color: '#000',
                      fontFamily: Fonts.bold1,
                    }}
                    selectedButtonStyle={{
                      color: '#f00',
                      backgroundColor: '#008183',
                      borderRadius: 20,
                    }}
                    containerStyle={{
                      height: 35,
                      color: '#f00',
                      borderRadius: 20,
                    }}
                  />
                </View>
              </View>
              <View
                style={{width: '100%', marginTop: 15, alignItems: 'center'}}>
                <LOGO />
              </View>
              <View style={{width: '100%', marginTop: 20}}>
                <CustomText
                  style={{
                    color: '#161B1D',
                    fontSize: 24,
                    fontFamily: Fonts.bold1,
                    lineHeight: 29,
                  }}>
                  {languageString.welcome}
                </CustomText>
                {/* <CustomText
                  style={{
                    color: '#161B1D',
                    fontSize: 16,
                    fontFamily: Fonts.regular1,
                    lineHeight: 19,
                    marginTop: 5,
                  }}>
                  Enter your code and password for login
                </CustomText> */}
              </View>
            </View>

            <View
              style={{
                width: '100%',
                marginTop: 10,
              }}>
              <View
                style={[
                  styles.inputBox,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <SMS />
                <TextInput
                  placeholderTextColor={'#5F5F5F'}
                  placeholder={languageString.enterYourUserId}
                  onChangeText={e => setUser(e)}
                  style={{
                    flex: 1,
                    height: '100%',
                    marginLeft: 10,
                    color: '#0E1618',
                    textAlign: language === 'ar' ? 'right' : 'left',
                  }}
                />
              </View>
              <View
                style={[
                  styles.inputBox,
                  {flexDirection: 'row', alignItems: 'center', marginTop: 30},
                ]}>
                <Lock />
                <TextInput
                  placeholder={languageString.enterYourPassword}
                  placeholderTextColor={'#5F5F5F'}
                  secureTextEntry={!showPassword}
                  onChangeText={e => setPassword(e)}
                  style={{
                    flex: 1,
                    height: '100%',
                    marginLeft: 10,
                    color: '#0E1618',
                    textAlign: language === 'ar' ? 'right' : 'left',
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  marginTop: 20,
                }}>
                <CustomText
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={{
                    color: '#008183',
                    fontSize: 16,
                    fontFamily: Fonts.regular1,
                    textAlign: 'right',
                  }}>
                  {languageString.forgotPassword}
                </CustomText>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => loginUser()}
                style={styles.borderedButton}>
                <CustomText
                  style={[
                    styles.borderedButtonText,
                    {color: '#008183', fontSize: 16},
                  ]}>
                  {languageString.login}
                </CustomText>
              </TouchableOpacity>
              <View
                style={{width: '100%', marginTop: 20, alignItems: 'center'}}>
                <CustomText
                  style={{
                    color: '#5F5F5F',
                    fontSize: 16,
                    fontFamily: Fonts.regular1,
                  }}>
                  {languageString.notAMemberYet}?
                  <CustomText
                    onPress={() => navigation.navigate('RegistrationScreen')}
                    style={{color: '#008183', fontFamily: Fonts.bold1}}>
                    {' '}
                    {languageString.signUp}
                  </CustomText>
                </CustomText>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
