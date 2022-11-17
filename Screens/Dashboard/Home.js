import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  event,
  withTiming,
} from 'react-native-reanimated';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {FONTS, SIZES, icons, images, dummyData, COLORS} from '../../constants';

const Section = ({containerStyle, title, onPress, children}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
            color: COLORS.black,
          }}>
          {title}
        </Text>
        <TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            // marginLeft: 20
          }}
          label="See All"
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

const Home = () => {
  const filterSharevalue1 = useSharedValue(SIZES.height);
  const filterSharevalue2 = useSharedValue(SIZES.height);
  const navigation = useNavigation();
  const ScrollViewRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const inputRange = [0, 100];
  const headerAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [55, 0],
        Extrapolate.CLAMP,
      ),
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });
  function renderHeader() {
    // const inputRange = [0, 55];
    // const headerAnimated = useAnimatedStyle(() => {
    //   return {
    //     height: interpolate(
    //       scrollY.valueOf,
    //       inputRange,
    //       [55, 0],
    //       Extrapolate.CLAMP,
    //     ),
    //   };
    // });
    return (
      <Animated.View
        // style={
        //   ({
        //     flexDirection: 'row',
        //     marginTop: 2,
        //     marginBottom: 2,
        //     paddingHorizontal: SIZES.padding,
        //     alignItems: 'center',
        //     backgroundColor: 'red',
        //     width: '100%',
        //     height: 55,
        //   },
        //   headerAnimated)
        // }
        style={[
          {
            flexDirection: 'row',
            marginTop: 2,
            marginBottom: 2,
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
            // backgroundColor: 't',
            width: '100%',
            height: 55,
          },
          headerAnimated,
        ]}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>
            Hello, NhatQuang!
          </Text>
          <Text
            style={{color: COLORS.black, ...FONTS.body3, fontStyle: 'italic'}}>
            ThursDay, 19th Sept 2022
          </Text>
        </View>
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
            padding: 10,
          }}
          onPress={() => {
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />
      </Animated.View>
    );
  }
  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'center',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
          marginTop: -2,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}>
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body2,
            }}>
            HOW TO
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.body4,
            }}>
            By NhatQuang
          </Text>
        </View>
        <Image
          source={images.start_learning}
          style={{
            width: '100%',
            height: 100,
            marginTop: SIZES.padding,
          }}
        />
        <TextButton
          label="Find Your Subject"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{
            color: COLORS.black,
          }}
        />
      </ImageBackground>
    );
  }
  function renderCourse() {
    return (
      <Section
        title="Recommend Subject"
        containerStyle={{
          marginTop: 10,
        }}>
        <FlatList
          horizontal
          data={dummyData.courses_list_1}
          listKey="Course"
          keyExtractor={item => `Course-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          renderItem={({item, index}) => (
            <VerticalCourseCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.courses_list_1.length - 1
                    ? SIZES.padding
                    : 0,
              }}
              course={item}
            />
          )}
        />
      </Section>
    );
  }
  function renderCategories() {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={item => `Categories-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <CategoryCard
              sharedElementPrefix="Home"
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Home',
                })
              }
            />
          )}
        />
      </Section>
    );
  }
  function renderPopularCourse() {
    return (
      <Section
        title="Top Mentor"
        containerStyle={{
          flex: 1,
          width: '120%',
          marginTop: 20,
          // backgroundColor: 'red',
        }}>
        <FlatList
          data={dummyData.courses_list_2}
          listKey="Popular Course"
          scrollEnabled={false}
          keyExtractor={item => `PopularCourse-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({item, index}) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
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
      </Section>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <Animated.ScrollView
        style={{
          paddingBottom: 150,
        }}
        ref={ScrollViewRef}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        // onScrollEndDrag
        showsVerticalScrollIndicator={false}>
        {renderStartLearning()}
        {renderCourse()}
        <Line
          lineStyle={{
            marginVertical: SIZES.padding,
          }}
        />
        {renderCategories()}
        <ScrollView horizontal={true} style={{flex: 1, width: '100%'}}>
          {renderPopularCourse()}
        </ScrollView>
      </Animated.ScrollView>
      <FilterModal
        filterSharevalue1={filterSharevalue1}
        filterSharevalue2={filterSharevalue2}
        height={SIZES.height}
        bottom={0}
      />
    </View>
  );
};
export default Home;
