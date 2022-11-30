import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import IconLabel from './IconLabel';
const VerticalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity
      style={{
        width: 270,
        ...containerStyle,
        paddingBottom: 9,
      }}>
      <Image
        source={course.thumbnail}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={icons.mentor}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          />
          <View style={{ flexDirection: 'row'}}>
            <IconLabel
              icon={icons.star}
              label={course.ratings}
              containerStyle={{
                marginLeft: SIZES.base,
                marginTop: 2,
              }}
              iconStyle={{
                width: 15,
                height: 15,
                tintColor: COLORS.primary2,
              }}
              labelStyle={{marginLeft: 5, color: COLORS.black, ...FONTS.h3}}
            />
            <Text style={{marginTop: 3}}>{course.rating}</Text>
          </View>
        </View>
        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: SIZES.radius,
          }}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 18,
              color: COLORS.black,
            }}>
            {course.title}
          </Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{
              marginTop: SIZES.base,
            }}
          />
        </View>

        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: SIZES.radius,
          }}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 14,
              color: COLORS.black,
            }}>
            Thành Viên: {course.thanhvien}
          </Text>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 14,
              color: COLORS.black,
            }}>
            Mentor: {course.mentor}
          </Text>
          {/* <Image
            source={icons.join}
            resizeMode="contain"
            // label={course.duration}
            style={{
              marginTop: SIZES.base,
              width: 30,
              height: 30,
            }}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default VerticalCourseCard;
