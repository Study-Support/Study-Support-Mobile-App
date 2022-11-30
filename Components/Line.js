import React from 'react';
import {View, Text, Image} from 'react-native';
import {FONTS, SIZES, COLORS} from '../constants';

const Line = ({lineStyle}) => {
  return (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: COLORS.gray30,
        ...lineStyle,
      }}
    />
  );
};
export default Line;
