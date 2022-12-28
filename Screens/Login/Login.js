import {StatusBar} from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useRef} from 'react';
import {Animated, Easing, Dimensions} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
// import LottieView from 'lottie-react-native';
import {images, icons, theme, COLORS, SIZES} from '../../constants/index.js';
import Loginani from './loginanimation';
import Signup from './signup';
import FormInfo from './FormInfo.js';
import TabLayout from 'react-native-simple-tablayout';
import Creat from '../Joins/JoinWithMentor.js';
const {width} = Dimensions.get('window');
const Login = ({navigation, params}) => {
  const motion = useRef(new Animated.Value(-200)).current;
  const motion1 = useRef(new Animated.Value(-200)).current;
  const motion2 = useRef(new Animated.Value(-200)).current;
  const motion3 = useRef(new Animated.Value(-200)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const topMotion = useRef(new Animated.Value(900)).current;
  // const tabName = ['Login', 'Signup'];
  // const Screen1 = () => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         width,
  //         justifyContent: 'center',
  //         backgroundColor: '#FFFFFF',
  //       }}>
  //       <Loginani />
  //     </View>
  //   );
  // };

  // const Screen2 = props => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: 'center',
  //         width,
  //         backgroundColor: props.color,
  //         justifyContent: 'center',
  //       }}>
  //       <Signup />
  //     </View>
  //   );
  // };
  // //tab screen passed as array of screens
  // const data = [<Screen1 />, <Screen2 />];
  // const topMotion = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(topMotion, {
          toValue: 420,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.cubic,
        }),
        Animated.timing(motion, {
          toValue: 70,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion1, {
          toValue: 70,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion2, {
          toValue: 70,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion3, {
          toValue: 10,
          duration: 800,
          useNativeDriver: false,
          easing: Easing.cubic,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 400,
              useNativeDriver: false,
              easing: Easing.linear,
            }),

            Animated.timing(spinValue, {
              toValue: -1,
              duration: 800,
              useNativeDriver: false,
              easing: Easing.linear,
            }),

            Animated.timing(spinValue, {
              toValue: 0,
              duration: 400,
              useNativeDriver: false,
              easing: Easing.linear,
            }),
          ]),
        ),
      ]).start();
    });
  });
  const spin = spinValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.featured_bg_image}
        style={{width: '100%', height: '100%', flex: 1.2}}>
        <View style={styles.container}>
          <Animated.Image
            source={images.Education3}
            style={{
              width: 80,
              height: 80,
              marginTop: 50,
              textAlign: 'center',
              justifyContent: 'center',
              borderRadius: 80,
              backgroundColor: 'transparent',
              transform: [{rotate: spin}],
            }}
          />

          <View style={styles.text_container}>
            <Text style={styles.text}>Welcome to Mentor Students</Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          marginTop: -25,
          flex: 2.8,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}>
        {/* <View style={{backgroundColor: '#FFFFFF', marginTop: 20}}> */}
        {/* <TabLayout
            style={{backgroundColor: '#FFFFFF'}}
            screens={data}
            tabName={tabName}
            indicatorHeight={3}
            indicatorRadius={20}
            tabRadius={20}
            indicatorColor={theme.COLORS.primary}
            titleFontSize={18}
            titleColor={theme.COLORS.primary}
            tabHeight={50}
            marginTop={100}
            tabColor={'#FFFFFF'}
          /> */}
        <Shadow style={{position: 'relative'}}>
          <View
            style={{
              flex: 1,
              width: 395,
              position: 'relative',
              // paddingHorizontal: SIZES.padding,
              // paddingVertical: SIZES.radius,
              // borderRadius: SIZES.radius,
              backgroundColor: '#FFFFFF',
              // marginLeft: 30,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <Animated.View
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: topMotion,
                textAlign: 'center',
                alignItems: 'center',
                // borderColor: 'green',
                width: '100%',
                height: 30,
                // backgroundColor: 'red',
                // marginLeft: -25,
              }}>
              <View
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  marginTop: -10,
                  position: 'relative',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontWeight: '400',
                    fontSize: 18,
                    fontStyle: 'italic',
                    color: COLORS.primary3,
                    // position: 'absolute',
                    // zIndex: 1,
                  }}>
                  Đăng Nhập Hệ Thống
                </Text>
              </View>
            </Animated.View>
            <Loginani />
          </View>
        </Shadow>
        {/* </View> */}
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          position: 'relative',
        }}>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: motion,
            textAlign: 'center',
            borderColor: 'green',
            width: 70,
            marginLeft: 80,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 40,
              backgroundColor: '#FFFFFF',
              width: 60,
              height: 60,
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'green',
              borderWidth: 1,
              marginRight: 1,
              position: 'relative',
            }}
            onPress={() => {
              navigation.navigate('Chat');
            }}>
            {/* <Text style={{textAlign: 'center',}}>Stop</Text> */}
            <Image
              source={images.fb}
              style={{
                width: 20,
                height: 20,
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: motion1,
            textAlign: 'center',
            borderColor: 'green',
            width: 70,
            marginLeft: 170,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 40,
              backgroundColor: '#FFF',
              width: 60,
              height: 60,
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'green',
              borderWidth: 1,
              position: 'relative',
            }}>
            {/* <Text style={{textAlign: 'center',}}>Stop</Text> */}
            <Image
              source={images.tw}
              style={{
                width: 20,
                height: 20,
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: motion2,
            textAlign: 'center',
            borderColor: 'green',
            width: 70,
            marginLeft: 257,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 40,
              backgroundColor: '#FFF',
              width: 60,
              height: 60,
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'green',
              borderWidth: 1,
              marginLeft: 5,
              position: 'relative',
            }}
            onPress={() => {
              navigation.navigate('Creat');
            }}>
            <Image
              source={images.gg}
              style={{
                width: 20,
                height: 20,
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: motion3,
            textAlign: 'center',
            alignItems: 'center',
            // borderColor: 'green',
            width: '100%',
            height: 30,
            // backgroundColor: 'red',
            marginLeft: -35,
          }}>
          <View
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: 20,
              position: 'absolute',
            }}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                fontWeight: '300',
                fontSize: 16,
                fontStyle: 'italic',
                color: COLORS.black,
              }}>
              Đăng Kí Tài Khoản -
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: '#FFF',
                width: 80,
                height: 40,
                justifyContent: 'center',
                textAlign: 'center',
                borderColor: 'green',
                borderWidth: 0.1,
                marginLeft: 139,
                position: 'absolute',
              }}
              onPress={() => {
                navigation.navigate('FormInfo');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  // marginLeft: 18,
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#b0006d',

    alignItems: 'center',
    borderRadius: 5,
  },
  text_container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: theme.COLORS.primary3,
    marginTop: 8,
    fontStyle: 'italic',
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
    justifyContent: 'center',
    marginTop: 15,
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
