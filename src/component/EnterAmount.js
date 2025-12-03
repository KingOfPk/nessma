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
import Down from '../../assets/images/Icons/Vector.svg';

import {Header} from '../comman/CommanHeader';
import {refillCard} from '../api/refillCard';
import {useSelector} from 'react-redux';
import {showStatus} from '../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
const EnterAmount = ({navigation}) => {
  const toast = useToast();
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
    setLoading(true);
    if (code === '') {
      showStatus(
        toast,
        languageString.pleaseEnterRefillCode,
        'custom_error_toast',
      );
    } else {
      navigation.navigate('OpengateWay', {amount: code});
    }
    setLoading(false);
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'Enter Amount'}
        />
        {loading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,.5)',
              zIndex: 1,
            }}>
            <ActivityIndicator color={'#008183'} size={'large'} />
          </View>
        )}
        <View style={{flex: 1}}>
          <View style={{flex: 1, padding: 20}}>
            <View style={{width: '100%'}}>
              <CustomText style={styles.label}>
                {languageString.enterYourAmount}
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
      </View>
    </SafeAreaView>
  );
};

export default EnterAmount;
