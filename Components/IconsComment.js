import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FONTS, SIZES, COLORS} from '../constants';

const IconsComment = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.gray30,
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
    </TouchableOpacity>
  );
};
export default IconsComment;
