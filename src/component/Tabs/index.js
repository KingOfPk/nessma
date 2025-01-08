import React, {useEffect} from 'react';
import {View, Text, Dimensions, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../../../assets/images/Icons/main.svg';
import Service from '../../../assets/images/Icons/service.svg';
import Statics from '../../../assets/images/Icons/statics.svg';
import Account from '../../../assets/images/Icons/account.svg';
import Profile from '../../../assets/images/Icons/profile.svg';
import More from '../../../assets/images/Icons/more.svg';
import messaging from '@react-native-firebase/messaging';

import {Fonts} from '../../helper/theme';
import DashbaordTab from './Dashboard';
import ServiceTab from './Service';
import StaticsTab from './Statics';
import AccountTab from './Account';
import ProfileTab from './Profile';
import {useSelector} from 'react-redux';
import {showStatus} from '../../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  const {languageString} = useSelector(state => state.user);
  const toast = useToast();
  useEffect(() => {
    //
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      showStatus(toast, remoteMessage.notification.body, 'custom_error_toast');
    });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // screenOptions={{headerShown: false}}

      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        tintColor: '#333',
        activeTintColor: '#aaa',
      }}
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 75 : 65,
          // height: height / 12,
          alignItems: 'center',
          width: '100%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          backgroundColor: '#fff',
          padding: 10,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let bgColor;
          if (route.name === languageString.main) {
            iconName = (
              <Main
                style={{color: focused ? '#A70057' : '#6F767E'}}
                height={focused ? 30 : 20}
                width={focused ? 30 : 20}
              />
            );
            bgColor = focused ? '#A70057' : '';
          } else if (route.name === languageString.plans) {
            iconName = (
              <Service
                style={{color: focused ? '#A70057' : '#6F767E'}}
                height={focused ? 30 : 20}
                width={focused ? 30 : 20}
              />
            );
            bgColor = focused ? '#A70057' : '';
          } else if (route.name === languageString.statistics) {
            iconName = (
              <Statics
                style={{color: focused ? '#A70057' : '#6F767E'}}
                height={focused ? 30 : 20}
                width={focused ? 30 : 20}
              />
            );
            bgColor = focused ? '#A70057' : '';
          } else if (route.name === languageString.account) {
            iconName = (
              <Account
                style={{color: focused ? '#A70057' : '#6F767E'}}
                height={focused ? 30 : 20}
                width={focused ? 30 : 20}
              />
            );
            bgColor = focused ? '#A70057' : '';
          } else {
            iconName = (
              <More
                style={{color: focused ? '#A70057' : '#6F767E'}}
                height={focused ? 30 : 20}
                width={focused ? 30 : 20}
              />
            );
            bgColor = focused ? '#A70057' : '';
          }
          return (
            <View
              style={{
                alignItems: 'center',
                borderRadius: 22,
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 15,
                paddingTop: 10,
                width: 120,
              }}>
              {iconName}
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Fonts.regular1,
                  fontSize: focused ? 16 : 14,
                  color,
                }}>
                {route.name}
              </Text>
            </View>
          );
        },

        tabBarActiveTintColor: '#A70057',
        tabBarInactiveTintColor: '#A7A7A7',
      })}>
      <Tab.Screen name={languageString.main} component={DashbaordTab} />
      <Tab.Screen name={languageString.plans} component={ServiceTab} />
      <Tab.Screen name={languageString.statistics} component={StaticsTab} />
      <Tab.Screen name={languageString.account} component={AccountTab} />
      <Tab.Screen name={languageString.more} component={ProfileTab} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
