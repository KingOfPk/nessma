/* eslint-disable prettier/prettier */
import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../src/screens/auth/SplashScreen';
jest.mock('react-native-indicators', () => ({
    UIActivityIndicator: 'Mocked UIActivityIndicator',
  }));


test('renders correctly', () => {
  const tree = renderer.create(<Intro navigation={undefined} />).toJSON();
  expect(tree).toMatchSnapshot();
});
