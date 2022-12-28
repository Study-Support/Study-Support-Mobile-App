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
const Joingroup = ({navigation, route}) => {
  const groups = route.params.selectedGroup;
  const data = useRef();
  let ansupdate = [];
  const myanswers = useRef([]);
  data.current = groups.group;
  myanswers.current = groups.myAnswers;
  const token = route.params.token;
  const [loading, setLoading] = useState(true);
  const [join1, setJoin1] = React.useState(myanswers.current[0]?.answer);
  const [join2, setJoin2] = React.useState(myanswers.current[1]?.answer);
  const [join3, setJoin3] = React.useState(myanswers.current[2]?.answer);
  const [join4, setJoin4] = React.useState(myanswers.current[3]?.answer);
  const [join5, setJoin5] = React.useState(myanswers.current[4]?.answer);
  const [button, setButton] = React.useState('Tham Gia');
  useEffect(() => {
    if (groups.myAnswers?.length != 0) {
      setButton('Cập Nhật');
    } else {
      setButton('Tham Gia');
    }
    console.log(button);
  }, [button]);
  if (myanswers.current.length != 0) {
    ansupdate = myanswers.current;
  } else {
    ansupdate = data.current?.survey_questions;
  }
  async function fetchData(id) {
    // console.log(ansupdate);
    if (button == 'Tham Gia') {
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
            alert('Yêu Cầu Tham Gia Thành Công');
            return response.json();
          } else {
            alert('Yêu Cầu Tham Gia Thất bại !');
            return response.json();
          }
        })
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            // alert('Yêu Cầu Tham Gia Thành Công');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
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
            alert('Cập Nhật Thất bại');
            return response.json();
          }
        })
        .then(response => {
          if (response.status == 200) {
            alert('Cập Nhật Thành Công');
          }
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
              if (myanswers.current.length != 0) {
                DeleteGroupJoin(data.current?.id);
                navigation.goBack();
                route.params.Updatelist();
                // console.log(data.current?.id);
              } else {
                navigation.goBack();
              }
            }}
          />
          {/* <IconButton
            icon={icons.star}
            iconStyle={{
              tintColor: COLORS.primary2,
            }}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          /> */}
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
              width: '100%',
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
                ...FONTS.h3,
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
                marginRight: 30,
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
              Group :{data.current?.self_study == 0 ? 'Tự học' : 'Không tự'}
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {/* <IconButton
                        icon={icons.star}
                        iconStyle={{
                          tintColor: COLORS.primary2,
                        }}
                        containerStyle={{
                          width: 50,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 20,
                        }}
                      />
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                          justifyContent: 'center',
                        }}>
                        rating: {item?.rating == null ? 0 : 1}
                      </Text> */}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <View style={{paddingHorizontal: SIZES.padding}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary3,
                textAlign: 'center',
              }}>
              Thông Tin kiểm duyệt đăng ký !
            </Text>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  ...FONTS.h3,
                  // marginTop: 10,
                  paddingHorizontal: 2,
                  color: COLORS.primary2,
                }}>
                -Bạn gặp khó khăn gì ?
              </Text>
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
                placeholder={'Khó Khăn'}
                maxLength={100}
                multiline={true}
                borderWidth={2}
                onChangeText={text => setKhokhan(text)}
              />
              <Text
                style={{
                  color: COLORS.gray80,
                  textAlign: 'right',
                  marginRight: 10,
                }}>
                {khokhan.length}/100 Characters
              </Text>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  ...FONTS.h3,
                  // marginTop: 10,
                  paddingHorizontal: 2,
                  color: COLORS.primary2,
                }}>
                -Bạn mong muốn gì khi tham gia nhóm học ?
              </Text>
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
                placeholder={'mong muốn'}
                maxLength={100}
                multiline={true}
                borderWidth={2}
                onChangeText={text => setMongmuon(text)}
              />
              <Text
                style={{
                  color: COLORS.gray80,
                  textAlign: 'right',
                  marginRight: 10,
                }}>
                {mongmuon.length}/100 Characters
              </Text>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  ...FONTS.h3,
                  // marginTop: 10,
                  paddingHorizontal: 2,
                  color: COLORS.primary2,
                }}>
                -Bạn có kiến gì muốn gửi ?
              </Text>
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
                onChangeText={text => setYkien(text)}
              />
              <Text
                style={{
                  color: COLORS.gray80,
                  textAlign: 'right',
                  marginRight: 10,
                }}>
                {ykien.length}/100 Characters
              </Text>
            </View>
          </View> */}
          <View style={{paddingHorizontal: SIZES.padding}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{...FONTS.h2, color: COLORS.black, textAlign: 'center'}}>
              Survey Questions
            </Text>
            {data.current?.survey_questions.map((item, index) => {
              if (myanswers.current.length != 0) {
                ansupdate = myanswers.current;
              }
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
                        defaultValue={
                          myanswers.current.find(
                            ele => ele.content == item.content,
                          )?.answer
                        }
                        borderWidth={3}
                        onChangeText={text => {
                          if (index == 0) {
                            setJoin1(text);
                          } else if (index == 1) {
                            setJoin2(text);
                          } else if (index == 2) {
                            setJoin3(text);
                          } else if (index == 3) {
                            setJoin4(text);
                          } else if (index == 4) {
                            setJoin5(text);
                          }
                        }}
                        onEndEditing={() => {
                          console.log(ansupdate);
                          if (myanswers.current.length != 0) {
                            if (index == 0) {
                              ansupdate[index].answer = join1;
                              ansupdate[index].id =
                                myanswers.current[index]?.id;
                            } else if (index == 1) {
                              ansupdate[index].answer = join2;
                              ansupdate[index].id =
                                myanswers.current[index]?.id;
                            } else if (index == 2) {
                              ansupdate[index].answer = join3;
                              ansupdate[index].id =
                                myanswers.current[index]?.id;
                            } else if (index == 3) {
                              ansupdate[index].answer = join4;
                              ansupdate[index].id =
                                myanswers.current[index]?.id;
                            } else if (index == 4) {
                              ansupdate[index].answer = join5;
                              ansupdate[index].id =
                                myanswers.current[index]?.id;
                            }
                          } else {
                            if (index == 0) {
                              ansupdate[index].answer = join1;
                            } else if (index == 1) {
                              ansupdate[index].answer = join2;
                            } else if (index == 2) {
                              ansupdate[index].answer = join3;
                            } else if (index == 3) {
                              ansupdate[index].answer = join4;
                            } else if (index == 4) {
                              ansupdate[index].answer = join5;
                            }
                          }
                          console.log(ansupdate);
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
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
                fetchData(data.current?.id);
                setJoin1('');
                setJoin2('');
                setJoin3('');
                setJoin4('');
                setJoin5('');
                ansupdate = [];
                myanswers.current = [];

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
export default Joingroup;
