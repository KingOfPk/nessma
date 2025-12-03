import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomText} from '../comman/customText';
import {Fonts} from '../helper/theme';
import LOGO from '../../assets/images/Logo2.svg';
import {styles} from '../helper/styles';
import SMS from '../../assets/images/Icons/sms.svg';
import Lock from '../../assets/images/Icons/key.svg';
import Eye from '../../assets/images/Icons/eye.svg';
import EyeSlash from '../../assets/images/Icons/eye-slash.svg';
import Back from '../../assets/images/Icons/Back.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {showStatus} from '../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {sub} from 'react-native-reanimated';
import {postApisWithoutToken} from '../api/adminApi';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const ForgotPassword = ({navigation}) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setOpen] = useState(false);
  const {languageString} = useSelector(state => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [location, setLocation] = useState('Search Location');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (userName === '') {
      showStatus(
        toast,
        languageString.pleaseEnterYourUsername,
        'custom_error_toast',
      );
    } else if (phoneNumber === '') {
      showStatus(
        toast,
        languageString.pleaseEnterYourPhoneNumber,
        'custom_error_toast',
      );
    } else {
      setLoading(true);
      const data = {
        fullName: userName,
        phone: phoneNumber,
        location: location,
      };
      const response = await postApisWithoutToken('/reset-password', data);
      console.log(JSON.stringify(response));
      if (response.success) {
        setOpen(true);
      }
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <ActivityIndicator size={'large'} color="#A70057" />
        </View>
      )}
      <View style={{flex: 1, padding: 20}}>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView>
            <View style={{width: '100%', alignItems: 'flex-start'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back />
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', marginTop: 15, alignItems: 'center'}}>
              <LOGO />
            </View>
            <View style={{width: '100%', marginTop: 30}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 24,
                  fontFamily: Fonts.bold1,
                  lineHeight: 29,
                }}>
                {languageString.resetCustomerPassword}
              </CustomText>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.regular1,
                  lineHeight: 19,
                  marginTop: 5,
                }}>
                {languageString.enterYourLoginAndEmail}
              </CustomText>
            </View>
            <View style={{width: '100%', marginTop: 30}}>
              <View style={{width: '100%'}}>
                <CustomText style={styles.label}>
                  {languageString.fullName}*
                </CustomText>
                <TextInput
                  placeholderTextColor={'#5F5F5F'}
                  placeholder={languageString.typeHere}
                  style={styles.inputBox}
                  onChangeText={e => setUserName(e)}
                />
              </View>

              <View style={{width: '100%', marginTop: 20}}>
                <CustomText style={styles.label}>
                  {languageString.phoneNumber}*
                </CustomText>
                <TextInput
                  placeholderTextColor={'#5F5F5F'}
                  placeholder="Type here"
                  style={styles.inputBox}
                  onChangeText={e => setPhoneNumber(e)}
                />
              </View>
              <View style={{width: '100%', marginTop: 20}}>
                <CustomText style={styles.label}>
                  {languageString.location}
                </CustomText>

                <TouchableOpacity
                  onPress={() => setOpenModal(true)}
                  style={styles.inputBox}>
                  <CustomText
                    style={{color: '#5F5F5F', fontFamily: Fonts.regular1}}>
                    {location}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={() => submit()}
            style={styles.borderedButton}>
            <CustomText
              style={[
                styles.borderedButtonText,
                {color: '#008183', fontSize: 16},
              ]}>
              {languageString.submit}
            </CustomText>
          </TouchableOpacity>
        </View>
        <Modal
          testID={'modal'}
          isVisible={isOpen}
          onBackdropPress={() => {
            setOpen(false);
            navigation.navigate('LoginScreen');
          }}
          style={{margin: 0, padding: 20}}>
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              width: '100%',
              height: 300,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 20,
              padding: 20,
            }}>
            <LOGO height={40} />
            <View
              style={{
                flex: 1,
                width: '100%',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontFamily: Fonts.bold1,
                  textAlign: 'center',
                  lineHeight: 25,
                }}>
                {languageString.yourRequestSubmit}
              </CustomText>
            </View>
            <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                  navigation.navigate('LoginScreen');
                }}
                style={[styles.borderedButton, {width: 80}]}>
                <CustomText
                  style={[
                    styles.borderedButtonText,
                    {color: '#008183', fontSize: 16},
                  ]}>
                  OK
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          testID={'modal'}
          isVisible={openModal}
          onBackdropPress={() => setOpenModal(false)}
          style={styles.view}>
          <View style={styles.content}>
            <SafeAreaView style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setOpenModal(false)}>
                  <Back />
                </TouchableOpacity>
                <CustomText
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: Fonts.bold1,
                    marginLeft: 10,
                  }}>
                  Search Location
                </CustomText>
              </View>
              <View style={{width: '100%', height: '90%', padding: 10}}>
                <View
                  style={{
                    backgroundColor: '#F3F4F7',
                    borderRadius: 10,
                    marginTop: 10,
                    paddingHorizontal: 10,
                    color: '#0E1618',

                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <GooglePlacesAutocomplete
                    placeholder={location}
                    numberOfLines={3}
                    multiline={true}
                    fetchDetails={true}
                    textInputProps={{autoFocus: true}}
                    onPress={(data, details = null) => {
                      console.log(data, 'address');
                      setLocation(data.description);
                      setOpenModal(false);
                    }}
                    query={{
                      key: 'AIzaSyBpqBp_UAv-0H0GvHMfBG0hvl1L-VJ69g0',
                      language: 'en',
                    }}
                    placeholderTextColor="#5F5F5F"
                    styles={{
                      textInputContainer: {
                        borderColor: 'lightgray',
                        // borderWidth: 1,
                        color: '#000',
                        width: '100%',
                      },
                      row: {backgroundColor: '#F3F4F7'},
                      description: {
                        color: '#000',
                      },
                      textInput: {
                        flex: 1,
                        color: '#000',
                        backgroundColor: '#F3F4F7',
                      },
                    }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
