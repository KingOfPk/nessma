import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../../helper/styles';
import {CustomText} from '../../../comman/customText';
import {Fonts} from '../../../helper/theme';
import Document from '../../../../assets/images/Icons/document.svg';
import Eye from '../../../../assets/images/Icons/eye-green.svg';
import Download from '../../../../assets/images/Icons/download-green.svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {getDocumentFile} from '../../../api/getDocumentFile';
import {showStatus} from '../../../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
const Invoice = ({item, setOpenInvoice, setInvoiceId}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const {languageString} = useSelector(state => state.user);

  const getPdfFile = async (item, type) => {
    if (type === 'open') {
      setShowLoading(true);
    } else {
      setLoading(true);
    }

    const response = await getDocumentFile('invoices', item.id);
    if (response.remote === 'success') {
      if (type === 'open') {
        setInvoiceId({
          file: '',
          url: '',
          base64: response.data.content,
        });
        setOpenInvoice(true);
        setShowLoading(false);
      } else {
        downloadInvoice(response.data);
      }
    }
  };
  const downloadInvoice = async pdf => {
    const {config, fs} = ReactNativeBlobUtil;
    let downloadDir =
      Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        mime: 'application/pdf',
        path: `${downloadDir}/${pdf.name}`, // this is the path where your downloaded file will live in
        description: 'Downloading Invoice.',
      },
    };
    ReactNativeBlobUtil.fs.writeFile(
      `${downloadDir}/${pdf.name}`,
      pdf.content,
      'base64',
    );
    // config(options)
    //   .fetch('GET', `data:application/pdf;base64,${pdf.content}`)
    //   .then(res => {
    //     // do some magic here
    //     console.log('res', res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    showStatus(
      toast,
      languageString.yourPaymentReceipt,
      'custom_success_toast',
    );
    setLoading(false);
  };
  return (
    <View
      style={[
        styles.shadow,
        {
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 10,
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
        <Document />
        <View style={{flex: 1, marginLeft: 10}}>
          <CustomText
            style={{
              color: '#868889',
              fontSize: 10,
              fontFamily: Fonts.regular1,
              lineHeight: 16,
            }}>
            {languageString.invoiceDue} {item.date_payment}
          </CustomText>
          <CustomText
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: Fonts.bold1,
              lineHeight: 20,
            }}>
            {languageString.invoices} #{item.number}
          </CustomText>
          <CustomText
            style={{
              color: '#000',
              fontSize: 12,
              fontFamily: Fonts.regular1,
              lineHeight: 20,
            }}>
            {languageString.total}, {languageString.LYD}:{' '}
            {parseFloat(item.total).toFixed(2)}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {showLoading ? (
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#DCF9FA',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'small'} color="#008183" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => getPdfFile(item, 'open')}>
              <Eye />
            </TouchableOpacity>
          )}
          {loading ? (
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#DCF9FA',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'small'} color="#008183" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => getPdfFile(item, 'download')}>
              <Download />
            </TouchableOpacity>
          )}
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
        <CustomText
          style={{
            color: '#868889',
            fontSize: 12,
            fontFamily: Fonts.bold1,
          }}>
          {languageString.status}
        </CustomText>

        <View
          style={{
            width: 70,
            height: 25,
            backgroundColor: '#EDFAF5',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <CustomText
            style={{
              color: '#008183',
              fontSize: 12,
              fontFamily: Fonts.regular1,
            }}>
            {item.status}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
export default Invoice;
