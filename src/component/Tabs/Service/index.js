import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceScreen from './ServiceScreen';
const ServiceStack = createNativeStackNavigator();

function ServiceTab() {
  return (
    <ServiceStack.Navigator
      screenOptions={{headerMode: false, gestureEnabled: false}}
      initialRouteName={'ServiceScreen'}>
      <ServiceStack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="ServiceScreen"
        component={ServiceScreen}
      />
    </ServiceStack.Navigator>
  );
}

export default ServiceTab;
