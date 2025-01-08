import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
const ActiveService = ({navigation}) => {
  const [type, setType] = useState('limited');
  const [isloading, setLoading] = useState(false);
  const {currentService, allService} = useSelector(state => state.user);
  const ServiceTab = createMaterialTopTabNavigator();

  // const sortData = data => {
  //   const sort = allService.sort((a, b) => {
  //     return b.id - a.id;
  //   });
  //   return sort;
  // };

  const DATA = [
    {
      serviceName: 'NESSMA 1',
      price: 20,
      speedUpTo: 12,
      data: 12,
    },
    {
      serviceName: 'NESSMA 1',
      price: 40,
      speedUpTo: 12,
      data: 26,
    },
    {
      serviceName: 'NESSMA 1',
      price: 60,
      speedUpTo: 12,
      data: 45,
    },
    {
      serviceName: 'NESSMA 1',
      price: 80,
      speedUpTo: 12,
      data: 100,
    },
  ];

  const [tarrifs, setTarrifs] = useState([]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'Services'}
        />
        <View style={{flex: 1}}>
          <ScrollView horizontal={true}>
            <View style={{width: '100%', flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  height: 30,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <View style={{width: 120}}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: Fonts.regular1,
                    }}>
                    Tariff
                  </CustomText>
                </View>
                <View
                  style={{
                    width: 100,
                    alignItems: 'flex-end',
                  }}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: Fonts.regular1,
                    }}>
                    Price
                  </CustomText>
                </View>
                <View style={{width: 120, alignItems: 'center'}}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: Fonts.regular1,
                    }}>
                    Start Date
                  </CustomText>
                </View>
                <View style={{width: 100, alignItems: 'center'}}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: Fonts.regular1,
                    }}>
                    InVoiced Until
                  </CustomText>
                </View>
                <View style={{width: 100, alignItems: 'center'}}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontFamily: Fonts.regular1,
                    }}>
                    Status
                  </CustomText>
                </View>
              </View>
              <View style={{width: '100%', flexDirection: 'column'}}>
                <FlatList
                  data={allService.slice(0, 2)}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                          backgroundColor: index % 2 == 0 ? '#F3F4F7' : '#fff',
                          alignItems: 'center',
                          paddingVertical: 5,
                          borderBottomColor: '#ccc',
                          borderBottomWidth: 0.5,
                        }}>
                        <View style={{width: 120}}>
                          <CustomText
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: Fonts.regular1,
                              textAlign: 'left',
                            }}>
                            {item.description}
                          </CustomText>
                        </View>
                        <View
                          style={{
                            width: 100,
                            alignItems: 'flex-end',
                          }}>
                          <CustomText
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: Fonts.regular1,
                            }}>
                            {parseFloat(item.unit_price).toFixed(2)}
                          </CustomText>
                        </View>
                        <View style={{width: 120, alignItems: 'center'}}>
                          <CustomText
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: Fonts.regular1,
                            }}>
                            {moment(item.start_date).format('DD.MM.YYYY')}
                          </CustomText>
                        </View>
                        <View style={{width: '20%', alignItems: 'center'}}>
                          <CustomText
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: Fonts.regular1,
                            }}></CustomText>
                        </View>
                        <View style={{width: 100, alignItems: 'center'}}>
                          <CustomText
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: Fonts.regular1,
                            }}>
                            {item.status}
                          </CustomText>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActiveService;
