import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const LoadingPlaceHolder = () => {
  return (
    <View style={{width: '100%', padding: 10}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          alignItems="center">
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          alignItems="center">
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          alignItems="center">
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          alignItems="center">
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default LoadingPlaceHolder;
