import React from 'react';
import {Text} from 'react-native';

export const CustomText = ({children, style, onPress, numberOfLines}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      allowFontScaling={false}
      style={style}>
      {children}
    </Text>
  );
};
