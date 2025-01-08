/* eslint-disable prettier/prettier */
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {CustomText} from '../comman/customText';
import {styles} from '../helper/styles';
import {Fonts} from '../helper/theme';
import {Colors, Picker} from 'react-native-ui-lib';
import Down from '../../assets/images/Icons/Vector.svg';

import {Header} from '../comman/CommanHeader';
import {refillCard} from '../api/refillCard';
import {useDispatch, useSelector} from 'react-redux';
import {showStatus} from '../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {userDetail} from '../api/userDetail';
import {setUserDetail} from '../store/userReducer';
import {refreshToken} from '../api/refreshToken';
const PaywithVoucher = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const options = [
    {label: 'JavaScript', value: 'js'},
    {label: 'Java', value: 'java'},
    {label: 'Python', value: 'python'},
    {label: 'C++', value: 'c++', disabled: true},
    {label: 'Perl', value: 'perl'},
  ];
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const {user, languageString} = useSelector(state => state.user);

  const submit = async () => {
    if (code === '') {
      showStatus(
        toast,
        languageString.pleaseEnterRefillCode,
        'custom_error_toast',
      );
    } else {
      setLoading(true);
      const data = {
        code: code,
        customer_id: user.id,
      };
      const response = await refillCard(data);
      console.log(response);
      if (response.remote === 'success') {
        showStatus(
          toast,
          languageString.refillCardSuccessfully,
          'custom_success_toast',
        );
        getUserData();
      } else {
        showStatus(
          toast,
          languageString.pleaseCheckYourRefillCode,
          'custom_error_toast',
        );
        setLoading(false);
        navigation.navigate('Tabs');
      }
    }
  };

  const getUserData = async () => {
    const response = await userDetail();
    if (response.remote === 'success') {
      dispatch(setUserDetail(response.data));
    } else {
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getUserData();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    setLoading(false);
    navigation.navigate('Tabs');
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  return loading ? (
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
      <ActivityIndicator size={'large'} color={'#008183'} />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.redeemRefillCard}
        />
        <View style={{flex: 1, padding: 20}}>
          <View style={{width: '100%'}}>
            <CustomText style={styles.label}>
              {languageString.enterYourVoucherCode}{' '}
            </CustomText>
            <TextInput
              onChangeText={e => setCode(e)}
              placeholderTextColor={'#5f5f5f'}
              placeholder={languageString.typeHere}
              style={styles.inputBox}
            />
          </View>
        </View>
        <View style={{width: '100%', padding: 20}}>
          <TouchableOpacity onPress={submit} style={[styles.borderedButton]}>
            <CustomText
              style={[
                styles.borderedButtonText,
                {color: '#008183', fontSize: 16},
              ]}>
              {languageString.payNow}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaywithVoucher;
