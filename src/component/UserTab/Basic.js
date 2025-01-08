import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateUserProfile} from '../../api/updateUserProfile';
import {CustomText} from '../../comman/customText';
import {styles} from '../../helper/styles';
import {showStatus} from '../../utils/showToast';
import GPS from '../../../assets/images/Icons/gps.svg';
import Back from '../../../assets/images/Icons/Back.svg';
import Close from '../../../assets/images/Icons/close.svg';
import {Fonts} from '../../helper/theme';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import Geocoder from 'react-native-geocoding';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  Circle,
} from 'react-native-maps';
import {userDetail} from '../../api/userDetail';
import {setUserDetail} from '../../store/userReducer';
import {autoFocus} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
const LATITUDE_DELTA = 0.10087654165398163;
const LONGITUDE_DELTA = 0.10284561663866043;
const LATITUDE = 22.62938671242907;
const LONGITUDE = 88.4354486029795;
const BasicInfo = ({navigation}) => {
  const toast = useToast();
  Geocoder.init('AIzaSyBpqBp_UAv-0H0GvHMfBG0hvl1L-VJ69g0');
  const {user, languageString} = useSelector(state => state.user);
  let marker = React.useRef(null);
  let mapRef = React.useRef(null);
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [street_1, setStreet] = useState('');
  const [openMap, setOpenMap] = useState(false);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setStreet(user.street_1);
  }, [user]);

  useEffect(() => {
    Geocoder.from(street_1)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
        setLatitude(location.lat);
        setLongitude(location.lng);
      })
      .catch(error => console.warn(error));
  }, [street_1]);

  const submit = async () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      street_1: street_1,
    };
    const response = await UpdateUserProfile(data, user.id);
    console.log(response);
    if (response.remote === 'success') {
      showStatus(
        toast,
        languageString.profileUpdateSuccessfully,
        'custom_success_toast',
      );
      getUserData();
    } else {
      showStatus(toast, response.errors.errors, 'custom_error_toast');
    }
  };

  const getUserData = async () => {
    const response = await userDetail();
    if (response.remote === 'success') {
      console.log('response.data', response.data);
      dispatch(setUserDetail(response.data));
      navigation.navigate('Tabs');
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
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <ScrollView style={{flex: 1}}>
        <View style={{width: '100%'}}>
          <CustomText style={styles.label}>
            {languageString.fullName}
          </CustomText>
          <TextInput
            placeholderTextColor={'#5F5F5F'}
            placeholder={languageString.typeHere}
            value={name}
            onChangeText={e => setName(e)}
            style={styles.inputBox}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <CustomText style={styles.label}>{languageString.email}</CustomText>
          <TextInput
            placeholderTextColor={'#5F5F5F'}
            value={email}
            placeholder={languageString.typeHere}
            onChangeText={e => setEmail(e)}
            style={styles.inputBox}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <CustomText style={styles.label}>
            {languageString.phoneNumber}
          </CustomText>
          <TextInput
            placeholderTextColor={'#5F5F5F'}
            value={phone}
            placeholder={languageString.typeHere}
            onChangeText={e => setPhone(e)}
            style={styles.inputBox}
          />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
          <CustomText style={styles.label}>{languageString.street}</CustomText>
          <View
            style={{
              backgroundColor: '#F3F4F7',
              borderRadius: 10,
              marginTop: 10,
              paddingHorizontal: 10,
              color: '#0E1618',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                flex: 1,
                height: 50,
                color: '#000',
                backgroundColor: '#F3F4F7',
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  color: '#0E1618',
                  fontSize: 14,
                  fontFamily: Fonts.regular1,
                }}>
                {street_1}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenMap(true)}>
              <GPS />
            </TouchableOpacity>
          </View>
        </View>
        {openMap && (
          <View
            style={{
              width: '100%',
              margin: 10,
              height: 250,
              borderRadius: 10,
              marginLeft: 0,
              // marginRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => setOpenMap(false)}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,

                position: 'absolute',
                top: -10,
                right: 20,
                zIndex: 10,
              }}>
              <Close />
            </TouchableOpacity>
            <MapView
              style={{flex: 1}}
              ref={mapRef}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}></Marker>
            </MapView>
          </View>
        )}
      </ScrollView>
      <View style={{width: '100%', marginTop: 10}}>
        <TouchableOpacity onPress={submit} style={styles.borderedButton}>
          <CustomText
            style={[
              styles.borderedButtonText,
              {color: '#008183', fontSize: 16},
            ]}>
            {languageString.update}
          </CustomText>
        </TouchableOpacity>
      </View>
      <Modal
        testID={'modal'}
        isVisible={isOpen}
        onBackdropPress={() => setOpen(false)}
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
              <TouchableOpacity onPress={() => setOpen(false)}>
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
                  placeholder={street_1}
                  numberOfLines={3}
                  multiline={true}
                  fetchDetails={true}
                  textInputProps={{autoFocus: true}}
                  onPress={(data, details = null) => {
                    console.log(data, 'address');
                    setStreet(data.description);
                    setOpen(false);
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
  );
};

export default BasicInfo;
