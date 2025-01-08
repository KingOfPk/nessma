import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  SectionList,
} from 'react-native';

import {styles} from '../../../helper/styles';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
import Check from '../../../../assets/images/Icons/check-circle.svg';
import {getAllTransaction} from '../../../api/getTrasication';
import {useSelector} from 'react-redux';
const Transaction = ({item}) => {
  const {language, languageString} = useSelector(state => state.user);
  return (
    <View
      style={[
        styles.shadow,
        {
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 10,
        },
      ]}>
      <View
        style={{
          width: '100%',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#008183',
          }}>
          <Check />
        </View>
        <View style={{flex: 1, marginLeft: 10, alignItems: 'flex-start'}}>
          <CustomText
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: 12,
              fontFamily: Fonts.bold1,
              lineHeight: 20,
              textAlign: 'left',
            }}>
            {item.description}
          </CustomText>
          <CustomText
            style={{
              color: '#9BA7B1',
              fontSize: 12,
              fontFamily: Fonts.regular1,
              lineHeight: 20,
              textAlign: language === 'ar' ? 'right' : 'left',
            }}>
            {item.date}
          </CustomText>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <CustomText
            style={{
              color: item.type === 'credit' ? '#008183' : '#A70057',
              fontSize: 14,
              fontFamily: Fonts.bold1,
            }}>
            {item.type === 'credit' ? '+' : '-'}
            {parseFloat(item.total).toFixed(2)} {languageString.LYD}
          </CustomText>
          <CustomText
            style={{
              color: '#9BA7B1',
              fontSize: 8,
              fontFamily: Fonts.regular1,
              marginTop: 2,
            }}>
            charge
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default Transaction;
