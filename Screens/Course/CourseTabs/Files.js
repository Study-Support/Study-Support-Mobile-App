import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  event,
  withDelay,
  withTiming,
  runOnJS,
  ColorSpace,
} from 'react-native-reanimated';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
  FilterModal,
} from '../../../Components';
import {SharedElement} from 'react-navigation-shared-element';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
  constants,
} from '../../../constants';

const Files = () => {
  function renderMembers() {
    let members = [];
    if (dummyData?.course_details?.students.length > 3) {
      members = dummyData?.course_details?.students.slice(0, 3);
    } else {
      members = dummyData?.course_details?.students;
    }

    return (
      <View>
        <Text
          style={{
            ...FONTS.h2,
            fontSize: 25,
          }}>
          Members
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}>
          {members.map((item, index) => {
            return (
              <View
                key={`Members-${index}`}
                style={{
                  marginLeft: index > 0 ? SIZES.radius : 0,
                }}>
                <Image
                  source={item?.thumbnail}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
            );
          })}
          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h2,
              }}
              contentContainerStyle={{
                marginLeft: SIZES.padding,
                backgroundColor: 'transparent',
              }}
            />
          )}
        </View>
      </View>
    );
  }
  function renderFiles() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text style={{...FONTS.h2, fontSize: 25}}>Files</Text>
        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{
                flexDirection: 'row',
                marginTop: SIZES.radius,
              }}>
              <Image
                source={item?.thumbnail}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}>
                <Text style={{...FONTS.h2}}>{item?.name}</Text>
                <Text style={{...FONTS.body3, color: COLORS.gray30}}>
                  {item?.author}
                </Text>
                <Text style={{...FONTS.body4}}>{item?.upload_date}</Text>
              </View>
              <IconButton
                icon={icons.menu}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}>
      {renderMembers()}
      {renderFiles()}
    </ScrollView>
  );
};
export default Files;
