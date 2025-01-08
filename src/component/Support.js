import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../comman/CommanHeader';
import HeadPhone from '../../assets/images/Icons/headphone.svg';
import Ticket from '../../assets/images/Icons/ticket.svg';
import Close from '../../assets/images/Icons/close.svg';
import Download from '../../assets/images/Icons/download.svg';
import {CustomText} from '../comman/customText';
import {Fonts} from '../helper/theme';
import {styles} from '../helper/styles';
import {getAllTickets} from '../api/getAllTickets';
import moment from 'moment';
import Modal from 'react-native-modal';
import {getDetailedTicket} from '../api/getDetailedTicket';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
const Support = ({navigation}) => {
  const [tickets, setTickets] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [ticketInfo, setTicketDetail] = useState(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [isloading, setLoading] = useState(false);
  const {user, languageString} = useSelector(state => state.user);
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getAllUserTicket();
    });
    return subscribe;
  }, [navigation]);

  const getAllUserTicket = async () => {
    const response = await getAllTickets();
    console.log(response);
    if (response.remote === 'success') {
      setTickets(response.data);
    }
  };

  const ticketDetail = async ticket => {
    setLoading(true);
    const response = await getDetailedTicket(ticket.id, user.id);
    console.log({response}, user);
    if (response.remote === 'success') {
      setTicketDetail(ticket);
      setAllMessages(response.data);
      setMessage(response.data[0].rawMessage);
      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.support}
        />
        {isloading && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(225,225,225,0.5)',
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color="#A70057" />
          </View>
        )}
        <View style={{flex: 1, padding: 20}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isloading}
                onRefresh={getAllTickets}
              />
            }
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 40,
              }}>
              <HeadPhone width="86" height="86" />
            </View>
            <View style={{width: '100%', marginTop: 10}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                {languageString.support} : {languageString.activeTickets}
              </CustomText>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#EDEFF3',
                  marginTop: 10,
                }}
              />
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.regular1,
                  marginTop: 10,
                }}>
                {languageString.nowYouDoNotHave}
              </CustomText>
            </View>
            <View style={{width: '100%', marginTop: 10}}>
              <CustomText
                style={{
                  color: '#161B1D',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                {languageString.history}
              </CustomText>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#EDEFF3',
                  marginTop: 10,
                }}
              />
              {tickets.length > 0 ? (
                tickets.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => ticketDetail(item)}
                      style={[
                        styles.shadow,
                        {
                          width: '100%',
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          marginTop: 10,
                        },
                      ]}>
                      <View
                        style={{
                          width: '100%',
                          padding: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderBottomColor: '#EBEBEB',
                          borderBottomWidth: 1,
                        }}>
                        <Ticket />
                        <View style={{flex: 1, marginLeft: 10}}>
                          <CustomText
                            style={{
                              color: '#868889',
                              fontSize: 10,
                              fontFamily: Fonts.regular1,
                              lineHeight: 16,
                            }}>
                            {languageString.ticketRaised}{' '}
                            {moment(item.created_at).format('DD-MM-YYYY')}
                          </CustomText>
                          <CustomText
                            style={{
                              color: '#000',
                              fontSize: 14,
                              fontFamily: Fonts.bold1,
                              lineHeight: 20,
                            }}>
                            {languageString.ticket} #{item.id}
                          </CustomText>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}></View>

                        <View
                          style={{
                            width: 70,
                            height: 25,
                            backgroundColor:
                              item.closed === '1' ? '#EDFAF5' : '#88C6FF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                          }}>
                          <CustomText
                            style={{
                              color: item.closed === '1' ? '#008183' : '#fff',
                              fontSize: 12,
                              fontFamily: Fonts.regular1,
                            }}>
                            {item.closed === '1' ? 'Resolved' : 'Open'}
                          </CustomText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View
                  style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                  <CustomText
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontFamily: Fonts.bold1,
                    }}>
                    {languageString.thereIsNoHistory}
                  </CustomText>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{width: '100%', padding: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateTicket')}
            style={[
              styles.borderedButton,
              {
                borderWidth: 0,
                backgroundColor: '#E1EEEA',
                paddingHorizontal: 20,
              },
            ]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <HeadPhone width="25" height="25" />
              <CustomText
                style={[
                  styles.borderedButtonText,
                  {color: '#008183', fontSize: 16, marginLeft: 10},
                ]}>
                {languageString.createTicket}
              </CustomText>
            </View>
            <Image source={require('../../assets/images/Icons/Vector.png')} />
          </TouchableOpacity>
        </View>
        <Modal
          testID={'modal'}
          isVisible={isOpen}
          onBackdropPress={() => setOpen(false)}
          style={{margin: 0, padding: 20}}>
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              width: '100%',
              minHeight: 400,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 20,
            }}>
            <View
              style={{
                width: '100%',
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 1,
              }}>
              <Ticket />
              <View style={{flex: 1, marginLeft: 10}}>
                <CustomText
                  style={{
                    color: '#868889',
                    fontSize: 10,
                    fontFamily: Fonts.regular1,
                    lineHeight: 16,
                  }}>
                  Ticket raised on{' '}
                  {moment(ticketInfo?.created_at).format('DD-MM-YYYY')}
                </CustomText>
                <CustomText
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: Fonts.bold1,
                    lineHeight: 20,
                  }}>
                  Ticket #{ticketInfo?.id}
                </CustomText>
              </View>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, width: '100%'}}>
              <ScrollView style={{width: '100%'}}>
                {allMessages.map(value => {
                  return (
                    <View style={{flex: 1, padding: 10, width: '100%'}}>
                      <View
                        style={{
                          width: '100%',
                          borderBottomColor: '#ccc',
                          borderBottomWidth: 1,
                          paddingVertical: 10,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              borderColor: '#ccc',
                              borderWidth: 1,
                              borderRadius: 20,
                              backgroundColor: '#ffefd0',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <CustomText
                              style={{
                                fontFamily: Fonts.bold1,
                                color: 'rgba(0,0,0,.3)',
                                fontSize: 16,
                              }}>
                              {value.author_type[0].toUpperCase()}
                            </CustomText>
                          </View>
                          <View style={{flex: 1, marginLeft: 10}}>
                            <CustomText
                              style={{
                                fontSize: 15,
                                fontFamily: Fonts.semiBold,
                              }}>
                              {value.author_type === 'customer'
                                ? user.name
                                : 'Admin'}
                            </CustomText>
                            <CustomText
                              style={{fontSize: 12, fontFamily: Fonts.light1}}>
                              Created On:{' '}
                              <CustomText style={{fontFamily: Fonts.semiBold}}>
                                {value.date} {value.time}
                              </CustomText>
                            </CustomText>
                          </View>
                        </View>
                        <View style={{width: '100%', padding: 10}}>
                          <RenderHTML
                            contentWidth={'100%'}
                            tagsStyles={{
                              div: {
                                fontFamily: Fonts.regular1,
                                color: '#000',
                              },
                              p: {
                                fontFamily: Fonts.regular1,
                                color: '#000',
                              },

                              img: {
                                width: 300,
                              },
                            }}
                            source={{
                              html: value.rawMessage,
                            }}
                          />
                        </View>
                        {value.files.map(file => {
                          return (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View style={{flex: 1}}>
                                <CustomText
                                  style={{
                                    fontFamily: Fonts.regular1,
                                    marginTop: 10,
                                    marginLeft: 10,
                                    color: '#357bf2',
                                  }}>
                                  {file.filename_original}
                                </CustomText>
                              </View>
                              <Download
                                onPress={() =>
                                  Linking.openURL(file.download_link)
                                }
                                width={30}
                                height={30}
                              />
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View
              style={{
                width: '100%',
                padding: 10,
                alignItems: 'flex-end',
                borderTopColor: '#EBEBEB',
                borderTopWidth: 1,
              }}>
              <View
                style={{
                  width: 70,
                  height: 25,
                  backgroundColor:
                    ticketInfo?.closed === '1' ? '#EDFAF5' : '#88C6FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <CustomText
                  style={{
                    color: ticketInfo?.closed === '1' ? '#008183' : '#fff',
                    fontSize: 12,
                    fontFamily: Fonts.regular1,
                  }}>
                  {ticketInfo?.closed === '1' ? 'Resolved' : 'Open'}
                </CustomText>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Support;
