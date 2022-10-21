import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import IconLabel from './IconLabel';
const HorizontalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,
      }}>
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={icons.favourite}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: course.is_favourite
              ? COLORS.secondary
              : COLORS.additionalColor4,
            marginRight: 460,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 18,
          }}>
          {course.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default HorizontalCourseCard;
