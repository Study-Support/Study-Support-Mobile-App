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

import {useNavigation} from '@react-navigation/native';
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
  Keyboard,
  TextInput,
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
import {ActivityIndicator} from 'react-native-paper';
import BASE_URL from '../../config';
import {useEffect, useRef, useState} from 'react';
import Chapters from '../Course/CourseTabs/Chapters';
import {ScrollView} from 'react-native-gesture-handler';
import {DeleteGroupJoin} from '../../store/actions';
const JoinMentor = ({navigation, route}) => {
  const groups = route.params.selectedGroup;
  // console.log(groups);
  const data = useRef();
  const questions = useRef();
  let ansupdate = [];
  const myanswers = useRef([]);
  data.current = groups?.group;
  myanswers.current = groups?.myAnswers;
  // console.log(myanswers.current);
  const token = route.params?.token;
  const [loading, setLoading] = useState(true);
  const [khokhan, setKhokhan] = React.useState('');
  const [mongmuon, setMongmuon] = React.useState('');
  const [ykien, setYkien] = React.useState('');
  const [button, setButton] = React.useState('Đăng Kí Mentor');
  const [index1, setIndex1] = React.useState('');
  const [index2, setIndex2] = React.useState('');
  const [index3, setIndex3] = React.useState('');
  const [index4, setIndex4] = React.useState('');
  const [index5, setIndex5] = React.useState('');
  // const [state1, dispatch] = React.useReducer(reducer, 0);
  // const reducer = (state, action) => {
  //   console.log(action);
  //   switch (action) {
  //     case '0':
  //       console.log(0);
  //       setIndex1('a');
  //       return state1 + 1;
  //     // case '1':
  //     //   setIndex2(action.payload);
  //     // case '2':
  //     //   setIndex3(action.payload);
  //   }
  // };
  useEffect(() => {
    if (groups.myAnswers?.length != 0) {
      setButton('Cập Nhật');
    } else {
      setButton('Đăng Kí Mentor');
    }
    async function fetchData() {
      await fetch(`${BASE_URL}/mentor-questions`, {
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
            console.log(response);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.data.data);
          questions.current = response.data.data;
        })
        .catch(err => {
          console.log(err + 'NO');
        });
      if (questions.current?.length != 0) {
        setLoading(false);
      }
    }
    fetchData();
  }, [button]);
  if (myanswers.current.length != 0) {
    ansupdate = myanswers.current;
  } else {
    ansupdate = questions.current;
  }
  console.log(ansupdate);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  async function SignUpMentor(id) {
    // console.log(ansupdate);
    if (button == 'Cập Nhật') {
      await fetch(`${BASE_URL}/groups/${id}/join`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: ansupdate,
        }),
      })
        .then(response => {
          if (response.status === 200) {
            alert('Cập Nhật Thành Công');
            return response.json();
          } else {
            console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.meta);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await fetch(`${BASE_URL}/groups/${id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: ansupdate,
        }),
      })
        .then(response => {
          if (response.status === 200) {
            alert('Đăng Kí Làm Mentor Thành Công');
            return response.json();
          } else {
            alert('Đăng Kí Làm Mentor Thất Bại');
            return response.json();
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      ansupdate = [];
    }
  }
  function renderHeaderComponents() {
    return (
      <View
        style={{
          marginTop: -10,
          flexDirection: 'row',
          // backgroundColor: 'red',
          alignContent: 'space-around',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <IconButton
          icon={icons.back}
          iconStyle={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
            // color: COLORS.white,
          }}
          containerStyle={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
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
            }}
            onPress={() => {
              if (myanswers.current?.length != 0) {
                console.log(data.current?.id);
                DeleteGroupJoin(data.current?.id);
                navigation.goBack();
              } else {
                navigation.goBack();
              }
            }}
          />
        </View>
      </View>
    );
  }
  function renderHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: SIZES.height > 800 ? 40 : 20,
          left: 0,
          right: 0,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          zIndex: 1,
        }}>
        {renderHeaderComponents()}
      </View>
    );
  }
  function renderVideoSection() {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.gray90,
        }}>
        <ImageBackground
          source={images.giaitich1}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }
  function renderContent() {
    return (
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            position: 'relative',
            //  backgroundColor: 'blue',
          }}>
          <View
            style={{
              position: 'relative',
              // height: 140,
              width: '100%',
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              // backgroundColor: 'blue',
              flex: 1,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.black}}>
              {data.current?.topic} - {data.current?.subject}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
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
                  ...FONTS.body3,
                }}>
                Thành viên:
                {data.current?.quantity}
              </Text>
              <IconLabel
                icon={icons.address}
                label={data.current?.location_study}
                containerStyle={{
                  marginLeft: 185,
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
                  {data.current?.mentorAccepted?.full_name}
                </Text>
                <Text style={{...FONTS.body3}}>
                  Mentor {data.current?.subject}
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
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor:'red',
          }}>
          <View
            style={{
              width: '100%',
              //   height: 80,
              //   backgroundColor: 'red',
              paddingHorizontal: 8,
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h2, color: COLORS.black}}>
              Thông Tin : {data.current?.information}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              //   height: 50,
              //   backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconLabel
              icon={icons.time}
              label={'Thời Gian :'}
              containerStyle={{
                marginLeft: SIZES.radius,
              }}
              iconStyle={{
                width: 23,
                height: 23,
              }}
              labelStyle={{
                ...FONTS.h4,
                color: COLORS.gray80,
              }}
            />
            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                padding: 5,
                color: COLORS.black,
              }}>
              {data.current?.time_study}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              //   height: 50,
              //   backgroundColor: 'red',
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
            <IconLabel
              icon={icons.khoa}
              label={'Khoa :'}
              containerStyle={{
                marginLeft: SIZES.radius,
              }}
              iconStyle={{
                width: 25,
                height: 25,
                tintColor: null,
              }}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.gray80,
                backgroundColor: COLORS.transparent,
              }}
            />
            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                padding: 5,
                color: COLORS.black,
                marginRight: 10,
              }}>
              {data.current?.faculty}
            </Text>

            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                padding: 5,
                color: COLORS.black,
                marginRight: 30,
              }}>
              Group :{data.current?.self_study == 1 ? 'Tự học' : 'Mentor'}
            </Text>
          </View>
          <View style={{paddingHorizontal: SIZES.padding}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{...FONTS.h2, color: COLORS.black, textAlign: 'center'}}>
              Members:
            </Text>
            {data.current?.membersAccepted.map((item, index) => {
              return (
                <View
                  key={`Groups-${index}`}
                  style={{
                    // alignItems: 'center',
                    height: 30,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // paddingHorizontal: SIZES.padding,
                      alignItems: 'center',
                      height: 40,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...FONTS.h3, color: COLORS.black}}>
                      {item?.full_name} - {item?.faculty}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{paddingHorizontal: SIZES.padding}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{...FONTS.h2, color: COLORS.black, textAlign: 'center'}}>
              Survey Questions For Mentor
            </Text>
            {questions.current?.map((item, index) => {
              if (myanswers.current.length != 0) {
                ansupdate = myanswers.current;
              }
              console.log(ansupdate);
              return (
                <View
                  key={`Groups-${index}`}
                  style={
                    {
                      // alignItems: 'center',
                      // height: 30,
                    }
                  }>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: SIZES.padding,
                      // alignItems: 'center',
                      // height: 40,
                      // justifyContent: 'space-between',
                    }}>
                    <Text style={{...FONTS.h3, color: COLORS.primary2}}>
                      {`Question-${index + 1}`} - {item?.content}
                    </Text>
                    <View style={{flexDirection: 'column'}}>
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.primary,
                          borderRadius: 25,
                          fontStyle: 'italic',
                          fontSize: 16,
                          paddingHorizontal: 15,
                        }}
                        numberOfLines={2}
                        placeholder={'ý kiến'}
                        maxLength={100}
                        multiline={true}
                        borderWidth={2}
                        defaultValue={
                          myanswers.current?.find(
                            ele => ele.content == item.content,
                          )?.answer
                        }
                        // value={
                        //   index == 0 ? index1 : index == 1 ? index2 : index3
                        // }
                        onChangeText={text => {
                          if (index == 0) {
                            setIndex1(text);
                          } else if (index == 1) {
                            setIndex2(text);
                          } else if (index == 2) {
                            setIndex3(text);
                          } else if (index == 3) {
                            setIndex4(text);
                          } else if (index == 4) {
                            setIndex5(text);
                          }
                        }}
                        onEndEditing={() => {
                          if (index == 0) {
                            ansupdate[index].answer = index1;
                          } else if (index == 1) {
                            ansupdate[index].answer = index2;
                          } else if (index == 2) {
                            ansupdate[index].answer = index3;
                          } else if (index == 3) {
                            ansupdate[index].answer = index4;
                          } else if (index == 4) {
                            ansupdate[index].answer = index5;
                          }
                          // ansupdate[index].answer =
                          //   index == 0 ? index1 : index == 1 ? index2 : index3;
                          console.log(ansupdate);
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
            {/* {console.log(ansupdate)} */}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              // height: 50,
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                backgroundColor: COLORS.primary,
                width: 120,
                height: 50,
                justifyContent: 'center',
                textAlign: 'center',
                borderColor: 'green',
                borderWidth: 1,
                // marginLeft: 120,
                // position: 'absolute',
              }}
              onPress={() => {
                console.log(data.current?.id);
                SignUpMentor(data.current?.id);
                navigation.goBack();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  // marginLeft: 18,
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: '600',
                  color: COLORS.black,
                }}>
                {button}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                borderRadius: 25,
                backgroundColor: COLORS.primary,
                width: 120,
                height: 50,
                justifyContent: 'center',
                // textAlign: 'center',
                borderColor: 'green',
                borderWidth: 1,
                // marginLeft: 120,
                // position: 'absolute',
              }}
              onPress={() => {
                // navigation.navigate('Login');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  // marginLeft: 18,
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: '600',
                  color: COLORS.black,
                }}>
                Đăng kí làm Mentor
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      {renderVideoSection()}
      {renderContent()}
    </View>
  );
};
export default JoinMentor;
