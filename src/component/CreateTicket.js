import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {getAllTicketType} from '../api/getAllTicketType';
import {Header} from '../comman/CommanHeader';
import {CustomText} from '../comman/customText';
import {styles} from '../helper/styles';
import Down from '../../assets/images/Icons/Vector.svg';
import {Colors, Picker} from 'react-native-ui-lib';
import {showStatus} from '../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createTicket} from '../api/createTicket';
import {useSelector} from 'react-redux';
const CreateTicket = ({navigation}) => {
  const toast = useToast();
  const [ticketType, setTicketType] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(null);
  const {languageString} = useSelector(state => state.user);
  const priority = [
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
    {label: 'Urgent', value: 'urgent'},
  ];
  useEffect(() => {
    getTicketType();
  }, []);

  const getTicketType = async () => {
    const response = await getAllTicketType();
    if (response.remote === 'success') {
      const res = response.data.map(item => {
        return {label: item.title, value: item.id};
      });
      setTicketType(res);
    }
  };

  const getPriorityType = async () => {};

  const createNewTicket = async () => {
    if (title === '') {
      showStatus(
        toast,
        languageString.pleaseEnterSubject,
        'custom_error_toast',
      );
    } else if (!selectedType) {
      showStatus(
        toast,
        languageString.pleaseSelectSupportType,
        'custom_error_toast',
      );
    } else if (!selectedPriority) {
      showStatus(
        toast,
        languageString.pleaseSelectPriorityType,
        'custom_error_toast',
      );
    } else if (message === '') {
      showStatus(
        toast,
        languageString.pleaseEnterMessage,
        'custom_error_toast',
      );
    } else {
      const data = {
        subject: title,
        type_id: selectedType.value,
        priority: selectedPriority.value,
        message: {message: message},
      };
      const response = await createTicket(data);
      console.log(response);
      if (response.remote === 'success') {
        showStatus(
          toast,
          languageString.ticketCreatedSuccessfully,
          'custom_success_toast',
        );
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.createTicket}
        />
        <View style={{flex: 1, padding: 20}}>
          <KeyboardAwareScrollView>
            <View style={{width: '100%'}}>
              <CustomText style={styles.label}>
                {languageString.subject}
              </CustomText>
              <TextInput
                placeholderTextColor={'#5F5F5F'}
                placeholder={languageString.typeHere}
                onChangeText={e => setTitle(e)}
                style={styles.inputBox}
              />
            </View>
            <View style={{width: '100%', marginTop: 10}}>
              <CustomText style={styles.label}>
                {languageString.type}
              </CustomText>
              <View style={{width: '100%'}}>
                <Picker
                  placeholder={languageString.selectType}
                  floatingPlaceholder={false}
                  containerStyle={{height: 50}}
                  hideUnderline
                  value={selectedType}
                  enableModalBlur={false}
                  onChange={item => setSelectedType(item)}
                  topBarProps={{title: ''}}
                  style={[styles.inputBox, {fontSize: 14}]}
                  // showSearch
                  // searchPlaceholder={'Search a Type of Design'}
                  searchStyle={{
                    color: Colors.blue30,
                    placeholderTextColor: Colors.grey50,
                  }}
                  // onSearchChange={value => console.warn('value', value)}
                >
                  {ticketType.map(option => (
                    <Picker.Item key={option.value} value={option} />
                  ))}
                </Picker>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    top: 30,
                    position: 'absolute',
                    right: 10,
                  }}>
                  <Down />
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomText style={styles.label}>
                {languageString.priority}
              </CustomText>
              <View style={{width: '100%'}}>
                <Picker
                  placeholder={languageString.selectPriority}
                  floatingPlaceholder={false}
                  containerStyle={{height: 50}}
                  hideUnderline
                  value={selectedPriority}
                  enableModalBlur={false}
                  onChange={item => setSelectedPriority(item)}
                  topBarProps={{title: ''}}
                  style={[styles.inputBox, {fontSize: 14}]}
                  // showSearch
                  // searchPlaceholder={'Search a Type of Design'}
                  searchStyle={{
                    color: Colors.blue30,
                    placeholderTextColor: Colors.grey50,
                  }}
                  // onSearchChange={value => console.warn('value', value)}
                >
                  {priority.map(option => (
                    <Picker.Item key={option.value} value={option} />
                  ))}
                </Picker>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    top: 30,
                    position: 'absolute',
                    right: 10,
                  }}>
                  <Down />
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 10}}>
              <TextInput
                placeholder={languageString.writeMessage}
                multiline={true}
                placeholderTextColor={'#5F5F5F'}
                numberOfLines={6}
                onChangeText={e => setMessage(e)}
                style={[
                  styles.inputBox,
                  {
                    height: 180,
                    textAlignVertical: 'top',
                    backgroundColor: '#F9F9F9',
                    borderWidth: 1,
                    borderColor: '#5F5F5F4D',
                  },
                ]}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={{width: '100%', padding: 20}}>
          <TouchableOpacity
            onPress={createNewTicket}
            style={styles.borderedButton}>
            <CustomText
              style={[
                styles.borderedButtonText,
                {color: '#008183', fontSize: 16},
              ]}>
              {languageString.submit}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateTicket;
