import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, {useState} from 'react';
import {
  Image,
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
const AddCreditCard = ({navigation}) => {
  const options = [
    {label: 'JavaScript', value: 'js'},
    {label: 'Java', value: 'java'},
    {label: 'Python', value: 'python'},
    {label: 'C++', value: 'c++', disabled: true},
    {label: 'Perl', value: 'perl'},
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'Add Money'}
        />
        <View style={{flex: 1, padding: 20}}>
          <CustomText
            style={{color: '#000', fontSize: 18, fontFamily: Fonts.bold1}}>
            Choose your bank
          </CustomText>
          <View style={{width: '100%', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EnterAmount')}
              style={{alignItems: 'center', width: 80, height: 80}}>
              <Image
                style={{width: 80, height: 80}}
                source={require('../../assets/images/moamalat.jpeg')}
              />
              <CustomText
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontFamily: Fonts.regular1,
                }}>
                moamalat
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCreditCard;
