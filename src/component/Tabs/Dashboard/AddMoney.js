import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import Credit from '../../../../assets/images/Icons/cradit-card.svg';
import Voucher from '../../../../assets/images/Icons/voucher.svg';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
const AddMoney = ({navigation}) => {
  const {languageString} = useSelector(state => state.user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.addMoney}
        />
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PaywithVoucher')}
            style={{
              width: '100%',
              padding: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#BDC7C9',
              borderBottomWidth: 1,
            }}>
            <Voucher />
            <View style={{flex: 1, marginLeft: 10}}>
              <CustomText
                style={{
                  color: '#373737',
                  fontSize: 14,
                  fontFamily: Fonts.regular1,
                  textAlign: 'left',
                }}>
                {languageString.vouchers}
              </CustomText>
            </View>
            <Image
              source={require('../../../../assets/images/Icons/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterAmount')}
            style={{
              width: '100%',
              padding: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#BDC7C9',
              borderBottomWidth: 1,
            }}>
            <Credit />
            <View style={{flex: 1, marginLeft: 10}}>
              <CustomText
                style={{
                  color: '#373737',
                  fontSize: 14,
                  fontFamily: Fonts.regular1,
                  textAlign: 'left',
                }}>
                {languageString.creditCard}
              </CustomText>
            </View>
            <Image
              source={require('../../../../assets/images/Icons/Vector.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMoney;
