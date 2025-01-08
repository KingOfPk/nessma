import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';

const ProfileStack = createNativeStackNavigator();

function ProfileTab() {
  return (
    <ProfileStack.Navigator
      screenOptions={{headerMode: false, gestureEnabled: false}}
      initialRouteName={'ProfileScreen'}>
      <ProfileStack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileTab;
