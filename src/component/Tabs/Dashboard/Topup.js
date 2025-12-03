import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
import Down from '../../../../assets/images/Icons/Vector.svg';
import {getCapedDataById} from '../../../api/getCapDatabyId';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {showStatus} from '../../../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {updateTopUpPlan} from '../../../api/updateTopUp';
import {ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
const Topup = ({navigation}) => {
  const {currentService, AllCapedData, balance, languageString, user} =
    useSelector(state => state.user);
  const toast = useToast();
  const [date, setDate] = useState(moment());
  const options = [
    {label: 'JavaScript', value: 'js'},
    {label: 'Java', value: 'java'},
    {label: 'Python', value: 'python'},
    {label: 'C++', value: 'c++', disabled: true},
    {label: 'Perl', value: 'perl'},
  ];

  const [topUpPlans, setTopUpPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const options2 = [
    {label: 'GB', value: 'gb'},
    {label: 'MB', value: 'mb'},
    {label: 'KB', value: 'kb'},
    {label: 'Byte', value: 'byte', disabled: true},
    {label: 'Bit', value: 'bit'},
  ];

  useEffect(() => {
    gteCapedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentService]);

  const gteCapedData = async () => {
    setLoading(true);
    const response = await getCapedDataById(currentService.tariff_id);
    console.log(response, currentService);
    if (response.remote === 'success') {
      if (response.data.length === 1) {
        setSelectedPlan({
          label: `${response.data[0].title}, LYD${response.data[0].price}`,
          value: response.data[0].id,
          data: response.data[0],
        });
      }
      const caped = response.data.map(item => {
        if (item.id === currentService.top_up_tariff_id) {
          setSelectedPlan({
            label: `${item.title}, LYD${item.price}`,
            value: item.id,
            data: item,
          });
        }
        return {
          label: `${item.title}, LYD${item.price}`,
          value: item.id,
          data: item,
        };
      });
      setTopUpPlans(caped);
    }
    setLoading(false);
  };

  const applyTopUp = async () => {
    if (selectedPlan) {
      console.log(
        parseFloat(balance.replace(',', '')),
        parseFloat(selectedPlan.data.price),
      );
      if (
        parseFloat(balance.replace(',', '')) >=
        parseFloat(selectedPlan.data.price)
      ) {
        setLoading(true);
        const data = {
          service_id: currentService.id,
          quantity: selectedPlan.data.amount * 10000000,
          tariff_id: selectedPlan.data.id,
          valid_till: moment(date)
            .add(parseInt(selectedPlan.data.validity), 'month')
            .format('YYYY-MM-DD HH:mm:SS'),
          price: selectedPlan.data.price,
        };
        const response = await updateTopUpPlan(data);
        console.log('response', response, data);
        if (response.remote === 'success') {
          navigation.navigate('Tabs');
        } else {
          showStatus(
            toast,
            languageString.somethingWentWrong,
            'custom_error_toast',
          );
        }
        console.log(data);
        setLoading(false);
      } else {
        showStatus(
          toast,
          languageString.insufficientBalance,
          'custom_error_toast',
        );
      }
    } else {
      showStatus(
        toast,
        languageString.pleaseSelectThePlanFirst,
        'custom_error_toast',
      );
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSwitch, setSwitch] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.topUp}
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
                {languageString.service}
              </CustomText>
              <TextInput
                placeholderTextColor={'#5f5f5f'}
                placeholder={languageString.typeHere}
                style={styles.inputBox}
                value={currentService.description}
                editable={false}
              />
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.topUpPlan}
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
                  data={topUpPlans}
                  // enableSearch
                  value={selectedPlan}
                  onChange={item => {
                    setSelectedPlan(item);
                  }}
                  underlineColor={'transparent'}
                />
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.price}
              </CustomText>
              <TextInput
                placeholderTextColor={'#5f5f5f'}
                placeholder={languageString.typeHere}
                style={styles.inputBox}
                value={selectedPlan?.data?.price}
                editable={false}
              />
            </View>
            {/* <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>Valid Till</CustomText>
              <DateTimePicker
                migrateTextField
                containerStyle={[styles.inputBox]}
                mode={'date'}
                placeholderTextColor="#5f5f5f"
                placeholder={'Select a date'}
                dateFormat={'DD-MM-YYYY'}
                onChange={date => setDate(moment(date).format('YYYY-MM-DD'))}
                // value={new Date('October 13, 2014')}
              />
            </View> */}
            {/* <View style={{width: '100%', marginTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => setRecenter(!recenter)}>
                  <CustomText style={styles.label}>
                    Transaction to invoice
                  </CustomText>
                </TouchableOpacity>
                <View style={{marginLeft: 10}}>
                  <Switch
                    value={isSwitch}
                    onColor="#008183"
                    onValueChange={e => {
                      setSwitch(e);
                    }}
                  />
                </View>
              </View>
            </View> */}
          </KeyboardAwareScrollView>
        </View>
        <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={applyTopUp}
            style={[styles.borderedButton]}>
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

export default Topup;
