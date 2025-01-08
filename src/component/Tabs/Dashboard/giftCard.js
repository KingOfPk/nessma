import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import Credit from '../../../../assets/images/Icons/cradit-card.svg';
import Voucher from '../../../../assets/images/Icons/voucher.svg';
import {postApisWithoutToken} from '../../../api/adminApi';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {ADMINURL} from '../../../config/config';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
const GiftCard = ({navigation, route}) => {
  const {languageString, user} = useSelector(state => state.user);
  const gift = route.params.data;

  const responseGiftCard = async res => {
    const data = {
      giftcard_id: gift.id,
      customer_id: user.id,
      response: res,
    };

    const response = await postApisWithoutToken(
      '/send-giftcard-response',
      data,
    );
    if (response.success) {
      navigation.navigate('Tabs');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.giftCard}
        />
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: `${ADMINURL}giftcard_image/${gift?.giftcard_image}`,
            }}
            style={{width: '100%', height: 200}}
          />
          <View style={{width: '100%', padding: 20}}>
            <CustomText
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: Fonts.regular1,
                marginTop: 10,
              }}>
              {gift.description}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '50%', padding: 5}}>
            <TouchableOpacity
              onPress={() => responseGiftCard(1)}
              style={[styles.borderedButton, {backgroundColor: '#008183'}]}>
              <CustomText
                style={[
                  styles.borderedButtonText,
                  {color: '#fff', fontSize: 14},
                ]}>
                {languageString.interested}
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', padding: 5}}>
            <TouchableOpacity
              onPress={() => responseGiftCard(2)}
              style={styles.borderedButton}>
              <CustomText
                style={[
                  styles.borderedButtonText,
                  {color: '#008183', fontSize: 14},
                ]}>
                {languageString.remindMeLater}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GiftCard;
