import {StatusBar} from 'expo-status-bar';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Line from '../../Components/Line.js';
import {SelectList} from 'react-native-dropdown-select-list';
// import {FontAwesome5} from '@expo/vector-icons';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {images, icons, theme, COLORS, SIZES} from '../../constants/index.js';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions.js';
// import LottieView from 'lottie-react-native';
import {MotiView, ScrollView, useAnimationState} from 'moti';
import {Shadow} from 'react-native-shadow-2';
import SelectBox from 'react-native-multi-selectbox';
import {ColorSpace, event} from 'react-native-reanimated';

const data = [
  {key: '1', value: 'Mobiles'},
  {key: '2', value: 'Appliances'},
  {key: '3', value: 'Cameras'},
  {key: '4', value: 'Computers'},
  {key: '5', value: 'Vegetables'},
  {key: '6', value: 'Diary Products'},
  {key: '7', value: 'Drinks'},
];
const FormInfo = ({navigation}) => {
  const [selected, setSelected] = useState('');
  const [slash, setslash] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [fal, setFal] = useState('');
  const [avartar, setAvartar] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
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
  const submit = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.bg}
        style={{width: '100%', height: '100%', flex: 1}}>
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View
            style={{
              // flexDirection: 'row',
              width: '100%',
              height: 280,
              backgroundColor: 'transparent',
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Shadow
              style={{alignItems: 'center', backgroundColor: 'transparent'}}>
              <View
                style={{
                  flex: 1,
                  width: 370,
                  paddingHorizontal: SIZES.padding,
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.padding,
                  backgroundColor: 'transparent',
                  // marginLeft: 8,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    borderRadius: 20,
                    height: 50,
                    // padding: 8,
                    marginTop: -9,
                    // backgroundColor: 'transparent',
                  }}>
                  <TextInput
                    style={styles.inputPass}
                    secureTextEntry={false}
                    height={'103%'}
                    multiline={true}
                    value={name}
                    maxLength={25}
                    placeholder="email"
                    autoFocus={false}
                    textAlign={'center'}
                    keyboardType={'name-phone-pad'}
                    placeholderTextColor={COLORS.gray}
                    backgroundColor={'#9292'}
                    onChangeText={text => setName(text)}
                  />
                  <Image
                    source={icons.email}
                    style={{
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: 13,
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
                    // backgroundColor: 'red',
                    borderRadius: 20,
                    height: 50,
                    // padding: 8,
                    marginTop: 10,
                    // backgroundColor: 'transparent',
                  }}>
                  <TextInput
                    style={styles.inputPass}
                    secureTextEntry={false}
                    height={'103%'}
                    multiline={true}
                    value={name}
                    maxLength={25}
                    placeholder="password"
                    autoFocus={false}
                    textAlign={'center'}
                    keyboardType={'name-phone-pad'}
                    placeholderTextColor="#000"
                    backgroundColor={'#9292'}
                    onChangeText={text => setName(text)}
                  />
                  <Image
                    source={icons.password}
                    style={{
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: 18,
                      tintColor: COLORS.primary,
                      width: 23,
                      height: 23,
                      borderRadius: 10,
                      backgroundColor: COLORS.transparent,
                    }}
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: 'red',
                    borderRadius: 20,
                    height: 50,
                    // padding: 8,
                    marginTop: 10,
                    // backgroundColor: 'transparent',
                  }}>
                  <TextInput
                    style={styles.inputPass}
                    secureTextEntry={false}
                    height={'103%'}
                    multiline={true}
                    value={name}
                    maxLength={25}
                    placeholder="confirm pass"
                    autoFocus={false}
                    textAlign={'center'}
                    keyboardType={'name-phone-pad'}
                    placeholderTextColor="#000"
                    backgroundColor={'#9292'}
                    onChangeText={text => setName(text)}
                  />
                  <Image
                    source={icons.password}
                    style={{
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: 18,
                      tintColor: COLORS.primary,
                      width: 23,
                      height: 23,
                      borderRadius: 10,
                      backgroundColor: COLORS.transparent,
                    }}
                  />
                </View>
                <View
                  style={{
                    // position:'absolute',
                    // backgroundColor: 'red',
                    borderRadius: 20,
                    // alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    width: '100%',
                    paddingHorizontal: 8,
                    marginTop: 20,
                    // backgroundColor: 'red',
                  }}>
                  <SelectList
                    setSelected={val =>
                      data.forEach(key => {
                        if (key.value === val) {
                          console.log(key.key);
                        }
                      })
                    }
                    data={data}
                    save="value"
                  />
                  {/* <Image
                    source={icons.khoa}
                    style={{
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: 9,
                      // tintColor: COLORS.primary,
                      width: 23,
                      height: 23,
                      borderRadius: 10,
                      backgroundColor: COLORS.transparent,
                    }}
                  /> */}
                </View>
              </View>
            </Shadow>
            {/* <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'red',
                  borderRadius: 40,
                  padding: 8,
                  marginTop: 10,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',

                  textAlign: 'center',
                }}>
                <Image
                  source={images.uploadphoto}
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    marginLeft: 25,
                    // marginTop: 30,
                    // color: 'red',
                    width: 60,
                    height: 60,
                    backgroundColor: 'transparent',
                  }}
                />
                <Image
                  source={icons.add}
                  style={{
                    position: 'relative',
                    marginLeft: 25,
                    // marginTop: 30,
                    // color: 'red',
                    width: 20,
                    height: 20,
                    marginTop: 55,
                    // backgroundColor: 'red',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  position: 'relative',
                  backgroundColor: 'transparent',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: '500',
                    fontStyle: 'italic',
                    color: COLORS.black,
                  }}>
                  Avartar
                </Text>
              </View> */}
            {/* </View> */}
          </View>
          <ScrollView
            horizontal={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              height: SIZES.height * 0.66,
              // borderRadius:40,
            }}
            style={{
              marginTop: -10,
              height: SIZES.height * 0.45,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: 'transparent',
            }}>
            <Shadow
              style={{alignItems: 'center', backgroundColor: 'transparent'}}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  paddingHorizontal: SIZES.padding,
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.padding,
                  backgroundColor: 'transparent',
                  // marginLeft: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 80,
                    padding: 8,
                    marginTop: -12,
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
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 80,
                    padding: 8,
                    marginTop: -5,
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
                    onChangeText={phone => setPhone(phone)}
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
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 80,
                    padding: 8,
                    marginTop: -5,
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
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 80,
                    padding: 8,
                    backgroundColor: 'transparent',
                    marginTop: -5,
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
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 80,
                    padding: 8,
                    marginTop: -5,
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
                  style={{
                    backgroundColor: '#fff',
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
                    onPress={() => {
                      submit();
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 18,
                        color: '#212525',
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}>
                      Đăng Kí
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Shadow>
            <View
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                // position: 'absolute',
                bottom: 20,
                textAlign: 'center',
                alignItems: 'center',
                // borderColor: 'green',
                width: '100%',
                height: 50,
                backgroundColor: 'transparent',
                // marginLeft: -25,
              }}>
              <View
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  // position: 'absolute',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontWeight: '400',
                    fontSize: 16,
                    fontStyle: 'italic',
                    color: COLORS.black,
                  }}>
                  Đã có tài khoản -
                </Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    backgroundColor: COLORS.primary,
                    width: 80,
                    height: 40,
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderColor: 'green',
                    borderWidth: 1,
                    marginLeft: 120,
                    position: 'absolute',
                  }}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      // marginLeft: 18,
                      fontSize: 14,
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FormInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    borderRadius: 5,
  },
  inputPass: {
    justifyContent: 'center',
    width: 320,
    color: '#000',
    textAlign: 'center',
    // paddingHorizontal: 5,
    // height: '100%',
    backgroundColor: '#9292',
    borderRadius: 20,
    marginTop: 5,
  },
  animation: {
    width: 380,
    height: 380,
    fontWeight: 200,
    top: 0,
    // backgroundColor: 'pink',
    marginTop: -20,
  },
  contents: {
    fontSize: 24,
    fontWeight: 600,
  },
  warpper: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  hitest: {
    color: '#fff',
    fontWeight: 'bold',
    // fontStyle: 'italic',
    // fontFamily: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  user: {
    color: '#929292',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    padding: 4,
    fontWeight: '400',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 80,
    padding: 8,
    marginTop: 10,
  },
  form1: {
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 80,
    padding: 8,
    marginTop: -12,
  },
  textinput: {
    backgroundColor: '#fff',
    position: 'relative',
    width: 340,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    // borderRadius: 40,
  },
  btndn: {
    position: 'relative',
    backgroundColor: '#929229',
    width: 340,
    height: 50,
    marginTop: 10,
    borderRadius: 40,
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
  },
  action: {
    width: 360,
    height: 40,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 15,
    // textAlign: 'left',
  },
  support1: {
    textAlign: 'left',
    marginRight: 80,
    color: '#fff',
    fontSize: 20,
    fontWeight: '200',
  },
  support2: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 20,
    fontWeight: '200',
  },
});
