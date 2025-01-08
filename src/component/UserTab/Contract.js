import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import PDF from '../../../assets/images/Icons/pdf.svg';
import Upload from '../../../assets/images/Icons/upload-doc.svg';
import Delete from '../../../assets/images/Icons/delete.svg';
import Close from '../../../assets/images/Icons/close.svg';
import Eye from '../../../assets/images/Icons/eye-green.svg';
import Download from '../../../assets/images/Icons/download-green.svg';
import {CustomText} from '../../comman/customText';
import {Fonts} from '../../helper/theme';
import {styles} from '../../helper/styles';
import {useSelector} from 'react-redux';
import {getCustomerDocument} from '../../api/getCustomerDocument';
import Modal from 'react-native-modal';
import {downloadContract} from '../../api/downloadContract';
import {showStatus} from '../../utils/showToast';
import {useToast} from 'react-native-toast-notifications';
import RNFetchBlob from 'rn-fetch-blob';
const Contract = () => {
  const {languageString, user} = useSelector(state => state.user);
  const toast = useToast();
  const [documents, setDocuments] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [documentImage, setDocumentImage] = useState('');
  const [isloading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    getDocument();
  }, []);
  const getDocument = async () => {
    const response = await getCustomerDocument(user.id);
    if (response.remote == 'success') {
      const filter = response.data.filter(item => item.type === 'contract');
      setDocuments(filter);
    }
    setLoading(false);
  };

  const generatePDF = async id => {
    setButtonLoading(true);
    const response = await downloadContract(id);
    if (response.remote === 'success') {
      downloadPDF(response.data);
    }
  };

  const downloadPDF = async pdf => {
    const {config, fs} = RNFetchBlob;
    let downloadDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
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
    RNFetchBlob.fs.writeFile(
      `${downloadDir}/${pdf.name}`,
      pdf.content,
      'base64',
    );
    showStatus(toast, 'Contract download successfully', 'custom_success_toast');

    setButtonLoading(false);
  };
  return isloading ? (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex: 1,
      }}>
      <ActivityIndicator size={'large'} color="#A70057" />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <View style={{flex: 1}}>
        <CustomText
          style={{
            color: '#000',
            fontSize: 18,
            fontFamily: Fonts.bold1,
          }}>
          {Contract}
        </CustomText>
        {documents.length === 0 ? (
          <CustomText
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: Fonts.bold1,
              textAlign: 'center',
              marginTop: 20,
            }}>
            {languageString.thereAreNoDocument}
          </CustomText>
        ) : (
          documents.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  generatePDF(item.id);
                }}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#F3F4F7',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <PDF />
                <View style={{flex: 1, marginLeft: 10}}>
                  <CustomText
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: Fonts.bold1,
                    }}>
                    {item.title}
                  </CustomText>
                  <CustomText
                    style={{
                      color: '#808080',
                      fontSize: 10,
                      fontFamily: Fonts.regular1,
                      marginTop: 4,
                    }}>
                    Added by: {item.added_by}
                  </CustomText>
                </View>
                {buttonLoading ? (
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
                  <Download />
                )}
              </TouchableOpacity>
            );
          })
        )}

        {/* <CustomText
          style={{
            color: '#000',
            fontSize: 18,
            fontFamily: Fonts.bold1,
            marginTop: 10,
          }}>
          Address Proof
        </CustomText>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#F3F4F7',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Upload />
          <View style={{flex: 1, marginLeft: 10}}>
            <CustomText
              style={{color: '#000', fontSize: 12, fontFamily: Fonts.bold1}}>
              Upload Address Proof
            </CustomText>
          </View>
        </View> */}
      </View>
      {/* <View style={{width: '100%', marginTop: 10}}>
        <TouchableOpacity style={styles.borderedButton}>
          <CustomText
            style={[
              styles.borderedButtonText,
              {color: '#008183', fontSize: 16},
            ]}>
            Update
          </CustomText>
        </TouchableOpacity>
      </View> */}
      <Modal
        testID={'modal'}
        isVisible={isOpen}
        onBackdropPress={() => setOpen(false)}
        style={{margin: 0, padding: 20}}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 180,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 10,
          }}>
          <Image
            source={{
              uri: documentImage,
            }}
            style={[
              {
                width: '100%',
                height: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,

              position: 'absolute',
              top: -20,
              right: 10,
            }}>
            <Close />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Contract;
