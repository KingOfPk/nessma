import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
import {Dropdown} from 'react-native-element-dropdown';
const ChangePlan = ({navigation, route}) => {
  const {currentService, balance, languageString, user, AllCapedData} =
    useSelector(state => state.user);
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
  const [planType, setPlanType] = useState(route.params?.plan);
  const [isVisibleTime, setIsVisibleTime] = useState(false);
  useEffect(() => {
    getAllservices();
  }, []);

  useEffect(() => {
    if (route.params?.service) {
      console.log(route.params?.service, 'service');
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
        return {
          label: item.title,
          value: item.id,
          price:
            item.price === '0.0000'
              ? itemDetail(parseInt(item.id)).price
              : item.price,
          plan: item.price === '0.0000' ? 'limited' : 'unlimited',
        };
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

  const itemDetail = id => {
    // console.log(AllCapedData);
    const detail = AllCapedData.find(item => item.tariff_id === id);

    return detail;
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
      console.log(response, 'response123');
      if (response.remote === 'success') {
        if (planType === 'limited') {
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
    console.log(response, 'response23');
    if (response.remote === 'success') {
      response.data.map(item => {
        if (item.status === 'active') {
          dispatch(setCurrentUserService(item));
          navigation.navigate('Topup');
        }
      });
      setLoading(false);
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
              <TouchableOpacity
                onPress={() => setIsVisibleTime(true)}
                style={styles.inputBox}>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: '#161B1D',
                    fontFamily: Fonts.regular1,
                  }}>
                  {moment(date).format('YYYY-MM-DD')}
                </CustomText>
              </TouchableOpacity>
              <DateTimePickerModal
                minuteInterval={30}
                isVisible={isVisibleTime}
                mode="date"
                onConfirm={date => {
                  setDate(date);
                  setIsVisibleTime(false);
                }}
                date={new Date()}
                onCancel={() => setIsVisibleTime(false)}
                // display="spinner"
              />
              {/* <TextInput
                placeholderTextColor={'#5f5f5f'}
                placeholder="2023-01-16"
                style={styles.inputBox}
              /> */}
              {/* <CalendarPicker onDateChange={(date)=> console.log(date) } /> */}
              {/* <DateTimePicker
                migrateTextField
                containerStyle={[styles.inputBox]}
                mode={'date'}
                value={date}
                placeholderTextColor="#5f5f5f"
                placeholder={'Select a date'}
                dateFormat={'DD-MM-YYYY'}
                onChange={date => setDate(moment(date).format('YYYY-MM-DD'))}
                // value={new Date('October 13, 2014')}
              /> */}
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.newPlan}
              </CustomText>
              <View style={{width: '100%'}}>
                <Dropdown
                  style={[styles.inputBox]}
                  placeholderStyle={{
                    color: '#5F6368',
                    fontSize: 14,
                    fontFamily: Fonts.regular1,
                  }}
                  selectedTextStyle={{
                    color: '#5F6368',
                    fontSize: 14,
                    fontFamily: Fonts.regular1,
                  }}
                  inputSearchStyle={styles.inputSearchStyle}
                  activeColor={'#F0F0F0'}
                  iconStyle={{color: '#5F6368'}}
                  search={0}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  data={tarrif}
                  // enableSearch
                  value={selectedPlan}
                  onChange={item => {
                    setSelectedPlan(item);
                    setPlanType(item.plan);
                  }}
                  underlineColor={'transparent'}
                />
                {/* <Picker
                  placeholder={
                    selectedPlan
                      ? selectedPlan?.label
                      : languageString.selectPlan
                  }
                  floatingPlaceholder={false}
                  containerStyle={{height: 50}}
                  hideUnderline
                  value={selectedPlan?.value}
                  enableModalBlur={false}
                  onChange={item => {
                    console.log(item, 'item');
                    setSelectedPlan(item);
                    setPlanType(item.plan);
                  }}
                  topBarProps={{title: languageString.searchPlan}}
                  style={styles.inputBox}
                  searchStyle={{
                    color: Colors.blue30,
                    placeholderTextColor: Colors.grey50,
                  }}
                >
                  {tarrif.map(option => (
                    <Picker.Item key={option.value} value={option} />
                  ))}
                </Picker> */}
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
