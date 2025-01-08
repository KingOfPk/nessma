import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import NotificationIcon from '../../assets/images/Icons/notificationIcon.svg';
import LOGO from '../../assets/images/Logo2.svg';
import notifee from '@notifee/react-native';
const HomeHeader = () => {
  const navigation = useNavigation();
  useEffect(() => {
    notifee
      .getBadgeCount()
      .then(count => console.log('Current badge count: ', count));
  }, []);
  return (
    <View
      style={{
        width: '100%',
        padding: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <LOGO height={32} width={125} />
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
