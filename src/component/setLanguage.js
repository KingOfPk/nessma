/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../comman/CommanHeader';
import {WebView} from 'react-native-webview';
import {CustomText} from '../comman/customText';
import {Fonts} from '../helper/theme';
import Search from '../../assets/images/Icons/Search.svg';
import Setting from '../../assets/images/Icons/setting.svg';
import English from '../../assets/images/Icons/England.svg';
import Arab from '../../assets/images/Icons/arab.svg';
import Checkbox from '../../assets/images/Icons/Checkbox.svg';
import Bg from '../../assets/images/Icons/Bg.svg';
import {useDispatch, useSelector} from 'react-redux';
import {setAppLanguage, setLanguageString} from '../store/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApiWithouttoken} from '../api/adminApi';
const SetLanguage = ({navigation}) => {
  const {language, languageString} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const setArabicLanguage = async () => {
    setLoading(true);
    AsyncStorage.setItem('language', 'ar');
    const response = await getApiWithouttoken('/get-language?language=ar&version=1');
    if (response.success) {
      dispatch(setLanguageString(response.data.data.values));
    }
    dispatch(setAppLanguage('ar'));
    setLoading(false);
  };

  const setEnglishLanguage = async () => {
    setLoading(true);
    AsyncStorage.setItem('language', 'en');
    const response = await getApiWithouttoken('/get-language?language=en&version=1');
    if (response.success) {
      dispatch(setLanguageString(response.data.data.values));
    }
    dispatch(setAppLanguage('en'));
    setLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.language}
        />
        {isLoading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color="#A70057" />
          </View>
        )}
        <View style={{flex: 1, padding: 20}}>
          <CustomText
            style={{
              color: '#161B1D',
              fontSize: 18,
              fontFamily: Fonts.bold1,
              textAlign: 'center',
            }}>
            {languageString.selectLanguage}
          </CustomText>

          <View
            style={{
              width: '100%',
              marginTop: 20,
              flexDirection: 'row',
              height: 48,
              backgroundColor: '#F3F4F7',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Search />
            <TextInput
              placeholder={languageString.searchLanguage}
              placeholderTextColor={'#97999B'}
              style={{
                flex: 1,
                fontFamily: Fonts.regular1,
                height: 48,
                color: '#161B1D',
                marginLeft: 10,
              }}
            />
            <Setting />
          </View>
          <TouchableOpacity
            onPress={() => setEnglishLanguage()}
            style={{
              width: '100%',
              marginTop: 30,
              flexDirection: 'row',
              height: 48,
              backgroundColor: '#F3F4F7',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <English />
            <View style={{flex: 1, marginLeft: 10}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                English
              </CustomText>
            </View>
            {language === 'en' ? <Checkbox /> : <Bg />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArabicLanguage();
            }}
            style={{
              width: '100%',
              marginTop: 20,
              flexDirection: 'row',
              height: 48,
              backgroundColor: '#F3F4F7',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Arab />
            <View style={{flex: 1, marginLeft: 10}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                عربي
              </CustomText>
            </View>
            {language === 'ar' ? <Checkbox /> : <Bg />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetLanguage;
