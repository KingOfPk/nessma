import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from './AccountScreen';

const AccountStack = createNativeStackNavigator();

function AccountTab() {
  return (
    <AccountStack.Navigator
      screenOptions={{headerMode: false, gestureEnabled: false}}
      initialRouteName={'AccountScreen'}>
      <AccountStack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="AccountScreen"
        component={AccountScreen}
      />
    </AccountStack.Navigator>
  );
}

export default AccountTab;
