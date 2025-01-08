import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
import {itemWidth, sliderWidth, styles} from '../../../helper/styles';
import Download from '../../../../assets/images/Icons/download.svg';
import Upload from '../../../../assets/images/Icons/upload.svg';
import CalendarPicker from 'react-native-calendar-picker';
import {getStatics} from '../../../api/getUserStatics';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Colors, DateTimePicker, Picker} from 'react-native-ui-lib';
import {gteAllFUPCounter} from '../../../api/getAllFUPCounter';
import Lottie from 'lottie-react-native';
const StaticScreen = () => {
  const CurrentDate = new Date();
  const DATA = [
    {date: '25 Dec 2022', upload: 0.03, download: 0.08},
    {date: '24 Dec 2022', upload: 0.03, download: 0.08},
    {date: '23 Dec 2022', upload: 0.03, download: 0.08},
    {date: '22 Dec 2022', upload: 0.03, download: 0.08},
    {date: '21 Dec 2022', upload: 0.03, download: 0.08},
    {date: '20 Dec 2022', upload: 0.03, download: 0.08},
  ];
  const [startDate, setStartDate] = useState(
    new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 1),
  );
  const [endDate, setEndDate] = useState(
    new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 1, 0),
  );
  const {currentService, languageString} = useSelector(state => state.user);
  const [openCalender, setOpenCalender] = useState(false);
  const [allData, stAllData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [FUPCounter, setFUPCounter] = useState({});
  const [isLoading, setLoading] = useState(true);
  const onDateChange = date => {
    console.log(date);
  };
  useEffect(() => {
    getUserStatics();
    getTotalFUP();
  }, []);

  const sortData = data => {
    const sort = data.sort((a, b) => {
      return (
        moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD')
      );
    });
    return sort;
  };

  const getUserStatics = async () => {
    const response = await getStatics(currentService.id);
    if (response.remote === 'success') {
      console.log('result', response);
      stAllData(response.data);
    }
  };

  const getTotalFUP = async () => {
    const response = await gteAllFUPCounter(currentService.id);
    if (response.remote === 'success') {
      setFUPCounter(response.data);
    }
  };

  useEffect(() => {
    filterWithDate(startDate, endDate);
  }, [allData]);

  const filterWithDate = (startD, endD) => {
    console.log('start');
    setLoading(true);
    console.log(allData);
    if (startD && endD) {
      const start = moment(startD, 'YYYY-MM-DD');
      const end = moment(endD, 'YYYY-MM-DD');
      console.log(start, end);
      const filter = allData.filter(
        item =>
          moment(item.date, 'YYYY-MM-DD').isBetween(start, end) ||
          moment(item.date, 'YYYY-MM-DD').isSame(start) ||
          moment(item.date, 'YYYY-MM-DD').isSame(end),
      );
      console.log(filter);
      setStatistics(sortData(filter));
    }
    setLoading(false);
  };

  const resetData = () => {
    setStartDate(
      new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 1),
    );
    setEndDate(
      new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 1, 0),
    );
    filterWithDate(
      new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 1),
      new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 1, 0),
    );
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const totalUpload = () => {
    var count = 0;
    const upload = statistics.map(value => {
      return parseFloat(value.up);
    });

    return upload.reduce((a, b) => a + b, 0) || 0;
  };

  const totalDownload = () => {
    var count = 0;
    const download = statistics.map(value => {
      return parseFloat(value.down);
    });

    return download.reduce((a, b) => a + b, 0) || 0;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header screenName={languageString.statistics} />
        <View style={{flex: 1, padding: 20}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomText
              style={{
                color: '#161B1D',
                fontSize: 14,
                fontFamily: Fonts.regular1,
              }}>
              {languageString.selectDate}
            </CustomText>

            <View style={{width: '100%', flexDirection: 'row'}}>
              <View style={{width: '50%', padding: 5}}>
                <DateTimePicker
                  migrateTextField
                  containerStyle={[styles.inputBox]}
                  mode={'date'}
                  value={startDate}
                  maximumDate={new Date()}
                  placeholderTextColor="#5f5f5f"
                  placeholder={'From'}
                  dateFormat={'DD-MM-YYYY'}
                  onChange={date => setStartDate(date)}
                  // value={new Date('October 13, 2014')}
                />
              </View>
              <View style={{width: '50%', padding: 5}}>
                <DateTimePicker
                  migrateTextField
                  containerStyle={[styles.inputBox]}
                  mode={'date'}
                  value={endDate}
                  placeholderTextColor="#5f5f5f"
                  placeholder={'To'}
                  minimumDate={startDate}
                  dateFormat={'DD-MM-YYYY'}
                  onChange={date => setEndDate(date)}
                  // value={new Date('October 13, 2014')}
                />
              </View>
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View style={{width: '50%', padding: 5}}>
                <TouchableOpacity
                  onPress={() => resetData()}
                  style={styles.borderedButton}>
                  <CustomText
                    style={[
                      styles.borderedButtonText,
                      {color: '#008183', fontSize: 16},
                    ]}>
                    {languageString.reset}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <View style={{width: '50%', padding: 5}}>
                <TouchableOpacity
                  onPress={() => filterWithDate(startDate, endDate)}
                  style={[styles.borderedButton, {backgroundColor: '#008183'}]}>
                  <CustomText
                    style={[
                      styles.borderedButtonText,
                      {color: '#fff', fontSize: 16},
                    ]}>
                    {languageString.filter}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{width: '50%', padding: 5}}>
                <View
                  style={[
                    styles.shadow,
                    {
                      width: '100%',
                      height: 45,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    },
                  ]}>
                  <Download />
                  <View
                    style={{flex: 1, marginLeft: 5, alignItems: 'flex-start'}}>
                    <CustomText
                      style={{
                        color: '#000000',
                        fontSize: 12,
                        fontFamily: Fonts.regular1,
                      }}>
                      {languageString.download}
                    </CustomText>
                    <CustomText
                      style={{
                        color: '#A70057',
                        fontSize: 16,
                        fontFamily: Fonts.bold1,
                      }}>
                      {formatBytes(totalDownload())}
                    </CustomText>
                  </View>
                </View>
              </View>
              <View style={{width: '50%', padding: 5}}>
                <View
                  style={[
                    styles.shadow,
                    {
                      width: '100%',
                      height: 45,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    },
                  ]}>
                  <Upload />
                  <View
                    style={{flex: 1, marginLeft: 5, alignItems: 'flex-start'}}>
                    <CustomText
                      style={{
                        color: '#000000',
                        fontSize: 12,
                        fontFamily: Fonts.regular1,
                      }}>
                      {languageString.uploaded}
                    </CustomText>
                    <CustomText
                      style={{
                        color: '#000000',
                        fontSize: 16,
                        fontFamily: Fonts.bold1,
                      }}>
                      {formatBytes(totalUpload())}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                {languageString.recentUsage}
              </CustomText>
              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: '#A70057',
                  marginTop: 10,
                }}
              />
              <View style={{width: '100%'}}>
                {statistics.length > 0 ? (
                  statistics.map((item, index) => {
                    return (
                      <View key={index} style={{width: '100%', marginTop: 10}}>
                        <CustomText
                          style={{
                            color: '#5F5F5F',
                            fontSize: 14,
                            fontFamily: Fonts.bold1,
                            textAlign: 'left',
                          }}>
                          {item.date}
                        </CustomText>
                        <View
                          style={{
                            width: '100%',
                            height: 2,
                            backgroundColor: '#EDEFF3',
                            marginVertical: 5,
                          }}
                        />
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: '50%',
                              padding: 5,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Download />
                            <View
                              style={{
                                flex: 1,
                                marginLeft: 10,
                                alignItems: 'flex-start',
                              }}>
                              <CustomText
                                style={{
                                  color: '#5F5F5F',
                                  fontSize: 12,
                                  fontFamily: Fonts.regular1,
                                }}>
                                {languageString.download}
                              </CustomText>
                              <CustomText
                                style={{
                                  color: '#151B33',
                                  fontSize: 14,
                                  fontFamily: Fonts.bold1,
                                }}>
                                {formatBytes(item.down) || 0}
                              </CustomText>
                            </View>
                          </View>
                          <View
                            style={{
                              width: '50%',
                              padding: 5,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Upload />
                            <View
                              style={{
                                flex: 1,
                                marginLeft: 10,
                                alignItems: 'flex-start',
                              }}>
                              <CustomText
                                style={{
                                  color: '#5F5F5F',
                                  fontSize: 12,
                                  fontFamily: Fonts.regular1,
                                }}>
                                {languageString.uploaded}
                              </CustomText>
                              <CustomText
                                style={{
                                  color: '#151B33',
                                  fontSize: 14,
                                  fontFamily: Fonts.bold1,
                                }}>
                                {formatBytes(item.up) || 0}
                              </CustomText>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      flex: 1,

                      height: 400,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {isLoading ? (
                      <ActivityIndicator size={'large'} color="#A70057" />
                    ) : (
                      <Lottie
                        source={require('../../../../assets/loader/no-data-found.json')}
                        autoPlay
                        loop
                      />
                    )}
                    {/* <CustomText
                      style={{
                        color: '#000',
                        fontSize: 18,
                        fontFamily: Fonts.bold1,
                      }}>
                      There is no statistics right now
                    </CustomText> */}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StaticScreen;
