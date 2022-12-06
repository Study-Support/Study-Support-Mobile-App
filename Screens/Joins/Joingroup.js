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
const Joingroup = ({navigation, route}) => {
  const groups = route.params.selectedGroup;
  const data = useRef();
  data.current = groups;
  const token = route.params.token;
  const [loading, setLoading] = useState(true);
  const [khokhan, setKhokhan] = React.useState('');
  const [mongmuon, setMongmuon] = React.useState('');
  const [ykien, setYkien] = React.useState('');
  // console.log(groups.survey_questions);
  // console.log(token);
  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" color={COLORS.primary} />
  //     </View>
  //   );
  // }
  // if (data.current.answers != null && data.current !== undefined) {
  //   navigation.navigate('GroupDetail', {
  //     selectedGroup: data.current,
  //     token: token,
  //   });
  // }
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
              if (data.current.is_creator) {
                console.log('Nó đó');
                // dispatch(DeleteGroup());
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
              {data.current?.topic} - {data.current.subject}
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
              Thông Tin : {data.current.information}
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
                marginRight: 120,
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
                      <IconButton
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
                      </Text>
                    </View>
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
              Survey Questions
            </Text>
            {data.current?.survey_questions.map((item, index) => {
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
                        onChangeText={text => setText(text)}
                      />
                      <Text
                        style={{
                          color: COLORS.gray80,
                          textAlign: 'right',
                          marginRight: 10,
                        }}>
                        {text.length}/100 Characters
                      </Text>
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
                navigation.navigate('GroupDetail');
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
                Tham Gia
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
