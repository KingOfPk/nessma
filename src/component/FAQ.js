import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../comman/CommanHeader';
import Background from '../../assets/images/faq.svg';
import {CustomText} from '../comman/customText';
import {Fonts} from '../helper/theme';
import {AccordionList} from 'accordion-collapse-react-native';
import Open from '../../assets/images/Icons/xmark.svg';
import Close from '../../assets/images/Icons/plusmark.svg';
import {getApiWithouttoken} from '../api/adminApi';
import RenderHTML from 'react-native-render-html';
import {useSelector} from 'react-redux';
const FAQ = ({navigation}) => {
  const [questionList, setQuestionList] = useState([]);
  const {language, languageString} = useSelector(state => state.user);
  const LIST = [
    {
      question: 'Loreum epsum sit dolor emit',
      answer:
        'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. ',
    },
    {
      question: 'Loreum epsum sit dolor emit',
      answer:
        'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. ',
    },
    {
      question: 'Loreum epsum sit dolor emit',
      answer:
        'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. ',
    },
    {
      question: 'Loreum epsum sit dolor emit',
      answer:
        'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. ',
    },
    {
      question: 'Loreum epsum sit dolor emit',
      answer:
        'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. ',
    },
  ];

  useEffect(() => {
    getFaqQuestion();
  }, []);

  const getFaqQuestion = async () => {
    const response = await getApiWithouttoken(`/get-fqa?language=${language}`);
    if (response.success) {
      console.log(response.data.data);
      setQuestionList(response.data.data.values);
    }
  };

  const _head = (item, index, isExpanded) => {
    return (
      <View
        style={{
          width: '100%',
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <CustomText
            style={{
              color: '#000',
              fontSize: 16,
              fontFamily: Fonts.bold1,
            }}>
            {language === 'ar' ? item.arabic_question : item.question}
          </CustomText>
        </View>
        {isExpanded ? <Close /> : <Open />}
      </View>
    );
  };

  const _body = item => {
    return (
      <View style={{width: '100%', marginTop: 10}}>
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
            html: language === 'ar' ? item.arabic_answer : item.answer,
          }}
        />
        {/* <CustomText
          style={{
            color: 'rgba(60, 60, 67, 0.85)',
            fontSize: 14,
            fontFamily: Fonts.regular1,
          }}>
          {item.answer}
        </CustomText> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFBFF'}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={languageString.faq}
        />
        <View style={{flex: 1, padding: 20}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Background />
            </View>
            <View style={{width: '100%', marginTop: 10}}>
              <CustomText
                style={{color: '#000', fontSize: 18, fontFamily: Fonts.bold1}}>
                {languageString.frequentlyAskedQuestions}
              </CustomText>
              <View style={{width: '100%'}}>
                <AccordionList
                  list={questionList}
                  header={_head}
                  body={_body}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FAQ;
