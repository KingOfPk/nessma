import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import LimitedData from './limitedData';
import LoadingPlaceHolder from './loader';
import UnlimitedPlan from './UnlimitedData';

const ServiceScreen = ({navigation}) => {
  const [type, setType] = useState('limited');
  const [isloading, setLoading] = useState(false);
  const {currentService, languageString} = useSelector(state => state.user);
  const ServiceTab = createMaterialTopTabNavigator();
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

  const MyTabBar = ({state, descriptors, navigation, position}) => {
    return (
      <View style={{flexDirection: 'row', paddingTop: 10}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          // modify inputRange for custom behavior

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
                borderBottomColor: isFocused ? '#A70057' : '#DBE0DE',
                borderBottomWidth: 3,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              }}>
              <CustomText
                style={{
                  color: isFocused ? '#0E1618' : '#5F5F5F',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                {label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header screenName={languageString.plans} />
        <View style={{flex: 1}}>
          <ServiceTab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <ServiceTab.Screen
              name={languageString.limited}
              component={LimitedData}
            />
            <ServiceTab.Screen
              name={languageString.unLimited}
              component={UnlimitedPlan}
            />
          </ServiceTab.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;
