import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ImageBackground,
  Animated,
  Keyboard,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import IconLabel from './IconLabel';
const HorizontalCourseCard = ({containerStyle, course, onPress}) => {
  console.log(course);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,
      }}
      onPress={onPress}>
      <ImageBackground
        source={
          course?.image_url != null
            ? {uri: course?.image_url}
            : images.thumbnail_1
        }
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
          flex: 1,
          marginLeft: SIZES.base,
          // backgroundColor: 'red',
          // justifyContent: 'flex-start',
        }}>
        <View
          style={{
            borderColor: COLORS.primary,
            borderWidth: 1,
            // flex: 1,
            padding: SIZES.base,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              // flex: 1,
            }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary3,
              }}>
              Topic
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.primary3,
                paddingHorizontal: 5,
              }}>
              {course.topic}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              // marginTop: 8,
              paddingRight: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // marginTop: SIZES.base,
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary3,
                }}>
                Môn
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary3,
                  // paddingHorizontal: 5,
                }}>
                {course.subject}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <IconLabel
              icon={icons.address}
              label={`Địa điểm: ${course.location_study}`}
              containerStyle={{
                marginRight: SIZES.radius,
              }}
              iconStyle={{
                width: 18,
                height: 18,
                tintColor: COLORS.primary3,
              }}
              labelStyle={{
                ...FONTS.h4,
                color: COLORS.primary3,
              }}
            />
            <IconLabel
              icon={icons.profile}
              label={`Member: ${course.quantity}`}
              containerStyle={
                {
                  // marginLeft: SIZES.base,
                }
              }
              iconStyle={{
                width: 15,
                height: 15,
                tintColor: COLORS.primary3,
              }}
              labelStyle={{marginLeft: 5, color: COLORS.black, ...FONTS.h3}}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default HorizontalCourseCard;
