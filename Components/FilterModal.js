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
  color,
} from 'react-native-reanimated';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
} from '../Components';
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
} from '../constants';
const ClassTypeOption = ({containerStyle, classType, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />
      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}>
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};
const FilterModal = ({
  filterSharevalue1,
  filterSharevalue2,
  height,
  bottom,
}) => {
  const [classType, setclassType] = React.useState('');
  const filterModalContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue1.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue1.value,
        },
      ],
    };
  });
  const filterModalBg = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [SIZES.height, 0], [0, 1]),
    };
  });
  const filterModalContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue2.value,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
          //   backgroundColor: '#FFF',
        },
        filterModalContainer,
      ]}>
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBg,
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: bottom,
              height: height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: COLORS.white,
            },
            filterModalContent,
          ]}>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding,
              //   alignItems:'flex-end',
              justifyContent: 'space-between',
              //   backgroundColor:'red',
              height: 30,
            }}>
            <View
              style={{
                width: 60,
                // height:60,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  ...FONTS.h2,
                  color: COLORS.black,
                  alignItems: 'center',
                }}>
                Filter
              </Text>
            </View>
            <TextButton
              label="Cancel"
              contentContainerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.body3,
              }}
              onPress={() => {
                filterSharevalue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                filterSharevalue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, {duration: 100}),
                );
              }}
            />
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}>
            <View
              style={{
                marginTop: SIZES.radius,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.black,
                  fontWeight: 'bold',
                }}>
                Class Type
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                }}>
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={`ClassType-${index}`}
                      classType={item}
                      isSelected={classType == item?.id}
                      containerStyle={{
                        marginLeft: index == 0 ? 0 : SIZES.base,
                      }}
                      onPress={() => {
                        setclassType(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterModal;
