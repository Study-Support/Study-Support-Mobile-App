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
import {Dropdown} from 'react-native-element-dropdown';
import BASE_URL from '../../../config';
import {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
const data = [
  {
    Diem: '1',
    id: 1,
  },
  {
    Diem: '2',
    id: 2,
  },
  {
    Diem: '3',
    id: 3,
  },
  {
    Diem: '4',
    id: 4,
  },
  {
    Diem: '5',
    id: 5,
  },
  {
    Diem: '6',
    id: 6,
  },
  {
    Diem: '7',
    id: 7,
  },
  {
    Diem: '8',
    id: 8,
  },
  {
    Diem: '9',
    id: 9,
  },
  {
    Diem: '10',
    id: 10,
  },
];
const Rating = ({navigation, route}) => {
  const groups = route.params.groups;
  const token = route.params?.token;
  const user = route.params?.user;
  const [nhanxet, setNhanxet] = React.useState('');
  const [loading, setLoading] = useState(true);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isFocus1, setIsFocus1] = React.useState(false);
  const valuestudent = useRef();
  const valuediem = useRef();
  useEffect(() => {
    // async function getRating() {
    //   await fetch(`${BASE_URL}/rate`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then(response => {
    //       if (response.status === 200) {
    //         return response.json();
    //       } else {
    //         console.log(response.status);
    //         return response.json();
    //       }
    //     })
    //     .then(response => {
    //       console.log(response.data.data.mentorRatings);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // getRating();
    if (groups?.mentorAccepted?.id != user?.id) {
      valuestudent.current = groups?.mentorAccepted?.id;
    }
    if (groups != null || groups != undefined) {
      setLoading(false);
    }
  }, [groups]);
  async function rating() {
    let rating1 = {};
    rating1.group_id = groups?.id;
    rating1.user_id = valuestudent.current;
    rating1.rate = valuediem.current;
    rating1.comment = nhanxet;
    console.log(rating1);
    await fetch(`${BASE_URL}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: rating1.comment,
        group_id: rating1.group_id,
        rate: rating1.rate,
        user_id: rating1.user_id,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          alert('Đánh Giá Thành Công!');
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
    setNhanxet('');
    valuestudent.current = 0;
    valuediem.current = 0;
  }
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
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
          }}
        />
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
          // backgroundColor: 'red',
          bottom: 20,
          marginTop: 20,
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
          {groups?.mentorAccepted?.id == user?.id && (
            <View style={{paddingHorizontal: SIZES.padding, flex: 1}}>
              <Line
                lineStyle={{
                  height: 2,
                  marginVertical: SIZES.base,
                }}
              />
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    marginBottom: 10,
                    paddingHorizontal: 2,
                    color: COLORS.primary3,
                  }}>
                  1.Chọn Sinh Viên Muốn Đánh Giá
                </Text>
                <Line
                  lineStyle={{
                    position: 'absolute',
                    marginTop: 20,
                    width: '63%',
                    marginLeft: 16,
                    backgroundColor: COLORS.primary3,
                  }}
                />
              </View>
              <Dropdown
                style={[styles.dropdown, {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={groups.membersAccepted}
                search
                maxHeight={300}
                labelField="full_name"
                valueField="id"
                placeholder={'Chọn Sinh Viên'}
                searchPlaceholder="Search..."
                value={valuestudent.current}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  valuestudent.current = item.id;
                  console.log(valuestudent.current);
                  setIsFocus(false);
                }}
              />
            </View>
          )}
          <View style={{paddingHorizontal: SIZES.padding, flex: 1}}>
            <Line
              lineStyle={{
                height: 2,
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{
                ...FONTS.h3,
                // marginTop: 10,
                // paddingHorizontal: 12,
                color: COLORS.primary3,
              }}>
              2.Những đánh giá nhận xét của bạn dành cho sinh viên trong quá
              trình học tập
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
              numberOfLines={3}
              maxLength={100}
              multiline={true}
              borderWidth={2}
              value={nhanxet}
              // defaultValue={group?.topic}
              placeholder={'Mục đích'}
              onChangeText={text => setNhanxet(text)}
            />
            <Text
              style={{
                color: COLORS.gray80,
                textAlign: 'right',
                marginRight: 10,
              }}>
              {nhanxet?.length}/100 Characters
            </Text>
            <View>
              <Text
                style={{
                  ...FONTS.h3,
                  // marginTop: 10,
                  // paddingHorizontal: 12,
                  color: COLORS.primary3,
                }}>
                3.Số điểm đánh giá bạn dành cho sinh viên
              </Text>
              <Dropdown
                style={[styles.dropdown, {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="Diem"
                valueField="id"
                placeholder={'Chọn điểm số'}
                searchPlaceholder="Search..."
                value={valuediem.current}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  valuediem.current = item.id;
                  console.log(valuediem.current);
                }}
              />
            </View>
            <View style={{padding: SIZES.padding, alignItems: 'center'}}>
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
                  if (
                    valuediem.current == undefined ||
                    valuestudent.current == undefined ||
                    nhanxet.length == 0
                  ) {
                    alert('Vui lòng nhập đầy đủ các trường !');
                  } else {
                    rating();
                    navigation.goBack();
                  }
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
                  Gửi Đánh Giá
                </Text>
              </TouchableOpacity>
            </View>
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
      {renderHeader()}
      {renderVideoSection()}
      {renderContent()}
    </View>
  );
};
export default Rating;
const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    padding: 16,
    color: COLORS.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 8,
    color: COLORS.black,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: COLORS.black,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: COLORS.black,
  },
});
