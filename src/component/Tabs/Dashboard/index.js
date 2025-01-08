import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
const DashboardStack = createNativeStackNavigator();

function DashbaordTab() {
  return (
    <DashboardStack.Navigator
      screenOptions={{headerMode: false, gestureEnabled: false}}
      initialRouteName={'MainScreen'}>
      <DashboardStack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="MainScreen"
        component={MainScreen}
      />
    </DashboardStack.Navigator>
  );
}

export default DashbaordTab;
