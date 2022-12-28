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
} from '../../../Components';
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
} from '../../../constants';
import BASE_URL from '../../../config';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
const Chapters = ({selectedGroup, token}) => {
  const navigation = useNavigation();
  const groups = selectedGroup;
  console.log(groups);
  const user = useSelector(state => state.Reducers.userDetail);
  // const [text, setText] = React.useState('');
  // const [loading, setLoading] = useState(true);
  function renderContent() {
    return (
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: 'red',
          bottom: 20,
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
              {groups?.topic} - {groups?.subject}
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
                {groups?.quantity}
              </Text>
              <IconLabel
                icon={icons.address}
                label={groups?.location_study}
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
                  {groups?.mentorAccepted?.full_name}
                </Text>
                <Text style={{...FONTS.body3}}>Mentor {groups?.subject}</Text>
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
              Thông Tin : {groups?.information}
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
              {groups?.time_study}
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
                marginRight: 20,
              }}>
              {groups?.faculty}
            </Text>

            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                padding: 5,
                color: COLORS.black,
                marginRight: 30,
              }}>
              Group :{groups?.self_study == 0 ? 'Tự học' : 'Không tự'}
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
              Members Accepted
            </Text>
            {groups?.membersAccepted.map((item, index) => {
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
              Đánh Giá
            </Text>
            {groups?.ratings
              .filter(ele => ele.account_id == user?.id)
              .map((item, index) => {
                return (
                  <View
                    key={`Groups-${index}`}
                    style={{
                      // alignItems: 'center',
                      // height: 30,
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        // height: 40,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...FONTS.h3, color: COLORS.black}}>
                        {item?.account_to}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <IconButton
                          icon={icons.star}
                          iconStyle={{
                            tintColor: COLORS.primary2,
                          }}
                          containerStyle={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.base,
                          }}
                        />
                        <Text style={{...FONTS.h3, color: COLORS.black}}>
                          rating: {item?.rating}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...FONTS.h3,
                          color: COLORS.primary3,
                          marginHorizontal: 10,
                        }}>
                        -Nhận Xét: {item?.comment}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View
            style={{paddingHorizontal: SIZES.padding, alignItems: 'center'}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
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
                padding: SIZES.padding,
                // marginLeft: 120,
                // position: 'absolute',
              }}
              onPress={() => {
                navigation.navigate('Rating', {groups, token, user});
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
                Đánh Giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      {renderContent()}
    </View>
  );
};
export default Chapters;
