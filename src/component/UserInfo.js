import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Header} from '../comman/CommanHeader';
import UserTabs from './UserTab';

const UserInfo = ({navigation}) => {
  const {languageString} = useSelector(state => state.user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.userInfo}
        />
        <View style={{flex: 1}}>
          <UserTabs />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserInfo;
