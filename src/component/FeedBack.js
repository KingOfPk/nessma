import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from '../comman/CommanHeader';
import {CustomText} from '../comman/customText';
import {styles} from '../helper/styles';
import {Fonts} from '../helper/theme';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import {getApiWithouttoken, postApisWithoutToken} from '../api/adminApi';
const Feedback = ({navigation}) => {
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };
  const [design, setDesign] = useState(3);
  const [functionality, setFunctionality] = useState(3);
  const [comments, setComments] = useState('');
  const [alreadyFill, setAlreadyFill] = useState(false);
  const {languageString, user} = useSelector(state => state.user);

  const designRating = rating => {
    setDesign(rating);
  };
  const functionalityRating = rating => {
    setFunctionality(rating);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const response = await getApiWithouttoken(
      `/get-feedback?customer_id=${user.id}`,
    );
    if (response.success) {
      const rate = response.data.data[0];
      if (rate) {
        setDesign(rate.design);
        setFunctionality(rate.functionlity);
        setComments(rate.comment);
        setAlreadyFill(true);
      }
    }
  };

  const submit = async () => {
    const data = {
      customer_id: user.id,
      design: design,
      comment: comments,
      functionlity: functionality,
      customer_name: user.name,
    };
    const response = await postApisWithoutToken('/submit-feedback', data);
    if (response.success) {
      navigation.navigate('Tabs');
    }
  };
  // const submit
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.feedback}
        />
        <View style={{flex: 1, padding: 20}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <CustomText
              style={{color: '#161B1D', fontSize: 18, fontFamily: Fonts.bold1}}>
              {languageString.createFeedback}
            </CustomText>
          </View>
          <View
            style={[
              styles.shadow,
              {
                width: '100%',
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: '#fff',
                padding: 20,
              },
            ]}>
            <CustomText
              style={{
                color: '#261E27',
                fontSize: 16,
                fontFamily: Fonts.bold1,
              }}>
              {languageString.pleaseRateTheDesign}
            </CustomText>
            <View style={{marginTop: 15}}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                isDisabled
                startingValue={design}
                onFinishRating={designRating}
              />
              {alreadyFill && (
                <View
                  style={{
                    width: '100%',
                    height: 40,

                    position: 'absolute',
                  }}></View>
              )}
            </View>
            <CustomText
              style={{
                color: '#261E27',
                fontSize: 16,
                fontFamily: Fonts.bold1,
                marginTop: 15,
              }}>
              {languageString.pleaseRateTheApplicationFunctionality}
            </CustomText>
            <View style={{marginTop: 15}}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                isDisabled={true}
                startingValue={functionality}
                onFinishRating={functionalityRating}
              />
              {alreadyFill && (
                <View
                  style={{
                    width: '100%',
                    height: 40,

                    position: 'absolute',
                  }}></View>
              )}
            </View>
            <View style={{width: '100%', marginTop: 15}}>
              <CustomText
                style={{
                  color: '#261E27',
                  fontSize: 16,
                  fontFamily: Fonts.bold1,
                }}>
                {languageString.addYourComments}
              </CustomText>
              {alreadyFill ? (
                <CustomText
                  style={{
                    fontSize: 15,
                    marginTop: 10,
                    fontFamily: Fonts.regular1,
                  }}>
                  {comments}
                </CustomText>
              ) : (
                <TextInput
                  placeholderTextColor={'#5F5F5F'}
                  multiline={true}
                  editable={!alreadyFill}
                  onChangeText={e => setComments(e)}
                  numberOfLines={6}
                  value={comments}
                  placeholder={languageString.typeHere}
                  style={[
                    styles.inputBox,
                    {height: 150, textAlignVertical: 'top'},
                  ]}
                />
              )}
            </View>

            <View style={{width: '100%', marginTop: 15}}>
              {alreadyFill ? (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <CustomText
                    style={{
                      color: '#261E27',
                      fontSize: 16,
                      fontFamily: Fonts.bold1,
                      marginTop: 15,
                    }}>
                    {languageString.alreadySubmit}
                  </CustomText>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={submit}
                  style={styles.borderedButton}>
                  <CustomText
                    style={[
                      styles.borderedButtonText,
                      {color: '#008183', fontSize: 16},
                    ]}>
                    {languageString.submit}
                  </CustomText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
