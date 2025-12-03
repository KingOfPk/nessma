/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getAllTarrifPlan} from '../../../api/getAllTerrifPlan';
import {getLimitedPlans} from '../../../api/getLimitedPlan';
import {refreshToken} from '../../../api/refreshToken';
import {Header} from '../../../comman/CommanHeader';
import {CustomText} from '../../../comman/customText';
import {styles} from '../../../helper/styles';
import {Fonts} from '../../../helper/theme';
import LoadingPlaceHolder from './loader';
import {getApiWithouttoken} from '../../../api/adminApi';

const terrif76 = {
  speed_download: 20000,
  speed_upload: 8000,
  speed_limit_type: 'percent',
  speed_limit_at: 80,
  speed_limit_fixed_up: 0,
  speed_limit_fixed_down: 0,
  aggregation: 4,
  burst_type: 'percent',
  burst_limit: 120,
  burst_limit_fixed_up: 0,
  burst_limit_fixed_down: 0,
  burst_threshold: 90,
  burst_threshold_fixed_up: 0,
  burst_threshold_fixed_down: 0,
  burst_time: 60,
  priority: 'high',
  exclude_traffic_classes: [],
  services: null,
  service_name: 'ProGamer ',
  billing_days_count: null,
  available_for_services: '1',
  force_update_service_price: '0',
  force_update_service_name: '0',
  billing_types: ['prepaid', 'prepaid_monthly', 'recurring'],
  custom_period: 0,
  id: 76,
  title: 'بــــروجــيمـــر',
  price: '0.0000',
  transaction_category_id: 0,
  vat_percent: 0,
  with_vat: '1',
  show_on_customer_portal: '0',
  hide_on_admin_portal: '0',
  available_for_locations: [
    9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 51, 52,
    53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
  ],
  customer_categories: ['company', 'person'],
  partners_ids: [
    1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 25, 27, 28,
    29, 30, 31, 32, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59,
  ],
  tax_id: 1,
  updated_at: '2024-11-24 19:08:13',
  additional_attributes: {
    available_when_register_by_social_network: '0',
    enable_to_prepaid_portal: '0',
  },
  customer_labels: [],
};

const LimitedData = ({navigation}) => {
  const [type, setType] = useState('limited');
  const [isloading, setLoading] = useState(false);
  const {currentService, AllCapedData, languageString, language} = useSelector(
    state => state.user,
  );
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

  useEffect(() => {
    getAllLimitedPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllLimitedPlan = async () => {
    setType('limited');
    setLoading(true);
    // const response = await getAllTarrifPlan(currentService.tariff_id);
    const response = await getApiWithouttoken('/get-limited-tariffs');
    // console.log(response, "response")
    if (response.success) {
      const filter = response.data.data.filter(
        item => item.price === '0.0000' || item.tariff_id == '57',
      );
      // console.log({filter});
      const rowData = filter.map(item => {
        if (itemDetail(parseInt(item.tariff_id))) {
          console.log(item.id);
          return {
            title: item.title,
            price: itemDetail(parseInt(item.tariff_id)).price,
            speed_download: item.download_speed,
            amount: itemDetail(parseInt(item.tariff_id)).amount,
            amount_in: itemDetail(parseInt(item.tariff_id)).amount_in,
            id: item.tariff_id,
          };
        } else {
          return {price: 0};
        }
      });
      setTarrifs(sortData(rowData));
    } else {
      setTarrifs([]);
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getAllLimitedPlan();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    setLoading(false);
  };

  const sortData = data => {
    const sort = data.sort((a, b) => {
      console.log(parseFloat(a.price), parseFloat(b.price));
      return parseFloat(a.price) - parseFloat(b.price);
    });
    return sort;
  };

  const itemDetail = id => {
    // console.log(AllCapedData);
    const detail = AllCapedData.find(item => item.tariff_id === id);

    return detail;
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {isloading ? (
        <LoadingPlaceHolder />
      ) : (
        <FlatList
          data={tarrifs}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              itemDetail(parseInt(item.id)) && (
                <View style={{width: '100%', padding: 2}}>
                  <View
                    style={[
                      styles.shadow,
                      {
                        width: '100%',
                        padding: 15,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        marginTop: 10,
                      },
                    ]}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <CustomText
                          style={{
                            color: '#00000080',
                            fontSize: 16,
                            fontFamily: Fonts.bold1,
                            lineHeight: 19,
                            textAlign: language == 'ar' ? 'right' : 'left',
                          }}>
                          {item.title}
                        </CustomText>
                        <CustomText
                          style={{
                            color: '#000',
                            fontSize: 22,
                            fontFamily: Fonts.bold1,
                            lineHeight: 26,
                            textAlign: language === 'ar' ? 'right' : 'left',
                          }}>
                          {parseFloat(item.price).toFixed(2) || 0}{' '}
                          {languageString.LYD}
                        </CustomText>
                        <CustomText
                          style={{
                            color: '#00000099',
                            fontSize: 15,
                            fontFamily: Fonts.semiBold,
                            lineHeight: 18,
                            textAlign: 'left',
                          }}>
                          {languageString.speedUpTo}{' '}
                          {parseFloat(
                            Math.round(item.speed_download / 1024),
                          ).toFixed(0) || 0}{' '}
                          mbps
                        </CustomText>
                      </View>
                      <View
                        style={{
                          width: 65,
                          height: 65,
                          borderWidth: 4,
                          borderRadius: 33,
                          borderColor: '#008183',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <CustomText
                          style={{
                            color: '#A70057',
                            fontSize: 12,
                            fontFamily: Fonts.bold1,
                            lineHeight: 19,
                          }}>
                          {`${item.amount}${item.amount_in.toUpperCase()}`}
                          {/* {itemDetail(item.id).amount} */}
                        </CustomText>
                      </View>
                    </View>
                    <View style={{width: '100%', marginTop: 10}}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ChangePlan', {
                            service: item,
                            price: parseFloat(
                              itemDetail(parseInt(item.id)).price,
                            ).toFixed(2),
                            plan: 'limited',
                          })
                        }
                        style={styles.borderedButton}>
                        <CustomText
                          style={[
                            styles.borderedButtonText,
                            {color: '#008183', fontSize: 16},
                          ]}>
                          {languageString.orderNow}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            );
          }}
        />
      )}
    </View>
  );
};

export default LimitedData;
