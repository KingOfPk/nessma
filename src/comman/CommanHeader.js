import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Fonts} from '../helper/theme';
import {CustomText} from './customText';
import NotificationIcon from '../../assets/images/Icons/notificationIcon.svg';
import Back from '../../assets/images/Icons/Back.svg';
import {useNavigation} from '@react-navigation/native';
export const Header = ({screenName, pressBackButton}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {pressBackButton && (
          <TouchableOpacity onPress={pressBackButton}>
            <Back />
          </TouchableOpacity>
        )}
        <CustomText
          style={{
            color: '#000',
            fontSize: 18,
            fontFamily: Fonts.bold1,
            marginLeft: pressBackButton ? 10 : 0,
          }}>
          {screenName}
        </CustomText>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
};
