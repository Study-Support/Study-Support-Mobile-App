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
// import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
  FilterNotifacations,
} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {FONTS, SIZES, icons, images, dummyData, COLORS} from '../../constants';
import {Provider, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import BASE_URL from '../../config';
import {Logout} from '../../store/actions';
const Section = ({containerStyle, title, onPress, children}) => {
  return (
    <View
      style={{
        ...containerStyle,
        // backgroundColor: 'red',
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
  const [mentors, setMentors] = useState([]);
  const [groupmember, setGroupMember] = useState([]);
  const [groupMentor, setGroupMentor] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.Reducers.userDetail);
  const token = useSelector(state => state.Reducers.authToken);
  // console.log(user);
  useEffect(() => {
    async function fetchData() {
      let mentor = [];
      let groupfindmember = [];
      let groupfindMentor = [];
      let notification = [];
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
          setGroupMember(groupfindmember);
        })
        .catch(error => {
          console.log(error);
        });
      await fetch(`${BASE_URL}/groups?type=2`, {
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
          // console.log(response.data.data);
          response.data.data.forEach(item => {
            // console.log(item);
            groupfindMentor.push(item);
            // console.log(mentors);
          });
          setGroupMentor(groupfindMentor);
        })
        .catch(error => {
          console.log(error);
        });
      await fetch(`${BASE_URL}/mentors`, {
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
            console.log(response.data);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.data.data);
          response.data.data.forEach(item => {
            // console.log(item);
            mentor.push(item);
            // console.log(mentors);
          });
          setMentors(mentor);
        })
        .catch(error => {
          console.log(error);
        });

      fetch(`${BASE_URL}/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            // console.log(response);
            return response.json();
          }
        })
        .then(response => {
          notification = response.data.data;
          setNotification(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (user != null) {
      setLoading(false);
    }
    fetchData();
  }, [user]);
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
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
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
            Hello, {user.full_name}!
          </Text>
          <Text
            style={{color: COLORS.black, ...FONTS.body3, fontStyle: 'italic'}}>
            {Date().slice(0, 15)}
          </Text>
        </View>
        <IconButton
          icon={icons.notification}
          containerStyle={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: COLORS.gray10,
          }}
          iconStyle={{
            width: 30,
            height: 30,
            tintColor: null,
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
          // marginTop: SIZES.padding,
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
            Chào {user.full_name}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Bạn Đang Gặp Khó Khắn Với Môn Học Nào Tại Trường ?
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TextButton
            label="Đăng Ký Group"
            contentContainerStyle={{
              height: 40,
              paddingHorizontal: SIZES.padding,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            labelStyle={{
              color: COLORS.black,
            }}
            onPress={() =>
              navigation.navigate('Creatgroup', {
                selectedGroup: [],
              })
            }
          />

          <TextButton
            label="Đăng Ký Mentor"
            contentContainerStyle={{
              height: 40,
              paddingHorizontal: SIZES.padding,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            labelStyle={{
              color: COLORS.black,
            }}
            onPress={() =>
              navigation.navigate('CreatMentor', {
                selectedGroup: [],
              })
            }
          />
        </View>
      </ImageBackground>
    );
  }
  function renderCourse() {
    return (
      <Section
        title="Groups Find Member"
        containerStyle={{
          marginTop: 10,
          flex: 1,
        }}>
        <FlatList
          horizontal
          data={groupmember}
          listKey="GroupsMember"
          keyExtractor={item => `GroupsMember-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          renderItem={({item, index}) => (
            <VerticalCourseCard
              sharedElementPrefix="Home"
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight: index == mentors?.length - 1 ? SIZES.padding : 0,
              }}
              course={item}
              // list={mentors}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Home',
                  list: groupmember,
                  token: token,
                  user: user,
                  topic: 'Member',
                })
              }
            />
          )}
        />
      </Section>
    );
  }
  function renderCategories() {
    return (
      <Section title="Top Mentor">
        <FlatList
          horizontal
          data={mentors}
          listKey="Mentors"
          // keyExtractor={item => `Mentors-${item.id}`}
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
                marginRight: index == mentors?.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() =>
                navigation.navigate('Mentorlist', {
                  category: item,
                  sharedElementPrefix: 'Home',
                  list: mentors,
                  token: token,
                  topic: 'Top Mentors',
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
        title="Groups Find Mentor"
        // scrollEnabled={false}
        containerStyle={{
          // flex: 1,
          width: '100%',
          marginTop: 50,
          // backgroundColor: 'red',
          bottom: 30,
        }}>
        <FlatList
          data={groupMentor}
          listKey="Mentors"
          scrollEnabled={false}
          keyExtractor={item => `Mentors-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginRight: -20,
          }}
          renderItem={({item, index}) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
              }}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Home',
                  list: groupMentor,
                  token: token,
                  topic: 'Mentor',
                })
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
      <FilterNotifacations
        filterSharevalue1={filterSharevalue1}
        filterSharevalue2={filterSharevalue2}
        height={SIZES.height + 50}
        bottom={0}
        notification={notification}
      />
    </View>
  );
};
export default Home;
