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
import Line from '../../Components/Line.js';
// import {FontAwesome5} from '@expo/vector-icons';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {images, icons, theme, COLORS} from '../../constants/index.js';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions.js';
// import LottieView from 'lottie-react-native';
import {default as FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(Logout());
  };
  const topMotion = useRef(new Animated.Value(100)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const motion = useRef(new Animated.Value(-100)).current;
  const motion1 = useRef(new Animated.Value(-100)).current;
  const motion2 = useRef(new Animated.Value(-100)).current;
  const [slash, setslash] = useState(false);
  const motion3 = useRef(new Animated.Value(-100)).current;
  const motion4 = useRef(new Animated.Value(-100)).current;
  const motion5 = useRef(new Animated.Value(-100)).current;
  const motion6 = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    setTimeout(() => {
      // Animated.loop(
      Animated.parallel([
        Animated.timing(motion, {
          toValue: 20,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion1, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion2, {
          toValue: 20,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion3, {
          toValue: 5,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion4, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion5, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion6, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.sequence([
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
          }),

          Animated.timing(spinValue, {
            toValue: -1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.linear,
          }),

          Animated.timing(spinValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
        ]),
      ]).start();
      // ).start()
    });
  }, [motion, motion1, motion2, motion3, motion4, motion5, motion6, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-45deg', '0deg', '45deg'],
  });
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          backgroundColor: '#fff',
          borderRadius: 40,
          height: 80,
          padding: 8,
          bottom: motion3,
          marginTop: 20,
        }}>
        <TextInput
          style={styles.inputPass}
          secureTextEntry={false}
          multiline={true}
          placeholder="Nhập Tài Khoản"
          autoFocus={false}
          textAlign={'center'}
          justifyContent={'center'}
          keyboardType={'email-address'}
          placeholderTextColor="#929292"
        />
        <Image
          source={icons.email}
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
      </Animated.View>

      <Animated.View
        style={{
          backgroundColor: '#fff',
          borderRadius: 40,
          height: 80,
          padding: 8,
          marginTop: -12,
          bottom: motion4,
        }}>
        <TextInput
          style={styles.inputPass}
          secureTextEntry={slash}
          multiline={true}
          placeholder="Nhập Mật Khẩu"
          autoFocus={false}
          keyboardType={'numeric'}
          placeholderTextColor="#929292"
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '20%',
            height: '100%',
            marginTop: 10,
            marginLeft: 265,
          }}
          onPress={() => setslash(!slash)}>
          <Image
            source={icons.eye}
            style={{
              position: 'absolute',
              marginLeft: 25,
              marginTop: 20,
              // color: 'red',
              width: 20,
              height: 20,
              backgroundColor: 'transparent',
            }}
          />
          {slash ? (
            <Image
              source={icons.eye_close}
              style={{
                position: 'absolute',
                marginLeft: 25,
                marginTop: 20,
                // color: 'red',
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          backgroundColor: '#FFFFFF',
          marginLeft: 0,
          padding: 8,
          borderRadius: 20,
          bottom: motion5,
        }}>
        {/* <Text style={{fontWeight:'bold',fontSize: 18,color: '#929292'}}>Forgot PassWord ?</Text> */}

        <TextInput
          style={styles.inputPass}
          multiline={true}
          secureTextEntry={slash}
          placeholder="Xác Nhận Mật Khẩu"
          autoFocus={false}
          keyboardType={'numeric'}
          placeholderTextColor="#929292"
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '20%',
            height: '100%',
            marginTop: 10,
            marginLeft: 265,
          }}
          onPress={() => setslash(!slash)}>
          <Image
            source={icons.eye}
            style={{
              position: 'absolute',
              marginLeft: 25,
              marginTop: 20,
              // color: 'red',
              width: 20,
              height: 20,
              backgroundColor: 'transparent',
            }}
          />
          {slash ? (
            <Image
              source={icons.eye_close}
              style={{
                position: 'absolute',
                marginLeft: 25,
                marginTop: 20,
                // color: 'red',
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{bottom: motion6}}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.COLORS.primary,
            width: 200,
            height: 48,
            justifyContent: 'center',
            borderRadius: 28,
            marginTop: 25,
          }}
          onPress={() => {
            submit();
          }}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: 18,
              color: COLORS.black,
              textAlign: 'center',
              fontWeight: '400',
              fontStyle:'italic',
            }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{bottom: motion6}}>
      <View style={{flexDirection: 'row', width: '100%', height: 60}}>
          <Line
            lineStyle={{
              width: 100,
              position: 'relative',
              // textAlign: 'center',
              // alignItems: 'center',
              marginTop: 50,
              marginRight: 20,
            }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#929271',
              marginTop: 35,
            }}>
            OR LOGIN WITH
          </Text>
          <Line
            lineStyle={{
              width: 100,
              position: 'relative',
              // textAlign: 'center',
              // alignItems: 'center',
              marginTop: 50,
              marginLeft: 20,
            }}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Signup;

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
    padding: 10,
    backgroundColor: '#9292',
    borderRadius: 40,
    marginTop: 10,
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
    borderRadius: 40,
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
    textAlign: 'left',
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
