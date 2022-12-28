import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants';
const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
        alignItems: 'center',
        // backgroundColor: 'red',
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};
export default IconButton;
