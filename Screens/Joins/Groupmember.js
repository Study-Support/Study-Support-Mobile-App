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
const Groupmember = ({navigation, route}) => {
  const groups = route.params.selectedGroup;
  const data = useRef();
  let ansupdate = [];
  const myanswers = useRef([]);
  const [urlimage, setUrlimage] = React.useState(null);
  data.current = groups.group;
  myanswers.current = groups.myAnswers;
  const token = route.params.token;
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [button, setButton] = React.useState('Tham Gia');
  useEffect(() => {
    console.log(data.current);
    // async function fetchDetailGroups(id) {
    //   await fetch(`${BASE_URL}/groups/${id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then(response => {
    //       if (response.status === 200) {
    //         // console.log(response.data);
    //         return response.json();
    //       } else {
    //         console.log(response.status);
    //         return response.json();
    //       }
    //     })
    //     .then(response => {
    //       data.current = response.data;
    //       console.log(response);
    //       return response.data.group;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   setLoading(false);
    // }
    // fetchDetailGroups(groups.group?.id);
    setLoading(false);
  }, [update]);
  const Update = () => {
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
  async function Accept(id) {
    await fetch(`${BASE_URL}/groups/${data.current?.id}/acceptMember`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        account_id: id,
        accept: true,
      }),
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
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async function Delete(id) {
    console.log(data.current?.id);
    console.log(id);
    await fetch(`${BASE_URL}/user/groups/${data.current?.id}/acceptMember`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        account_id: id,
        accept: true,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          // alert('xóa thành công !');
          return response.json();
        } else {
          // console.log(response.status);
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
                route.params?.Updatelist();
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
        <Image
          source={
            groups?.image_url != null
              ? {uri: groups?.image_url}
              : images.giaitich1
          }
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
            {data.current?.is_creator &&
              data.current?.membersWaiting.length != 0 && (
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  Member Waiting
                </Text>
              )}
            {data.current?.is_creator &&
              data.current?.membersWaiting.map((item, index) => {
                return (
                  <View
                    key={`Groups-${index}`}
                    style={{
                      flex: 1,
                      // alignItems: 'center',
                      // height: 30,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        // paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        height: 40,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...FONTS.h3, color: COLORS.black}}>
                        {item?.full_name} - {item?.faculty}
                      </Text>
                      <View
                        style={{
                          // flex: 1,
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          // backgroundColor: 'red',
                        }}>
                        <IconButton
                          icon={icons.xoa}
                          iconStyle={{
                            tintColor: null,
                          }}
                          containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            //   backgroundColor: 'red',
                            //   marginLeft: 10,
                          }}
                          onPress={async () => {
                            console.log(item?.id);
                            await Delete([item?.id]);
                            Update();
                          }}
                        />
                        <IconButton
                          icon={icons.checked}
                          iconStyle={{
                            tintColor: COLORS.primary,
                          }}
                          containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            //   marginLeft: 20,
                          }}
                          onPress={() => {
                            Accept(item?.id);
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
            }}
          />
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
export default Groupmember;
