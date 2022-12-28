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
const NotificatonCard = ({icon, label, value, onPress, color}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        padding: SIZES.padding,
      }}
      onPress={onPress}>
      {/* <View
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
      </View> */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {label && (
          <Text
            style={{
              color: COLORS.primary3,
              ...FONTS.h2,
              textAlign: 'center',
            }}>
            {label}
          </Text>
        )}
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.gray70,
            fontWeight: '400',
          }}>
          {value}
        </Text>
      </View>
      <Image
        source={icons.drawing}
        style={{
          width: 15,
          height: 15,
        }}
      />
    </TouchableOpacity>
  );
};
const FilterNotifacations = ({
  filterSharevalue1,
  filterSharevalue2,
  height,
  bottom,
  notification,
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
                width: 140,
                // height:60,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  ...FONTS.h2,
                  color: COLORS.primary3,
                  alignItems: 'center',
                }}>
                Notifacations
              </Text>
            </View>
            <IconButton
              icon={icons.xoa}
              containerStyle={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              iconStyle={{
                width: 40,
                height: 40,
                tintColor: null,
                borderRadius: 20,
                borderColor: 'red',
                borderWidth: 7,
                marginBottom: 15,
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
          <Line
            lineStyle={{
              width: '92%',
              marginLeft: 15,
              marginTop: 12,
              backgroundColor: COLORS.primary,
            }}
          />
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
              // flex: 1,
              // backgroundColor: 'red',
            }}>
            {notification.map((item, index) => {
              return (
                <View
                  style={styles.notifiContainer}
                  key={`Notification -${index}`}>
                  <NotificatonCard
                    icon={icons.checked}
                    label={`${item?.title}`}
                    value={item?.content}
                    color={COLORS.primary}
                  />
                  {/* <Line /> */}
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterNotifacations;
const styles = StyleSheet.create({
  notifiContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray50,
  },
});
