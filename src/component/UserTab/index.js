import React from 'react';
import {Text, View, TouchableOpacity, Animated} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BasicInfo from './Basic';
import Documents from './Documents';
import Contract from './Contract';
import {CustomText} from '../../comman/customText';
import {Fonts} from '../../helper/theme';
import {useSelector} from 'react-redux';

const UserTab = createMaterialTopTabNavigator();

function UserTabs() {
  const {languageString} = useSelector(state => state.user);
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
    <UserTab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <UserTab.Screen name={languageString.basic} component={BasicInfo} />
      {/* <UserTab.Screen name={languageString.document} component={Documents} /> */}
      <UserTab.Screen name={languageString.contract} component={Contract} />
    </UserTab.Navigator>
  );
}

export default UserTabs;
