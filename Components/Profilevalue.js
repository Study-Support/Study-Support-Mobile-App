import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';
const Profilevalue = ({icon, label, value, onPress, color}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: COLORS.additionalColor11,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: color,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {label && (
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.h3,
            }}>
            {label}
          </Text>
        )}
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            fontWeight: 'bold',
          }}>
          {value}
        </Text>
      </View>
      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
        }}
      />
    </TouchableOpacity>
  );
};
export default Profilevalue;
