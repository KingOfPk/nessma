import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import AboutUs from '../component/Aboutus';
import AddCreditCard from '../component/AddCreditCard';
import CreateTicket from '../component/CreateTicket';
import EnterAmount from '../component/EnterAmount';
import FAQ from '../component/FAQ';
import Feedback from '../component/FeedBack';
import ForgotPassword from '../component/ForgotPassword';
import LoginScreen from '../component/LoginScreen';
import Notification from '../component/Notification';
import OpengateWay from '../component/OpenGateway';
import PaywithVoucher from '../component/PaywithVoucher';
import PrivacyPolicy from '../component/PrivacyPolicy';
import RegistrationScreen from '../component/RegistrationScreen';
import SetLanguage from '../component/setLanguage';
import SplashScreen from '../component/SplaceScreen';
import Support from '../component/Support';
import BottomTabNavigator from '../component/Tabs';
import ActiveService from '../component/Tabs/Dashboard/ActivePlans';
import AddMoney from '../component/Tabs/Dashboard/AddMoney';
import ChangePlan from '../component/Tabs/Dashboard/ChangePlan';
import GiftCard from '../component/Tabs/Dashboard/giftCard';
import Topup from '../component/Tabs/Dashboard/Topup';
import UserInfo from '../component/UserInfo';
import UserLocation from '../component/UserTab/UserLocation';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerMode: false}}
      initialRouteName={'SplashScreen'}>
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Tabs"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="UserInfo"
        component={UserInfo}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Support"
        component={Support}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="CreateTicket"
        component={CreateTicket}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="FAQ"
        component={FAQ}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Feedback"
        component={Feedback}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="ChangePlan"
        component={ChangePlan}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="AddMoney"
        component={AddMoney}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Topup"
        component={Topup}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="AddCreditCard"
        component={AddCreditCard}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="PaywithVoucher"
        component={PaywithVoucher}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="ActiveService"
        component={ActiveService}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="SetLanguage"
        component={SetLanguage}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="GiftCard"
        component={GiftCard}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="EnterAmount"
        component={EnterAmount}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="OpengateWay"
        component={OpengateWay}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="UserLocation"
        component={UserLocation}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
