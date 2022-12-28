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
import {ActivityIndicator} from 'react-native-paper';
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
import {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import BASE_URL from '../../config';
import HorizontalMentor from '../../Components/HorizontalMentor';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = 250;
const Mentorlist = ({navigation, route}) => {
  const {category, sharedElementPrefix, list, token, user, topic} =
    route.params;
  let list1 = [];
  const data = useRef();
  const flatListRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const scrollY = useSharedValue(80);
  list1 = list;
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerSharValue = useSharedValue(80);
  const Updatelist = () => {
    async function fetchData() {
      let groupfindmember = [];
      await fetch(`${BASE_URL}/groups?type=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data);
            return response.json();
          } else {
            // console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          // console.log(response.data.data);
          response.data.data.forEach(item => {
            // console.log(item);
            groupfindmember.push(item);
            // console.log(mentors);
          });
          list1 = groupfindmember;
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    }
  };
  function backHandler() {
    navigation.goBack();
  }
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
  async function fetchDetailMentor(id) {
    console.log(id);
    await fetch(`${BASE_URL}/mentors/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          return response.json();
        } else {
          console.log(response.status);
          return response.json();
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
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
            // backgroundColor: 'red',
            // justifyContent: 'center',
          },
          headerHeightAnimated,
        ]}>
        <SharedElement
          id={`${sharedElementPrefix}-Category-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFill]}>
          <Image
            source={images.Education3}
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
              // backgroundColor: 'red',
            },
            headerShow,
          ]}>
          <Text
            style={{
              // position: 'absolute',
              textAlign: 'center',
              color: COLORS.black,
              ...FONTS.h2,
            }}>
            {topic}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 70,
              left: 30,
              // backgroundColor: 'red',
            },
            headerHide,
          ]}>
          <SharedElement
            id={`${sharedElementPrefix}-Category-Title-${category?.id}`}
            style={[StyleSheet.absoluteFill]}>
            <Text
              style={{
                position: 'absolute',
                color: COLORS.back,
                ...FONTS.h1,
              }}>
              {topic}
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
              top: 20,
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
          source={icons.mentor}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -80,
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
        data={list1}
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
              marginTop: 260,
              marginBottom: SIZES.base,
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.body2,
                color: COLORS.primary3,
                // fontStyle:'italic',
              }}>
              {/* {console.log(list.length)} */}
              Result {list1?.length}
            </Text>
            <IconButton
              icon={icons.refresh}
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
                marginBottom: 15,
              }}
              onPress={() => {
                setLoading(true);
                Updatelist();
              }}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <HorizontalMentor
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index === 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() => {
              // setLoading(true);
              // fetchDetailMentor(item?.id);
              navigation.navigate('ProfileMentor', item?.id);
            }}
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
    </View>
  );
};

export default Mentorlist;
