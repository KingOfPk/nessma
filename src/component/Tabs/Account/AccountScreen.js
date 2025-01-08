import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  SectionList,
} from 'react-native';
import {Header} from '../../../comman/CommanHeader';
import {styles} from '../../../helper/styles';
import Wallet from '../../../../assets/images/Icons/wallet.svg';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
import Add from '../../../../assets/images/Icons/add-circle.svg';
import Document from '../../../../assets/images/Icons/document.svg';
import Eye from '../../../../assets/images/Icons/eye-green.svg';
import Download from '../../../../assets/images/Icons/download-green.svg';
import Check from '../../../../assets/images/Icons/check-circle.svg';
import Back from '../../../../assets/images/Icons/Back.svg';
import Transaction from './transaction';
import Invoice from './Invoice';
import Payments from './Payments';
import {getAllTransaction} from '../../../api/getTrasication';
import {getUserInvoice} from '../../../api/getUserInvoice';
import {getUserPayments} from '../../../api/getUserPayments';
import LoadingPlaceHolder from './LoadingPlaceHolder';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {ORIGIN} from '../../../config/config';
import {refreshToken} from '../../../api/refreshToken';
// import PDFView from 'react-native-view-pdf';
import {useSelector} from 'react-redux';
const AccountScreen = ({navigation}) => {
  const {user, balance, currentPlan, languageString, language} = useSelector(
    state => state.user,
  );
  const DATA = [
    {
      title: 'account',
      data: [
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
        {
          lastDate: 'Invoice due on 12/11/2022',
          invoice: 'Invoice #2018002615',
          total: '0.00',
        },
      ],
    },
  ];
  const [isOpen, setOpen] = useState(false);
  const [finance, setFinance] = useState([]);
  const [isloading, setLoading] = useState(false);

  const [searchType, setSearchType] = useState('invoice');
  const [invoiceId, setInvoiceId] = useState('');
  useEffect(() => {
    getInvoice();
  }, []);

  const getTransaction = async () => {
    setSearchType('invoice');
    setLoading(true);
    const response = await getAllTransaction();
    if (response.remote === 'success') {
      setFinance(sortData(response.data));
    } else {
      setFinance([]);
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getTransaction();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    setLoading(false);
  };

  const sortData = data => {
    const sort = data.sort((a, b) => {
      return b.id - a.id;
    });
    return sort;
  };

  const getInvoice = async () => {
    setSearchType('invoice');
    setLoading(true);
    const response = await getUserInvoice();
    if (response.remote === 'success') {
      console.log(response.data);
      setFinance(sortData(response.data));
    } else {
      setFinance([]);
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getInvoice();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    setLoading(false);
  };

  const getPayments = async () => {
    setSearchType('payments');
    setLoading(true);
    const response = await getUserPayments();
    console.log(response);
    if (response.remote === 'success') {
      setFinance(sortData(response.data));
    } else {
      setFinance([]);
      if (response.errors.status === 401) {
        const result = await refreshToken();
        if (result.remote === 'success') {
          getPayments();
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }
    setLoading(false);
  };

  const Item = ({item}) =>
    isloading ? (
      <LoadingPlaceHolder />
    ) : (
      <View style={{width: '100%', padding: 10, paddingHorizontal: 20}}>
        {searchType === 'transactions' ? (
          <Transaction setFinance={setFinance} item={item} />
        ) : searchType === 'invoice' ? (
          <Invoice
            setOpenInvoice={value => setOpen(value)}
            setInvoiceId={value => setInvoiceId(value)}
            item={item}
          />
        ) : (
          <Payments
            setOpenInvoice={value => setOpen(value)}
            setInvoiceId={value => setInvoiceId(value)}
            item={item}
          />
        )}
      </View>
    );

  const handleResponse = data => {
    console.log(data);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header screenName={languageString.account} />
        <View style={{flex: 1}}>
          <SectionList
            sections={[
              {
                title: 'account',
                data: finance,
              },
            ]}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{width: '100%', padding: 20}}>
                <ImageBackground
                  source={require('../../../../assets/images/back.png')}
                  imageStyle={{borderRadius: 10}}
                  style={[
                    styles.shadow,
                    {
                      width: '100%',
                      height: 140,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      justifyContent: 'center',
                      padding: 10,
                    },
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Wallet />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                      }}>
                      <CustomText
                        style={{
                          color: '#5F5F5F',
                          fontSize: language == 'en' ? 12 : 16,
                          fontFamily: Fonts.regular1,
                        }}>
                        {languageString.yourCurrency}
                      </CustomText>
                      <CustomText
                        style={{
                          color: '#008183',
                          fontSize: 29,
                          fontFamily: Fonts.bold1,
                        }}>
                        {balance}
                        {languageString.LYD}
                      </CustomText>
                    </View>
                  </View>
                </ImageBackground>
                <View style={{width: '100%', marginTop: 20}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddMoney')}
                    style={styles.borderedButton}>
                    <Add />
                    <CustomText
                      style={[
                        styles.borderedButtonText,
                        {color: '#008183', fontSize: 16},
                      ]}>
                      {languageString.addMoney}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Item item={item} />}
            renderSectionHeader={({section: {title}}) => (
              <View style={{width: '100%'}}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50,
                    backgroundColor: '#fff',
                  }}>
                  {/* <TouchableOpacity
                    onPress={() => getTransaction()}
                    style={{
                      width: '33%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        searchType === 'transactions' ? '#A70057' : '#DBE0DE',
                    }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        color: '#5F5F5F',
                        fontFamily: Fonts.bold1,
                      }}>
                      {languageString.transactions}
                    </CustomText>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => getInvoice()}
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        searchType === 'invoice' ? '#A70057' : '#DBE0DE',
                    }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        color: '#5F5F5F',
                        fontFamily: Fonts.bold1,
                      }}>
                      {languageString.invoices}
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => getPayments()}
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      borderBottomWidth: 2,
                      borderBottomColor:
                        searchType === 'payments' ? '#A70057' : '#DBE0DE',
                    }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        color: '#5F5F5F',
                        fontFamily: Fonts.bold1,
                      }}>
                      {languageString.payments}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                {finance.length === 0 && (
                  <View
                    style={{
                      width: '100%',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: 18,
                        fontFamily: Fonts.regular1,
                        color: '#000',
                      }}>
                      {languageString.noDataFound}
                    </CustomText>
                  </View>
                )}
              </View>
            )}
          />
        </View>
        <Modal
          testID={'modal'}
          isVisible={isOpen}
          onBackdropPress={() => setOpen(false)}
          style={styles.view}>
          <View style={styles.content}>
            <SafeAreaView style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Back />
                </TouchableOpacity>
                <CustomText
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: Fonts.bold1,
                    marginLeft: 10,
                  }}>
                  Invoice
                </CustomText>
              </View>
              {/* <View style={{width: '100%', height: '90%'}}>
                <PDFView
                  fadeInDuration={250.0}
                  style={{flex: 1}}
                  resource={invoiceId.base64}
                  resourceType={'base64'}
                  onLoad={() => console.log(`PDF rendered from ${'base64'}`)}
                  onError={error => console.log('Cannot render PDF', error)}
                />
              </View> */}
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
