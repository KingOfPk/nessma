import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getApiWithouttoken} from '../api/adminApi';
import {Header} from '../comman/CommanHeader';
import {CustomText} from '../comman/customText';
import {styles} from '../helper/styles';
import {Fonts} from '../helper/theme';
import LoadingPlaceHolder from './Tabs/Service/loader';
import notifee from '@notifee/react-native';

const Notification = ({navigation}) => {
  const {user, languageString} = useSelector(state => state.user);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllNotification();
    notifee.cancelAllNotifications();
  }, []);
  const getAllNotification = async () => {
    const response = await getApiWithouttoken(
      `/get-notification?customer_id=${user.id}`,
    );
    if (response.success) {
      const res = response.data.data;
      const groups = res.reduce((groups, message) => {
        const date = message.datetime_sent?.substring(0, 10);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map(date => {
        return {
          date,
          message: groups[date],
        };
      });
      console.log(JSON.stringify(groupArrays));
      setNotifications(sortData(groupArrays));
    }
    setLoading(false);
  };

  const sortData = data => {
    const sort = data.sort((a, b) => {
      return (
        moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD')
      );
    });
    return sort;
  };

  const seeMoreText = (key, index) => {
    let data = notifications;
    if (data[key].message[index].showMore) {
      data[key].message[index].showMore = false;
    } else {
      data[key].message[index].showMore = true;
    }
    console.log(data[key].message[index]);
    setNotifications(data);
    setRefresh(!refresh);
  };

  const dateformate = data => {
    var date = moment.utc(data).local().startOf('seconds').fromNow();
    return date;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.notification}
        />
        {isLoading ? (
          <View style={{flex: 1}}>
            <LoadingPlaceHolder />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView>
              {notifications.length === 0 ? (
                <View
                  style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                  <CustomText
                    style={{
                      fontSize: 18,
                      color: '#000',
                      fontFamily: Fonts.bold1,
                    }}>
                    {languageString.noDataFound}
                  </CustomText>
                </View>
              ) : (
                notifications.map((item, key) => {
                  return (
                    <View style={{width: '100%'}}>
                      <View
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          borderBottomColor: '#EDEFF3',
                          borderBottomWidth: 1,
                          paddingHorizontal: 20,
                        }}>
                        <CustomText style={styles.headingText}>
                          {item.date}
                        </CustomText>
                      </View>
                      {item.message.map((value, index) => {
                        return (
                          <View
                            style={[
                              styles.shadow,
                              {
                                width: '100%',
                                marginTop: 10,
                                backgroundColor: '#fff',
                                padding: 20,
                              },
                            ]}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <CustomText
                                style={{
                                  color: '#151B33',
                                  fontSize: 14,
                                  fontFamily: Fonts.bold1,
                                  lineHeight: 17,
                                }}>
                                {value.title || value.type}
                              </CustomText>
                              <CustomText
                                style={{
                                  color: '#5F5F5F',
                                  fontSize: 10,
                                  fontFamily: Fonts.regular1,
                                }}>
                                {moment(value.datetime_sent).format('hh:mm A')}
                              </CustomText>
                            </View>
                            <CustomText
                              numberOfLines={value.showMore ? undefined : 2}
                              style={{
                                color: '#5F5F5F',
                                fontSize: 14,
                                fontFamily: Fonts.regular1,
                                marginTop: 3,
                              }}>
                              {value.message}
                            </CustomText>
                            {value?.message?.length > 100 && (
                              <CustomText
                                onPress={() => seeMoreText(key, index)}
                                style={{
                                  color: '#008183',
                                  fontSize: 14,
                                  fontFamily: Fonts.bold1,
                                  marginTop: 10,
                                  textAlign: 'right',
                                }}>
                                {value.showMore
                                  ? 'show less...'
                                  : 'show more...'}
                              </CustomText>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
