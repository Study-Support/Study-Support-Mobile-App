import React from 'react';
import {View, Text, Image} from 'react-native';
import {FONTS, SIZES, COLORS} from '../constants';

const IconLabel = ({containerStyle, icon, iconStyle, label, labelStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.primary,
          ...iconStyle,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          color: COLORS.gray60,
          ...FONTS.body3,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </View>
  );
};
export default IconLabel;
