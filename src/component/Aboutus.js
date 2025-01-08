import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../comman/CommanHeader';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
const AboutUs = ({navigation}) => {
  const {language} = useSelector(state => state.user);
  const [isloading, setLoading] = useState(true);
  const handleResponse = data => {
    console.log(data);
    setLoading(data.loading);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'About Us'}
        />
        {isloading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              zIndex: 1,
            }}>
            <ActivityIndicator size={'large'} color="#A70057" />
          </View>
        )}
        <View style={{flex: 1}}>
          <WebView
            onNavigationStateChange={data => handleResponse(data)}
            source={{
              uri:
                language === 'ar'
                  ? `https://www.nessmanet.ly/about-us/`
                  : 'https://www.nessmanet.ly/about/',
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutUs;
