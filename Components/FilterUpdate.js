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
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GetInfoUser, UpdateUser} from '../store/actions.js';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
} from '../Components';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';

import {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
  constants,
} from '../constants';
import {useDispatch, useSelector, Provider} from 'react-redux';
import Profile from '../Screens/Profile/Profile.js';
import {Dropdown} from 'react-native-element-dropdown';

import BASE_URL from '../config.js';

const ClassTypeOption = ({containerStyle, classType, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />
      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}>
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};
const FilterUpdate = ({
  filterSharevalue1,
  filterSharevalue2,
  height,
  bottom,
  user,
  update,
}) => {
  const token = useSelector(state => state.Reducers.authToken);
  // console.log(token);
  let khoa = useSelector(state => state.Reducers.getFaculties);
  const data = [];
  // console.log(khoa);
  khoa.forEach(key => {
    data.push({key: `${key.id}`, value: `${key.name}`});
  });
  console.log(data);
  const key = useRef();
  const value = useRef();
  // key.current = user?.faculty_id;
  const [isFocus, setIsFocus] = useState(false);
  key.current = user?.faculty_id;
  // console.log(data);
  const [birthday, setBirthday] = useState(user.birthday);
  const [selected, setSelected] = useState('');
  const [phone, setPhone] = useState(user.phone_number);
  const [name, setName] = useState(user.full_name);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(user.gender == 0 ? 'Nữ' : 'Nam');
  const [fal, setFal] = useState(user.faculty_id);
  const [address, setAddress] = useState(user.address);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (user != null) {
      setFal(`${user.faculty_id}`);
      console.log(fal);
      key.current = user?.faculty_id;
      setIsFocus(true);
    }
  }, [user]);
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setBirthday(fDate);
    // console.log(fDate);
    // setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const filterModalContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue1.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue1.value,
        },
      ],
    };
  });
  const filterModalBg = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [SIZES.height, 0], [0, 1]),
    };
  });
  const filterModalContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue2.value,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
          //   backgroundColor: '#FFF',
        },
        filterModalContainer,
      ]}>
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBg,
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: bottom,
              height: height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: COLORS.white,
            },
            filterModalContent,
          ]}>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding,
              //   alignItems:'flex-end',
              justifyContent: 'space-between',
              //   backgroundColor:'red',
              height: 30,
            }}>
            <View
              style={{
                width: 160,
                // height:60,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  ...FONTS.h2,
                  color: COLORS.black,
                  alignItems: 'center',
                }}>
                Update Profile
              </Text>
            </View>
            <TextButton
              label="Cancel"
              contentContainerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.body3,
              }}
              onPress={() => {
                // update();
                filterSharevalue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                filterSharevalue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, {duration: 100}),
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: SIZES.radius,
              alignItems: 'center',
              // justifyContent: 'center',
              //   backgroundColor: 'red',
            }}>
            <View
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 10,
                marginTop: -10,
                backgroundColor: 'transparent',
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={name}
                maxLength={25}
                placeholder="Nhập Họ Tên"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setName(text)}
              />
              <Image
                source={icons.profile}
                style={{
                  position: 'absolute',
                  marginLeft: 25,
                  marginTop: 30,
                  tintColor: COLORS.primary,
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  backgroundColor: COLORS.transparent,
                }}
              />
            </View>

            <View
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 8,
                marginTop: 0,
                backgroundColor: 'transparent',
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={phone}
                maxLength={10}
                placeholder="Nhập Phone Number"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'numeric'}
                placeholderTextColor="#000"
                paddingHorizontal={10}
                onChangeText={text => setPhone(text)}
              />
              <Image
                source={icons.call}
                style={{
                  position: 'absolute',
                  marginLeft: 25,
                  marginTop: 30,
                  // color: 'red',
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 8,
                marginTop: 0,
                backgroundColor: 'transparent',
              }}
              onPress={() => showMode('date')}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={birthday}
                placeholder="Nhập Birthday"
                autoFocus={false}
                editable={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setBirthday(text)}
              />
              <Image
                source={icons.birthday}
                style={{
                  position: 'absolute',
                  marginLeft: 25,
                  marginTop: 30,
                  // color: 'red',
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                }}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 8,
                backgroundColor: 'transparent',
                marginTop: 0,
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={gender}
                placeholder="Nhập Giới Tính"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setGender(text)}
                onBlur={() => Keyboard.dismiss()}
              />
              <Image
                source={icons.gender}
                style={{
                  position: 'absolute',
                  marginLeft: 25,
                  marginTop: 30,
                  // color: 'red',
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                }}
              />
            </View>

            <View
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 8,
                marginTop: 0,
                backgroundColor: 'transparent',
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={address}
                placeholder="Nhập Địa Chỉ"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setAddress(text)}
              />
              <Image
                source={icons.address}
                style={{
                  position: 'absolute',
                  marginLeft: 25,
                  marginTop: 30,
                  // color: 'red',
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                }}
              />
            </View>
            <View
              // onPress={() => Keyboard.dismiss()}
              style={{
                // position:'absolute',
                // backgroundColor: 'red',
                borderRadius: 20,
                // alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: '100%',
                paddingHorizontal: 18,
                marginTop: 10,
                // backgroundColor: 'red',
                // marginLeft:100,
              }}>
              <View
                style={{
                  position: 'relative',
                  // backgroundColor: 'red',
                  borderRadius: 20,
                  // alignItems: 'center',
                  justifyContent: 'center',
                  // height: 90,
                  width: '100%',
                  paddingHorizontal: 8,
                  marginTop: 10,
                  // backgroundColor: 'red',
                }}>
                {/* {console.log(data)} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="value"
                  valueField="key"
                  placeholder={'Chọn Khoa'}
                  searchPlaceholder="Search..."
                  value={fal}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setIsFocus(false);
                    setFal(item.key);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                // backgroundColor: '#fff',
                // borderRadius: 10,
                height: 80,
                padding: 8,
                marginTop: -5,
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: '#FF814C',
                  backgroundColor: COLORS.primary,
                  width: 150,
                  height: 48,
                  justifyContent: 'center',
                  borderRadius: 28,
                  marginTop: 18,
                }}
                onPress={async () => {
                  let user1 = {};
                  (user1.phone_number = phone),
                    (user1.address = address),
                    (user1.birthday = birthday),
                    (user1.gender = gender === 'Nữ' ? 0 : 1),
                    (user1.full_name = name),
                    (user1.faculty_id = fal),
                    (user1.avatar_url = user.avatar_url),
                    console.log(user1);
                  await UpdateUser(user1);
                  user1 = {};
                  filterSharevalue2.value = withTiming(SIZES.height, {
                    duration: 500,
                  });
                  filterSharevalue1.value = withDelay(
                    500,
                    withTiming(SIZES.height, {duration: 100}),
                  );
                  Keyboard.dismiss();
                  update();
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 18,
                    color: '#212525',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    borderRadius: 5,
  },
  inputPass: {
    justifyContent: 'center',
    width: 350,
    color: '#000',
    textAlign: 'center',
    // paddingHorizontal: 5,
    height: '100%',
    backgroundColor: '#9292',
    borderRadius: 20,
    marginTop: 5,
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
export default FilterUpdate;
