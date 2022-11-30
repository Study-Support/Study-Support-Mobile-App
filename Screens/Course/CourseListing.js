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
} from '../../Components';
import {SharedElement} from 'react-navigation-shared-element';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {transform} from '@babel/core';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = 250;
const CourseListing = ({navigation, route}) => {
  //   console.log(route);
  const {category, sharedElementPrefix} = route.params;
  const flatListRef = React.useRef();
  const scrollY = useSharedValue(80);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerSharValue = useSharedValue(80);
  function backHandler() {
    navigation.goBack();
  }
  const filterSharevalue1 = useSharedValue(SIZES.height);
  const filterSharevalue2 = useSharedValue(SIZES.height);
  const headerAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(headerSharValue.value, [80, 0], [0, 1]),
    };
  });
  const headerTranslate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: headerSharValue.value,
        },
      ],
    };
  });
  function RenderHeader() {
    const inputRange = [0, HEADER_HEIGHT - 50];
    headerSharValue.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
      }),
    );
    const headerHeightAnimated = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [HEADER_HEIGHT, 120],
          Extrapolate.CLAMP,
        ),
      };
    });
    const headerHide = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });
    const headerShow = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: 'hidden',
            // justifyContent: 'center',
          },
          headerHeightAnimated,
        ]}>
        <SharedElement
          id={`${sharedElementPrefix}-Category-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFill]}>
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -80,
              right: 0,
              left: 0,
            },
            headerShow,
          ]}>
          <Text
            style={{
              // position: 'absolute',
              textAlign: 'center',
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            {category?.title}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 70,
              left: 30,
            },
            headerHide,
          ]}>
          <SharedElement
            id={`${sharedElementPrefix}-Category-Title-${category?.id}`}
            style={[StyleSheet.absoluteFill]}>
            <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                ...FONTS.h1,
              }}>
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>
        <Animated.View>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value <= 200) {
                flatListRef.current?.scrollToOffset({
                  offSet: 0,
                  animated: true,
                });
                setTimeout(() => {
                  headerSharValue.value = withTiming(
                    80,
                    {
                      duration: 500,
                    },
                    () => {
                      runOnJS(backHandler())();
                    },
                  );
                }, 100);
              } else {
                backHandler();
              }

              // backHandler();
            }}
          />
        </Animated.View>

        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerAnimated,
            headerTranslate,
            headerHide,
          ]}
        />
      </Animated.View>
    );
  }
  function renderResults() {
    return (
      <AnimatedFlatList
        ref={flatListRef}
        data={dummyData.courses_list_2}
        keyExtractor={item => `Results-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 270,
              marginBottom: SIZES.base,
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
                color:COLORS.black,
                fontStyle:'italic',
              }}>
              28 Results
            </Text>
            <IconButton
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              containerStyle={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                filterSharevalue1.value = withTiming(0, {duration: 100});
                filterSharevalue2.value = withTiming(0, {duration: 500});
              }}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index === 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() =>
              navigation.navigate('GroupDetail', {selectedGroup: item})
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <Line
            lineStyle={{
              backgroundColor: COLORS.gray20,
            }}
          />
        )}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderResults()}
      {RenderHeader()}
      {/* {renderResults()} */}
      <FilterModal
        filterSharevalue1={filterSharevalue1}
        filterSharevalue2={filterSharevalue2}
        height={SIZES.height}
        bottom={0}
      />
    </View>
  );
};
CourseListing.sharedElements = (route, otherRoute, Showing) => {
  const {category, sharedElementPrefix} = route.params;
  return (
    {
      id: `${sharedElementPrefix}-Category-Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-Category-Title-${category?.id}`,
    }
  );
};

export default CourseListing;
