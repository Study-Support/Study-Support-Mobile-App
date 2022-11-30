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

const Chapters = () => {
  // function renderChapters(){
  //     return (

  //     );
  // }
  function renderHeader() {
    return (
      <View
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          // backgroundColor: 'blue',
        }}>
        <Text style={{...FONTS.h2, color: COLORS.black}}>
          {dummyData?.course_details?.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: SIZES.base,
            paddingHorizontal: 1,
          }}>
          <IconLabel
            icon={icons.profile}
            // label={dummyData?.course_details?.duration}
            containerStyle={
              {
                // marginLeft: SIZES.radius,
              }
            }
            iconStyle={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{
              color: COLORS.gray80,
              ...FONTS.body4,
            }}>
            Thành viên:
            {dummyData?.course_details?.number_of_students}
          </Text>
          <IconLabel
            icon={icons.time}
            label={dummyData?.course_details?.duration}
            containerStyle={{
              marginLeft: SIZES.radius,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
            labelStyle={{
              ...FONTS.h4,
              color: COLORS.gray80,
            }}
          />
          <IconLabel
            icon={icons.address}
            label={dummyData?.course_details?.location}
            containerStyle={{
              marginLeft: 75,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
            labelStyle={{
              ...FONTS.h4,
              color: COLORS.gray90,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}>
          <Image
            source={images.profile}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h3, fontSize: 18}}>
              {dummyData?.course_details?.instructor?.name}
            </Text>
            <Text style={{...FONTS.body3}}>
              {dummyData?.course_details?.instructor?.title}
            </Text>
          </View>
          <TextButton
            label="View"
            contentContainerStyle={{
              width: 80,
              height: 35,
              borderRadius: 30,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.black,
            }}
          />
        </View>
        <Line
          lineStyle={{
            height: 2,
            marginVertical: SIZES.base,
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      {renderHeader()}
      {/* {renderChapters()} */}
    </ScrollView>
  );
};
export default Chapters;
