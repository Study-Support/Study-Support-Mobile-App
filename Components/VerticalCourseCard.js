import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import IconLabel from './IconLabel';
import {useNavigation} from '@react-navigation/native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  event,
  withTiming,
} from 'react-native-reanimated';
import {
  Line,
  IconButton,
  TextButton,
  Profilevalue,
  FilterUpdate,
  FilterUpdatePass,
} from '../Components';
const VerticalCourseCard = ({containerStyle, course, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 270,
        ...containerStyle,
        paddingBottom: 9,
      }}
      onPress={onPress}>
      <Image
        source={
          course?.image_url != null
            ? {uri: course?.image_url}
            : images.giaitich1
        }
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
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={icons.mentor}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
            containerStyle={{
              alignItems: 'center',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            // flexShrink: 1,
            paddingHorizontal: SIZES.radius,
            // backgroundColor: 'red',
            // flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h4,
                fontSize: 14,
                color: COLORS.black,
              }}>
              {course.subject?.length > 20
                ? course?.subject.slice(0, 20)
                : course.subject}
              ...
            </Text>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 12,
                color: COLORS.black,
              }}>
              Khoa: {course.faculty}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.radius,
          }}>
          <View>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 12,
                color: COLORS.black,
              }}>
              Thành Viên: {course.quantity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <IconLabel
                icon={icons.address}
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h4,
                  fontSize: 12,
                  color: COLORS.black,
                }}>
                {course.location_study}
              </Text>
            </View>
          </View>
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // marginLeft: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary3,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            Topic:
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary3,
              paddingHorizontal: 5,
              textAlign: 'center',
              justifyContent: 'flex-start',
              marginLeft: 0,
            }}>
            {course.topic}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default VerticalCourseCard;
