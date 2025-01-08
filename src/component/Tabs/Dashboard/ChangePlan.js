/* eslint-disable prettier/prettier */
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
import {Colors, DateTimePicker, Picker} from 'react-native-ui-lib';
import Down from '../../../../assets/images/Icons/Vector.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getAllTarrifPlan} from '../../../api/getAllTerrifPlan';
import {getAllUserService} from '../../../api/getAlluserService';
import {useDispatch, useSelector} from 'react-redux';
import {refreshToken} from '../../../api/refreshToken';
import {changeTariffPlan} from '../../../api/changePlan';
import moment from 'moment';
import {showStatus} from '../../../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {ActivityIndicator} from 'react-native';
import {setCurrentUserService} from '../../../store/userReducer';
const ChangePlan = ({navigation, route}) => {
  const {currentService, balance, languageString, user} = useSelector(
    state => state.user,
  );
  const toast = useToast();
  const options = [
    {label: 'JavaScript', value: 'js'},
    {label: 'Java', value: 'java'},
    {label: 'Python', value: 'python'},
    {label: 'C++', value: 'c++', disabled: true},
    {label: 'Perl', value: 'perl'},
  ];
  const dispatch = useDispatch();
  const [tarrif, setTarrifs] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllservices();
  }, []);

  useEffect(() => {
    if (route.params?.service) {
      console.log(route.params?.service);
      setSelectedPlan({
        label: route.params.service.title,
        value: route.params.service.id,
        price: route.params.price
          ? route.params.price
          : route.params.service.price,
      });
    }
  }, [route]);

  const getAllservices = async () => {
    const response = await getAllTarrifPlan(currentService.tariff_id);
    if (response.remote === 'success') {
      const tarrif1 = response.data.map(item => {
        return {label: item.title, value: item.id, price: item.price};
      });
      console.log(tarrif1);
      setTarrifs(tarrif1);
    } else {
      setTarrifs([]);
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getAllservices();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(null);

  const submit = async () => {
    if (!selectedPlan) {
      showStatus(
        toast,
        languageString.pleaseSelectThePlanFirst,
        'custom_error_toast',
      );
    } else if (
      parseFloat(balance.replace(',', '')) < parseFloat(selectedPlan.price)
    ) {
      showStatus(
        toast,
        languageString.insufficientBalance,
        'custom_error_toast',
      );
    } else {
      setLoading(true);
      const data = {
        newTariffId: selectedPlan.value,
        targetDate: moment(date).format('YYYY-MM-DD'),
      };
      console.log(selectedPlan, data, currentService.id);
      const response = await changeTariffPlan(data, currentService.id);
      console.log(response);
      if (response.remote === 'success') {
        if (parseInt(selectedPlan.price) == 0) {
          getCurrentService();
        } else {
          navigation.navigate('Tabs');
        }
      } else {
        showStatus(
          toast,
          languageString.thisIsNotValidPlan,
          'custom_error_toast',
        );
      }
      setLoading(false);
    }
  };

  const getCurrentService = async () => {
    console.log(user.id);
    setLoading(true);
    const response = await getAllUserService(user.id);
    if (response.remote === 'success') {
      response.data.map(item => {
        if (item.status === 'active') {
          dispatch(setCurrentUserService(item));
        }
      });
      setLoading(false);
      navigation.navigate('Topup');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.changeTariff}
        />

        {loading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#008183'} />
          </View>
        )}

        <View style={{flex: 1, padding: 20}}>
          <KeyboardAwareScrollView>
            <View style={{width: '100%'}}>
              <CustomText style={styles.label}>
                {languageString.newPlanStartDate}
              </CustomText>
              {/* <TextInput
                placeholderTextColor={'#5f5f5f'}
                placeholder="2023-01-16"
                style={styles.inputBox}
              /> */}
              <DateTimePicker
                migrateTextField
                containerStyle={[styles.inputBox]}
                mode={'date'}
                value={date}
                placeholderTextColor="#5f5f5f"
                placeholder={'Select a date'}
                dateFormat={'DD-MM-YYYY'}
                onChange={date => setDate(moment(date).format('YYYY-MM-DD'))}
                // value={new Date('October 13, 2014')}
              />
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.newPlan}
              </CustomText>
              <View style={{width: '100%'}}>
                <Picker
                  placeholder={languageString.selectPlan}
                  floatingPlaceholder={false}
                  containerStyle={{height: 50}}
                  hideUnderline
                  value={selectedPlan}
                  enableModalBlur={false}
                  onChange={item => setSelectedPlan(item)}
                  topBarProps={{title: languageString.searchPlan}}
                  style={styles.inputBox}
                  // showSearch
                  // searchPlaceholder={'Search a Type of Design'}
                  searchStyle={{
                    color: Colors.blue30,
                    placeholderTextColor: Colors.grey50,
                  }}
                  // onSearchChange={value => console.warn('value', value)}
                >
                  {tarrif.map(option => (
                    <Picker.Item key={option.value} value={option} />
                  ))}
                </Picker>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    top: 30,
                    position: 'absolute',
                    right: 10,
                  }}>
                  <Down />
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.price}
              </CustomText>
              <TextInput
                placeholderTextColor={'#5f5f5f'}
                placeholder={`${selectedPlan?.price || 0}`}
                editable={false}
                style={styles.inputBox}
              />
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 18,
                  fontFamily: Fonts.bold1,
                }}>
                {languageString.processInfo}
              </CustomText>

              <View style={{width: '100%', marginTop: 20}}>
                <CustomText style={styles.label}>
                  {languageString.balanceBefore}
                </CustomText>
                <TextInput
                  placeholderTextColor={'#5f5f5f'}
                  placeholder={`${balance}`}
                  editable={false}
                  style={styles.inputBox}
                />
              </View>
              <View style={{width: '100%', marginTop: 20}}>
                <CustomText style={styles.label}>
                  {languageString.balanceAfter}
                </CustomText>
                {/* <TextInput
                  placeholderTextColor={'#5f5f5f'}
                  editable={false}
                  placeholder={
                    selectedPlan
                      ? `${parseFloat(balance) - selectedPlan?.price}`
                      : '0.00'
                  }
                  style={styles.inputBox}
                /> */}
                <View style={styles.inputBox}>
                  <CustomText
                    style={{color: '#0E1618', fontFamily: Fonts.regular1}}>
                    {parseFloat(balance.replace(',', '')) -
                      parseFloat(selectedPlan?.price)}
                  </CustomText>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={{width: '100%', padding: 20}}>
          <TouchableOpacity onPress={submit} style={styles.borderedButton}>
            <CustomText
              style={[
                styles.borderedButtonText,
                {
                  color: '#008183',
                  fontSize: 16,
                },
              ]}>
              {languageString.submit}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePlan;
