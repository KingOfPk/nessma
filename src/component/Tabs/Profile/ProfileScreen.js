import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import User from '../../../../assets/images/Icons/user-info.svg';
import Support from '../../../../assets/images/Icons/support.svg';
import FAQ from '../../../../assets/images/Icons/faq.svg';
import Feedback from '../../../../assets/images/Icons/feedback.svg';
import Privacy from '../../../../assets/images/Icons/privacy.svg';
import About from '../../../../assets/images/Icons/about.svg';
import Delete from '../../../../assets/images/Icons/deleteAccount.svg';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
import {styles} from '../../../helper/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const ProfileScreen = ({navigation}) => {
  const {languageString, language} = useSelector(state => state.user);
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header screenName={languageString.more} />
        <View style={{flex: 1, padding: 15}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{width: '100%', padding: 5}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserInfo')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                  },
                ]}>
                <User />
                <View style={{flex: 1, marginLeft: 20}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.userInfo}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <Support />
                <View style={{flex: 1, marginLeft: 20}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.support}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('FAQ')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <FAQ />
                <View style={{flex: 1, marginLeft: 20}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.faq}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Feedback')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <Feedback />
                <View style={{flex: 1, marginLeft: 20}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.feedback}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <Privacy />
                <View style={{flex: 1, marginLeft: 20}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.privacyPolicy}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('AboutUs')}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <About />
                <View
                  style={{flex: 1, marginLeft: 20, alignItems: 'flex-start'}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.aboutNessma}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => logout()}
                style={[
                  styles.shadow,
                  {
                    width: '100%',
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 15,
                  },
                ]}>
                <Delete />
                <View
                  style={{flex: 1, marginLeft: 20, alignItems: 'flex-start'}}>
                  <CustomText
                    style={{
                      color: '#161616',
                      fontSize: 16,
                      fontFamily: Fonts.regular1,
                      textAlign: 'left',
                    }}>
                    {languageString.deleteAccount}
                  </CustomText>
                </View>
                <Image
                  source={require('../../../../assets/images/Icons/Vector.png')}
                  style={{
                    transform: [
                      {rotate: language === 'ar' ? '180deg' : '0deg'},
                    ],
                  }}
                />
              </TouchableOpacity>
              <View style={{width: '100%', marginTop: 15}}>
                <TouchableOpacity
                  onPress={() => logout()}
                  style={[
                    styles.borderedButton,
                    {backgroundColor: '#E1EEEA', borderWidth: 0},
                  ]}>
                  <CustomText
                    style={[
                      styles.borderedButtonText,
                      {color: '#008183', fontSize: 16},
                    ]}>
                    {languageString.logout}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
