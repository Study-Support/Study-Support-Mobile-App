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
} from '../../Components';
import {useNavigation} from '@react-navigation/native';
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
} from '../../constants';
import {useRef, useState, useEffect} from 'react';
import BASE_URL from '../../config';
import {Provider, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
const MymentorsCard = ({icon, label, value, onPress, color, status}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        textAlign: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: COLORS.additionalColor11,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 45,
            height: 45,
            tintColor: color,
          }}
        />
      </View>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.gray70,
              fontWeight: '300',
            }}>
            {value}
          </Text>

          <Text
            style={{
              ...FONTS.h4,
              color: status == 'Waiting' ? COLORS.primary2 : COLORS.primary,
              fontWeight: '400',
              marginRight: 20,
            }}>
            {status}
          </Text>
        </View>
      </View>
      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
        }}
      />
    </TouchableOpacity>
  );
};
const Mymentor = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.Reducers.userDetail);
  const mygroups = useRef();
  const data = useRef();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const token = useSelector(state => state.Reducers.authToken);
  useEffect(() => {
    async function fetchData() {
      await fetch(`${BASE_URL}/mentor`, {
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
          console.log(response);
          mygroups.current = response.data.data;
          console.log(mygroups.current);
        })
        .catch(error => {
          console.log(error);
        });
      if (mygroups.current) {
        setLoading(false);
      }
    }
    fetchData();
  }, [mygroups.current, update]);
  const Updatelist = () => {
    setUpdate(!update);
    setLoading(true);
  };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View
      style={[
        {
          flex: 1,
          height: SIZES.height,
          width: SIZES.width,
          // backgroundColor: COLORS.transparentBlack7,
        },
      ]}>
      <View
        style={[
          {
            position: 'relative',
            bottom: 0,
            height: SIZES.height,
            width: SIZES.width,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white,
            textAlign: 'center',
          },
        ]}>
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            //   alignItems:'center',
            // justifyContent: 'space-between',
            //   backgroundColor:'red',
            height: 30,
          }}>
          <View
            style={{
              flex: 1,
              // width: 140,
              // height:60,
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                ...FONTS.h2,
                color: COLORS.primary3,
                alignItems: 'center',
                fontStyle: 'italic',
              }}>
              My Mentors
            </Text>
          </View>
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
              Updatelist();
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
          {mygroups.current.subjects?.map((item, index) => {
            return (
              <View
                style={styles.notifiContainer}
                key={`Notification -${index}`}>
                <MymentorsCard
                  icon={icons.mentor}
                  label={`${item?.name}`}
                  value={item?.cv_link}
                  color={null}
                  status={item?.active == 0 ? 'Waiting' : 'Accepted'}
                  onPress={() => {
                    // fetchDetailGroups(item);
                    // if (item?.active == 0) {
                    navigation.navigate('CreatMentor', {
                      selectedGroup: item,
                      bank: mygroups.current?.bank,
                      Updatelist,
                    });
                    // }
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Mymentor;
const styles = StyleSheet.create({
  notifiContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray50,
  },
});
