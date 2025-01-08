import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StaticScreen from './StaticsScreen';
const StaticsStack = createNativeStackNavigator();

function StaticsTab() {
  return (
    <StaticsStack.Navigator
      screenOptions={{headerMode: false, gestureEnabled: false}}
      initialRouteName={'StaticScreen'}>
      <StaticsStack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="StaticScreen"
        component={StaticScreen}
      />
    </StaticsStack.Navigator>
  );
}

export default StaticsTab;
