import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Fonts} from './theme';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  borderedButton: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderColor: '#008183',
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  borderedButtonText: {
    fontSize: 12,
    color: '#4F4F4F',
    fontFamily: Fonts.bold1,
    marginLeft: 5,
  },
  exampleContainer: {
    paddingVertical: 30,
    width: '100%',
  },
  exampleContainerDark: {
    backgroundColor: '#000',
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: '#000',
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: '#161B1D',
    fontFamily: Fonts.regular1,
    marginLeft: 5,
  },
  inputBox: {
    width: '100%',
    height: 50,
    backgroundColor: '#F3F4F7',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#0E1618',
    fontFamily: Fonts.regular1,

    justifyContent: 'center',
  },
  headingText: {
    color: '#161B1D',
    fontSize: 18,
    fontFamily: Fonts.bold1,
  },
  content: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  view: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
