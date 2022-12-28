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
import {FilterModal} from '../../Components';
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
const MygroupsCard = ({icon, label, value, onPress, color, status}) => {
  const [status1, setStatus1] = useState('');
  useEffect(() => {
    if (status == 1) {
      setStatus1('Tuyển Member');
    } else if (status == 2) {
      setStatus1('Tuyển Mentor');
    } else if (status == 3) {
      setStatus1('Đã Hoạt Động');
    } else {
      setStatus1('Waitting');
    }
  }, []);
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
          <View style={{flexShrink: 1}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.gray70,
                fontWeight: '300',
                justifyContent: 'space-between',
              }}>
              {value}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.h5,
                color:
                  status == 1
                    ? COLORS.primary3
                    : status == 2
                    ? COLORS.primary
                    : COLORS.primary2,
                fontWeight: '400',
                // marginRight: 20,
              }}>
              {status1}
            </Text>
          </View>
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
const Mygroup = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.Reducers.userDetail);
  const mygroups = useRef();
  const data = useRef();
  const is_mentor = useRef(0);
  const accepted = useRef(1);
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState(true);
  const [title, setTitle] = useState('');
  const [update, setUpdate] = useState(false);
  const token = useSelector(state => state.Reducers.authToken);
  const filterSharevalue1 = useSharedValue(SIZES.height);
  const filterSharevalue2 = useSharedValue(SIZES.height);
  async function Mygroups(is_mentor1, accepted1) {
    await fetch(
      `${BASE_URL}/user/groups?is_mentor=${is_mentor1}&accepted=${accepted1}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(response.status);
          return response.json();
        }
      })
      .then(response => {
        // console.log(response.data.data);
        mygroups.current = response.data.data;
        // console.log(mygroups.current);
      })
      .catch(error => {
        console.log(error);
      });
    if (mygroups.current) {
      setLoading(false);
    }
  }
  async function Waitting(is_mentor1, accepted1) {
    await fetch(
      `${BASE_URL}/user/groups?status=${is_mentor1}&accepted=${accepted1}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(response.status);
          return response.json();
        }
      })
      .then(response => {
        // console.log(response.data.data);
        mygroups.current = response.data.data;
        // console.log(mygroups.current);
      })
      .catch(error => {
        console.log(error);
      });
    if (mygroups.current) {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (choose) {
      Mygroups(is_mentor.current, accepted.current);
    } else {
      Waitting(is_mentor.current, accepted.current);
    }
  }, [mygroups.current, update]);
  const Updatelist = () => {
    setUpdate(!update);
    setLoading(true);
  };
  const chooseGroups = (is_mentor1, accepted1, label) => {
    is_mentor.current = is_mentor1;
    accepted.current = accepted1;
    setTitle(label);
    setChoose(true);
    setUpdate(!update);
    setLoading(true);
  };
  const chooseWaitting = (status, is_creator, label) => {
    is_mentor.current = status;
    accepted.current = is_creator;
    setTitle(label);
    setChoose(false);
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
  async function fetchDetailGroups(id) {
    await fetch(`${BASE_URL}/groups/${id}`, {
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
        data.current = response.data;
        // console.log(response);
        return response.data.group;
      })
      .catch(error => {
        console.log(error);
      });
    // console.log(data.current);
    if (
      data.current.myAnswers.length != 0 ||
      (data.current.group?.is_creator == true &&
        data.current.group?.status != 0)
    ) {
      if (data.current.group?.status == 3) {
        navigation.navigate('GroupDetail', {
          selectedGroup: data.current.group,
          token: token,
        });
      } else if (data.current.group?.status == 2) {
        console.log(data.current.group?.answers);
        navigation.navigate('JoinMentor', {
          selectedGroup: data.current,
          token: token,
          Updatelist,
        });
      } else {
        // console.log(user?.id);
        // console.log(
        //   data.current.group?.membersAccepted.find(ele => ele?.id == user?.id),
        // );
        if (
          data.current.group?.is_creator == true ||
          data.current.group?.membersAccepted.find(
            ele => ele?.id == user?.id,
          ) != undefined
        ) {
          navigation.navigate('Groupmember', {
            selectedGroup: data.current,
            token: token,
            Updatelist,
          });
        } else {
          navigation.navigate('Joingroup', {
            selectedGroup: data.current,
            token: token,
            Updatelist,
          });
        }
      }
    } else {
      if (data.current.group.status == 0) {
        navigation.navigate('Creatgroup', {
          selectedGroup: data.current.group,
          Updatelist,
        });
      } else {
        navigation.navigate('Joingroup', {
          selectedGroup: data.current,
          token: token,
          Updatelist,
        });
      }
    }
    setLoading(false);
    data.current = [];
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
            <IconButton
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              containerStyle={{
                position: 'absolute',
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
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                ...FONTS.h2,
                color: COLORS.primary3,
                alignItems: 'center',
                fontStyle: 'italic',
                marginLeft: 48,
              }}>
              {title}
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
          {mygroups.current?.map((item, index) => {
            return (
              <View
                style={styles.notifiContainer}
                key={`Notification -${index}`}>
                <MygroupsCard
                  icon={icons.mentor}
                  label={`${item?.subject}`}
                  value={item?.topic}
                  color={null}
                  status={item?.status}
                  onPress={() => {
                    fetchDetailGroups(item?.id);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <FilterModal
        filterSharevalue1={filterSharevalue1}
        filterSharevalue2={filterSharevalue2}
        height={SIZES.height}
        bottom={0}
        chooseGroups={chooseGroups}
        chooseWaitting={chooseWaitting}
      />
    </View>
  );
};

export default Mygroup;
const styles = StyleSheet.create({
  notifiContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray50,
  },
});
