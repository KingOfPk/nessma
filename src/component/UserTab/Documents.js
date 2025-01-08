import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import PDF from '../../../assets/images/Icons/pdf.svg';
import Upload from '../../../assets/images/Icons/upload-doc.svg';
import Delete from '../../../assets/images/Icons/delete.svg';
import Close from '../../../assets/images/Icons/close.svg';
import Eye from '../../../assets/images/Icons/eye-green.svg';
import {CustomText} from '../../comman/customText';
import {Fonts} from '../../helper/theme';
import {styles} from '../../helper/styles';
import {useSelector} from 'react-redux';
import {getCustomerDocument} from '../../api/getCustomerDocument';
import Modal from 'react-native-modal';
const Documents = () => {
  const {languageString, user} = useSelector(state => state.user);
  const [documents, setDocuments] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [documentImage, setDocumentImage] = useState('');
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    getDocument();
  }, []);
  const getDocument = async () => {
    const response = await getCustomerDocument(user.id);
    console.log(response);
    if (response.remote == 'success') {
      const filter = response.data.filter(item => item.type === 'uploaded');
      setDocuments(filter);
      setLoading(false);
    }
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
          {languageString.idProof}
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
                  setDocumentImage(item.download_link);
                  setOpen(true);
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
                <Image
                  source={{uri: item.thumbnail_link}}
                  style={{
                    height: 55,
                    width: 55,
                    resizeMode: 'contain',
                    borderRadius: 28,
                  }}
                />
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
                <Eye />
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
        </CustomText> */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#F3F4F7',
            borderRadius: 10,
            marginTop: 30,
          }}>
          <Upload />
          <View style={{flex: 1, marginLeft: 10}}>
            <CustomText
              style={{color: '#000', fontSize: 12, fontFamily: Fonts.bold1}}>
              Upload Address Proof
            </CustomText>
          </View>
        </View>
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

export default Documents;
