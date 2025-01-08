import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../comman/CommanHeader';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
const PrivacyPolicy = ({navigation}) => {
  const {languageString, language} = useSelector(state => state.user);
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
          screenName={languageString.privacyPolicy}
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
                  ? 'https://www.nessmanet.ly/privacy-policy/'
                  : 'https://www.nessmanet.ly/en/our-privacy-policy/',
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
