import React, {useEffect, useRef} from 'react';
import {Alert, AppState, Button, Linking, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/route/AppNavigator';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import messaging from '@react-native-firebase/messaging';
import {store} from './src/store';
import {Fonts} from './src/helper/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showStatus} from './src/utils/showToast';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ForegroundHandler, {
  notificationListener,
  requestUserPermission,
} from './src/utils/foregroundHendler';
import VersionCheck from 'react-native-version-check';
import {enableScreens} from 'react-native-screens';
import {getApp, initializeApp} from '@react-native-firebase/app';
// import configureStore from './src/store/config';

export default App = () => {
  // const {store, persistor} = configureStore();
  const appState = useRef(AppState.currentState);
  const toast = useToast();
  const navigation = useRef();
  enableScreens();

  useEffect(() => {
    checkAppVersion();
    requestUserPermission();
    notificationListener(navigation);
  }, []);

  const checkAppVersion = async () => {
    VersionCheck.needUpdate().then(res => {
      console.log('res', res);
      if (res.isNeeded) {
        Alert.alert(
          'Hold on!',
          'There is updated version on app store do you want to update',
          [
            {
              text: 'YES',
              onPress: () => {
                Linking.openURL(res.storeUrl);
              },
            },
          ],
        );
      }
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // setAppStateVisible(appState.current);
      appState.current = nextAppState;
      console.log('AppState', appState.current);
      checkAppVersion();
    });
    return () => {
      subscription.remove();
    };
  }, [appState.current]);

  return (
    <StoreProvider store={store}>
      <View style={{flex: 1}}>
        <ToastProvider
          placement="top"
          offset={50}
          duration={3000}
          renderType={{
            custom_success_toast: toast => (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderColor: '#219958',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }}>
                {/* <AntDesign name="check" size={20} color={'#219958'} /> */}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.regular1,
                    color: '#219958',
                  }}>
                  {toast.message}
                </Text>
              </View>
            ),
            custom_error_toast: toast => (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderColor: '#e71a1a',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }}>
                {/* <AntDesign name="check" size={20} color={'#219958'} /> */}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.regular1,
                    color: '#e71a1a',
                  }}>
                  {toast.message}
                </Text>
              </View>
            ),
          }}>
          <NavigationContainer ref={navigation}>
            <AppNavigator />
          </NavigationContainer>
        </ToastProvider>
      </View>
    </StoreProvider>
  );
};
