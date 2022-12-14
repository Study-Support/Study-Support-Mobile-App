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
import {GetInfoUser, UpdatePassWord, UpdateUser} from '../store/actions.js';
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
// const data = [
//   {key: '1', value: 'Mobiles'},
//   {key: '2', value: 'Appliances'},
//   {key: '3', value: 'Cameras'},
// ];
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
const FilterUpdatePass = ({
  filterSharevalue1,
  filterSharevalue2,
  height,
  bottom,
}) => {
  const [current, setCurrent] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
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
                width: 180,
                // height:60,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  ...FONTS.h2,
                  color: COLORS.primary3,
                  alignItems: 'center',
                }}>
                Update Password
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
                value={current}
                maxLength={25}
                placeholder="Nhập Pass Cũ"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setCurrent(text)}
              />
              <Image
                source={icons.password}
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
                backgroundColor: '#fff',
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
                value={pass}
                maxLength={10}
                placeholder="Nhập Pass Mới"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                paddingHorizontal={10}
                onChangeText={text => setPass(text)}
              />
              <Image
                source={icons.password}
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
              style={{
                backgroundColor: '#fff',
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
                value={confirm}
                placeholder="Nhập Lại Mk"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setConfirm(text)}
                onBlur={() => Keyboard.dismiss()}
              />
              <Image
                source={icons.password}
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
              onPress={() => {
                let user1 = {};
                (user1.current_password = current),
                  (user1.password = pass),
                  (user1.password_confirmation = confirm),
                  console.log(user1);
                UpdatePassWord(user1);
                user1 = {};
                filterSharevalue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                filterSharevalue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, {duration: 100}),
                );
                Keyboard.dismiss();
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
});
export default FilterUpdatePass;
