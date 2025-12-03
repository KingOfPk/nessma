import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  I18nManager,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {CustomText} from '../../../comman/customText';
import HomeHeader from '../../../comman/HomeHeader';
import {itemWidth, sliderWidth, styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
import * as Progress from 'react-native-progress';
import ButtonIcon from '../../../../assets/images/Icons/direct-up.svg';
import AddSquare from '../../../../assets/images/Icons/add-square.svg';
import Support from '../../../../assets/images/Icons/24-support.svg';
import Cloud from '../../../../assets/images/Icons/cloud-change.svg';
import Service from '../../../../assets/images/Icons/service.svg';
import Carousel from 'react-native-snap-carousel';
import {dashboard} from '../../../api/dashboard';
import {userDetail} from '../../../api/userDetail';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllCapedData,
  setAllUserService,
  setAppLanguage,
  setCurrentPlan,
  setCurrentUserService,
  setLanguageString,
  setUserBalance,
  setUserDetail,
} from '../../../store/userReducer';
import {refreshToken} from '../../../api/refreshToken';
import {getAllUserService} from '../../../api/getAlluserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCapedData} from '../../../api/getCapedData';
import {getExpireData} from '../../../api/getExpireData';
import {getCustomerCapedData} from '../../../api/getCustomerCapedData';
import moment from 'moment';
import {getApiWithouttoken, postApisWithoutToken} from '../../../api/adminApi';
import {ADMINURL} from '../../../config/config';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import RNRestart from 'react-native-restart';
import Modal from 'react-native-modal';
import Close from '../../../../assets/images/Icons/close.svg';
import {normalize} from '../../../utils/Normalize';
const MainScreen = ({navigation}) => {
  let _carousel = useRef();
  const {width, height} = useWindowDimensions();
  const buttons = ['English', 'Arabic'];
  const dispatch = useDispatch();
  const {user, balance, currentPlan, currentService, languageString, language} =
    useSelector(state => state.user);
  const [isloading, setLoading] = useState(true);
  const [reLoading, setReLoading] = useState(false);
  const [expireDate, setExpireDate] = useState({});
  const [capedData, setCapedData] = useState({});
  const [sliderData, setSliderData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [giftModal, setGiftModal] = useState(false);

  const [loginGiftImage, setLOginGiftImage] = useState('');

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setGiftModal(false);
      getDashboardData(); //get dashboard data
      getLimitedPlanDetail();
      getUserData();
      getExpireDate();
    });
    return subscribe;
  }, [navigation]);

  useEffect(() => {
    getUserData();
    return () => setGiftModal(false);
  }, []);

  useEffect(() => {
    if (user.id) {
      getCurrentService();
      getExpireDate();
      getSliderImages();
      getGiftCard();
      sendDeviceToken();
    }
    // getLoginPlan();
  }, [user]);

  const getLoginPlan = async () => {
    if (!giftModal) {
      const result = await getApiWithouttoken(
        `/get-default-giftcard?customer_id=${user.id}`,
      );
      console.log('result123', result);
      if (result.success) {
        if (result.data.data) {
          setLOginGiftImage(result.data.data);
          setGiftModal(true);
        }
      }
    }
    setLoading(false);
  };

  const sendDeviceToken = async () => {
    console.log('userDetail', user);
    const deviceToken = await AsyncStorage.getItem('fcm');
    const data = {
      device_token: deviceToken,
      customer_id: user.id,
    };
    const response = await postApisWithoutToken(
      '/device-token?version=1',
      data,
    );
    console.log('response122', response, data);
  };

  const getDashboardData = async () => {
    // portal/dashboard/dashboard
    try {
      const response = await dashboard();
      if (response.remote === 'success') {
        console.log(response.data.data, 'dashboard data');
        const index = response.data.data.findIndex(
          item => item.name == 'active_services',
        );
        // const balanceData = response.data.data[0];
        // console.log(index, "sdds")
        if (index >= 0) {
          const currentPlan = response.data.data[index];
          dispatch(setCurrentPlan(Object.values(currentPlan.data)[0]));
        }
      } else {
        if (response.errors.status === 401) {
          const result = await refreshToken();
          if (result.remote === 'success') {
            getDashboardData();
          } else {
            navigation.navigate('LoginScreen');
          }
        }
      }
      console.log('hello13');
    } catch (error) {
      console.log(error, 'error1');
    }
    setLoading(false);
  };

  const getUserData = async () => {
    const response = await userDetail();
    if (response.remote === 'success') {
      console.log('response.data', response.data);
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
  };

  const getCustoCapedData = async () => {
    const response = await getCustomerCapedData();
    if (response.remote === 'success') {
      const filter = response.data[response.data.length - 1];
      console.log('filter', filter);
      setCapedData(filter);
    }
  };

  const getCurrentService = async () => {
    console.log(user.id);
    const response = await getAllUserService(user.id);
    if (response.remote === 'success') {
      response.data.map(item => {
        if (item.status === 'active') {
          dispatch(setCurrentUserService(item));
        }
      });
      dispatch(setAllUserService(sortData(response.data)));
      getCustoCapedData();
    }
  };

  const sortData = data => {
    const sort = data.sort((a, b) => {
      return b.id - a.id;
    });
    return sort;
  };

  const getExpireDate = async () => {
    if (user.id) {
      const response = await getExpireData(user.id);
      if (response.remote === 'success') {
        setExpireDate(response.data);
        dispatch(setUserBalance(response.data.deposit?.split('د.ل')[0] || 0));
      }
    }
  };

  const getSliderImages = async () => {
    const response = await getApiWithouttoken('/get-slider');
    if (response.success) {
      setSliderData(response.data.data);
    }
    console.log(response);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          height:
            Platform.OS === 'ios' ? (height > 900 ? 230 : height * 0.23) : 180,
          backgroundColor: '#eee',

          overflow: 'hidden',
          borderRadius: 10,
        }}>
        <Image
          source={{uri: `${ADMINURL}slider/${item.slider_image}`}}
          style={[
            {
              width: '100%',
              height: '100%',
              borderRadius: 10,
            },
          ]}
        />
      </View>
    );
  };

  const getLimitedPlanDetail = async () => {
    const response = await getCapedData();
    if (response.remote === 'success') {
      console.log('response6565', response.data);
      dispatch(getAllCapedData(response.data));
    }
  };

  useEffect(() => {
    SetLanguage();
  }, []);

  const SetLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    const appVersion = await AsyncStorage.getItem('appVersion');
    const response = await getApiWithouttoken(
      `/get-language?language=${lang || 'ar'}&version=${appVersion}`,
    );
    if (response.success) {
      dispatch(setLanguageString(response.data.data.values));
    }
    dispatch(setAppLanguage(lang));
  };

  const updateIndex = async selectedIndex => {
    console.log(language);
    var lang = selectedIndex == 0 ? 'en' : 'ar';
    AsyncStorage.setItem('language', lang);
    const appVersion = await AsyncStorage.getItem('appVersion');
    const response = await getApiWithouttoken(
      `/get-language?language=${lang}&version=${appVersion}`,
    );
    if (response.success) {
      dispatch(setLanguageString(response.data.data.values));
    }
    dispatch(setAppLanguage(lang));
    if (lang === 'en') {
      I18nManager.forceRTL(false);
    } else {
      I18nManager.forceRTL(true);
    }

    RNRestart.Restart();
  };

  const getGiftCard = async () => {
    const response = await getApiWithouttoken(
      `/get-giftcard?customer_id=${user.id}`,
    );
    console.log('response', response);
    if (response.success) {
      const gift = response.data.data[0];
      if (gift) {
        setModalData(gift);
        setOpen(true);
      }
    }
  };

  const refreshScreen = async () => {
    // setReLoading(true);
    SetLanguage();
    getCurrentService();
    getExpireDate();
    getSliderImages();
    getGiftCard();
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  // const backAction = () => {
  //   if (navigation.isFocused()) {
  //     BackHandler.exitApp();
  //     return true;
  //   }
  // };

  const sendResponseOfLoginGiftCard = async () => {
    const data = {customer_id: user.id, giftcard_response: '1'};
    const response = await postApisWithoutToken(
      '/send-default-giftcard-response',
      data,
    );
    console.log(data, response);
    if (response.success) {
      setGiftModal(false);
    }
  };

  const responseGiftCard = async res => {
    const data = {
      giftcard_id: modalData.id,
      customer_id: user.id,
      response: res,
      isDefault: modalData.is_default,
    };

    const response = await postApisWithoutToken(
      '/send-giftcard-response',
      data,
    );
    console.log(response);
    if (response.success) {
      setOpen(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <HomeHeader />
        {isloading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(225,225,225,0.5)',
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color="#A70057" />
          </View>
        )}
        <View style={{flex: 1}}>
          <ScrollView
            style={{backgroundColor: '#FAFBFF'}}
            refreshControl={
              <RefreshControl
                refreshing={reLoading}
                onRefresh={refreshScreen}
              />
            }
            showsVerticalScrollIndicator={false}>
            <View style={{width: '100%', padding: 20}}>
              <View
                style={[
                  {
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  },
                  styles.shadow,
                ]}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <CustomText
                      style={{
                        fontSize: normalize(21),
                        color: '#008183',
                        lineHeight: 22,
                        fontFamily: Fonts.bold1,
                      }}>
                      {user?.name} - {user?.userId}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <CustomText
                    style={{
                      fontSize: normalize(19),
                      color: '#5F5F5F',
                      lineHeight: 20,
                      fontFamily: Fonts.bold1,
                    }}>
                    {languageString.bal}:
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: normalize(23),
                      color: '#008183',
                      fontFamily: Fonts.bold1,
                      marginRight: 10,
                      lineHeight: 24,
                    }}>
                    {balance || 0}
                    {languageString.LYD}
                  </CustomText>
                </View>
              </View>
              <View
                style={[
                  {
                    width: '100%',
                    padding: 10,
                    marginTop: height * 0.02,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  },
                  styles.shadow,
                ]}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      fontSize: normalize(21),
                      color: '#000',
                      fontFamily: Fonts.bold1,
                      opacity: 0.5,
                      lineHeight: 22,
                    }}>
                    {languageString.data.toUpperCase()}
                  </CustomText>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      backgroundColor: '#EDFAF5',
                      borderRadius: 5,
                    }}>
                    <CustomText
                      style={{
                        fontSize: normalize(17),
                        color: '#008183',
                        fontFamily: Fonts.bold1,
                        lineHeight: 19,
                      }}>
                      {user.status}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: Platform.OS === 'ios' ? '48%' : '45%',
                      alignItems: 'center',
                    }}>
                    <Progress.Circle
                      progress={
                        currentPlan?.trafficUsage
                          ? currentPlan?.trafficUsage?.used_percent / 100 || 0
                          : 1
                      }
                      strokeCap="round"
                      thickness={18}
                      size={Platform.OS === 'ios' ? height * 0.16 : 130}
                      direction="counter-clockwise"
                      unfilledColor="#F2F2F2"
                      borderWidth={0}
                      color="#A70057"
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 30,
                        alignItems: 'center',
                      }}>
                      {currentPlan?.trafficUsage ? (
                        <View>
                          <CustomText
                            style={{
                              fontSize: normalize(18),
                              color: '#A70057',
                              fontFamily: Fonts.bold1,
                              lineHeight: 24,
                              textAlign: 'center',
                            }}>
                            {`${languageString.remaining} \n ${currentPlan?.trafficUsage?.capped_not_used_text}`}{' '}
                          </CustomText>
                          <View style={{flexDirection: 'row'}}>
                            <CustomText
                              style={{
                                fontSize: normalize(16),
                                color: '#5F5F5F',
                                fontFamily: Fonts.regular1,
                                lineHeight: 20,
                                textAlign: 'center',
                              }}>
                              {languageString.from}{' '}
                            </CustomText>
                            <CustomText
                              style={{
                                fontSize: normalize(16),
                                color: '#5F5F5F',
                                fontFamily: Fonts.regular1,
                                lineHeight: 20,
                                textAlign: 'center',
                              }}>
                              {currentPlan?.trafficUsage?.capped_text_all}
                            </CustomText>
                          </View>
                        </View>
                      ) : (
                        <View>
                          <CustomText
                            style={{
                              fontSize: normalize(16),
                              color: '#A70057',
                              fontFamily: Fonts.bold1,
                              lineHeight: 18,
                              textAlign: 'center',
                              marginTop: height * 0.02,
                            }}>
                            {expireDate.howManyDaysLeft}
                          </CustomText>
                          <CustomText
                            style={{
                              fontSize: normalize(16),
                              color: '#5F5F5F',
                              fontFamily: Fonts.regular1,
                              lineHeight: 20,
                              textAlign: 'center',
                            }}>
                            {languageString.daysLeft || 0}
                          </CustomText>
                        </View>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 15,
                    }}>
                    <CustomText
                      style={{
                        fontSize: normalize(19),
                        color: '#A70057',
                        fontFamily: Fonts.bold1,
                        lineHeight: 20,
                      }}>
                      {currentPlan?.service_description}
                    </CustomText>

                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        color: '#868889',
                        fontFamily: Fonts.regular1,
                        lineHeight: 14,
                        marginTop: 5,
                      }}>
                      {languageString.planExpireOn}{' '}
                      <CustomText style={{color: '#000'}}>
                        {' '}
                        {currentPlan?.trafficUsage
                          ? moment(capedData?.valid_till).format('DD-MM-YYYY')
                          : expireDate.blocking_date == '---'
                          ? '00:00:0000'
                          : moment(expireDate.blocking_date).format(
                              'DD-MM-YYYY',
                            )}
                      </CustomText>
                    </CustomText>

                    {currentPlan?.trafficUsage && (
                      <View style={{width: '100%', padding: 10}}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Topup')}
                          style={[styles.borderedButton]}>
                          <ButtonIcon />
                          <CustomText style={styles.borderedButtonText}>
                            {languageString.topUp}
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  marginTop: height * 0.02,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                <View style={{width: '33%', padding: 5, marginRight: 5}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddMoney')}
                    style={[
                      styles.shadow,
                      {
                        width: '100%',
                        alignItems: 'center',
                        height: Platform.OS === 'ios' ? height * 0.1 : 80,
                        backgroundColor: '#59bc7b',
                        paddingHorizontal: 5,
                        borderRadius: 18,
                        justifyContent: 'center',
                        paddingVertical: 10,
                      },
                    ]}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <AddSquare />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(17),
                        color: '#FFFFFF',
                        fontFamily: Fonts.bold1,
                        marginTop: 8,
                      }}>
                      {languageString.addMoney}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={{width: '33%', padding: 5}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Support')}
                    style={[
                      styles.shadow,
                      {
                        width: '100%',
                        height: Platform.OS === 'ios' ? height * 0.1 : 80,
                        alignItems: 'center',
                        backgroundColor: '#5C8BB9',
                        paddingHorizontal: 5,
                        borderRadius: 18,
                        justifyContent: 'center',
                        paddingVertical: 10,
                      },
                    ]}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Support />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(17),
                        color: '#FFFFFF',
                        fontFamily: Fonts.bold1,
                        marginTop: 8,
                      }}>
                      {languageString.support}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={{width: '33%', padding: 5, marginLeft: 5}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ChangePlan')}
                    style={[
                      styles.shadow,
                      {
                        width: '100%',
                        height: Platform.OS === 'ios' ? height * 0.1 : 80,
                        alignItems: 'center',
                        backgroundColor: '#D2BF68',
                        paddingHorizontal: 5,
                        borderRadius: 18,
                        justifyContent: 'center',
                        paddingVertical: 10,
                      },
                    ]}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Cloud />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(17),
                        color: '#FFFFFF',
                        fontFamily: Fonts.bold1,
                        marginTop: 8,
                      }}>
                      {languageString.changePlan}
                    </CustomText>
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('ActiveService')}
                    style={[
                      styles.shadow,
                      {
                        height: 35,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        borderRadius: 18,
                        marginLeft: 10,
                      },
                    ]}>
                    <Service style={{color: '#A70057'}} />
                    <CustomText
                      style={{
                        fontSize: language==="ar"?14: 12,
                        color: '#4F4F4F',
                        fontFamily: Fonts.regular1,
                        marginLeft: 5,
                      }}>
                      Active Service
                    </CustomText>
                  </TouchableOpacity> */}
              </View>

              <View
                style={{
                  width: '100%',
                  marginTop: height * 0.02,

                  alignItems: 'center',
                }}>
                <Carousel
                  ref={_carousel}
                  data={sliderData}
                  // activeSlideAlignment="start"
                  renderItem={_renderItem}
                  sliderWidth={sliderWidth - 40}
                  itemWidth={sliderWidth - 40}
                  layout={'default'}
                  autoplay={true}
                  useExperimentalSnap={true}
                  activeSlideAlignment={'center'}
                  loop={true}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* ======================================= gift card modal ============================== */}
        <Modal
          testID={'modal'}
          isVisible={isOpen}
          style={{margin: 0, padding: 20}}>
          <View
            style={{
              width: '100%',
              height: '80%',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 10,
              padding: 5,
            }}>
            <Image
              source={{
                uri: `${ADMINURL}giftcard_image/${modalData?.giftcard_image}`,
              }}
              style={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'stretch',
                },
              ]}
            />
            {/* <TouchableOpacity
              onPress={() => responseGiftCard(2)}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,

                position: 'absolute',
                top: -20,
                right: 10,
              }}>
              <Close />
            </TouchableOpacity> */}
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
                      {color: '#fff', fontSize: normalize(18)},
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
                      {color: '#008183', fontSize: normalize(18)},
                    ]}>
                    {languageString.remindMeLater}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* ================================== login welcome modal ==================================== */}
        <Modal
          testID={'modal'}
          isVisible={giftModal}
          style={{margin: 0, padding: 10}}>
          <TouchableOpacity
            onLayout={event => {
              var {x, y, width, height} = event.nativeEvent.layout;
              console.log('hight, width', height, width);
            }}
            onPress={() => sendResponseOfLoginGiftCard()}
            style={{
              width: '100%',
              height: '80%',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 10,
              padding: 5,
            }}>
            <Image
              source={{
                uri: loginGiftImage,
              }}
              style={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'stretch',
                },
              ]}
            />
            {/* <TouchableOpacity
              onPress={() => setOpen(false)}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,

                position: 'absolute',
                top: -20,
                right: 10,
              }}>
              <Close />
            </TouchableOpacity> */}
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: '80%', padding: 5}}>
              <TouchableOpacity
                onPress={() => sendResponseOfLoginGiftCard()}
                style={[styles.borderedButton, {backgroundColor: '#008183'}]}>
                <CustomText
                  style={[
                    styles.borderedButtonText,
                    {color: '#fff', fontSize: 16},
                  ]}>
                  {languageString.ok}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
