import {StatusBar} from 'expo-status-bar';
import {
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Line from '../../Components/Line.js';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {images, icons, theme, COLORS} from '../../constants/index.js';
// import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {Login} from '../../store/actions.js';
import {err} from 'react-native-svg/lib/typescript/xml.js';
import {axios} from 'axios';
const Loginani = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submit = () => {
    dispatch(Login(username, password));
  };
  const topMotion = useRef(new Animated.Value(900)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const motion = useRef(new Animated.Value(-100)).current;
  const motion1 = useRef(new Animated.Value(-100)).current;
  const motion2 = useRef(new Animated.Value(-100)).current;
  const [slash, setslash] = useState(true);
  const motion3 = useRef(new Animated.Value(-100)).current;
  const motion4 = useRef(new Animated.Value(-100)).current;
  const motion5 = useRef(new Animated.Value(-100)).current;
  const motion6 = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    setTimeout(() => {
      // Animated.loop(
      Animated.parallel([
        Animated.timing(topMotion, {
          toValue: 260,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion, {
          toValue: 190,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion1, {
          toValue: 190,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion2, {
          toValue: 190,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion3, {
          toValue: 50,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion4, {
          toValue: 40,
          duration: 700,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion5, {
          toValue: 35,
          duration: 800,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(motion6, {
          toValue: 70,
          duration: 1000,
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
      // ).start();
    });
  }, [
    motion,
    motion1,
    motion2,
    motion3,
    motion4,
    motion5,
    motion6,
    spinValue,
    topMotion,
  ]);

  const spin = spinValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-45deg', '0deg', '45deg'],
  });
  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView behavior={Platform.OS==='ios'? padding : "height"} keyboardVerticalOffset={0}> */}
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
          value={username}
          maxLength={30}
          placeholder="Nhập Tài Khoản"
          autoFocus={false}
          textAlign={'center'}
          keyboardType={'email-address'}
          placeholderTextColor="#929292"
          onChangeText={text => setUsername(text)}
        />
        <Image
          source={icons.email}
          style={{
            position: 'absolute',
            marginLeft: 20,
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
          secureTextEntry={false}
          multiline={true}
          maxLength={50}
          value={password}
          placeholder="Nhập Mật Khẩu"
          autoFocus={false}
          textAlign={'center'}
          keyboardType={'name-phone-pad'}
          placeholderTextColor="#929292"
          onChangeText={text => setPassword(text)}
        />
        <Image
          source={icons.password}
          style={{
            position: 'absolute',
            marginLeft: 20,
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
              marginLeft: 55,
              marginTop: 25,
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
                marginLeft: 55,
                marginTop: 25,
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
          marginLeft: 160,
          padding: 8,
          borderRadius: 20,
          marginBottom: 40,
          bottom: motion5,
        }}>
        <TouchableOpacity style={{backgroundColor: '#FFFFFF'}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: theme.COLORS.primary2,
              marginTop: -15,
              marginBottom: 10,
              marginLeft: 20,
            }}>
            Forgot PassWord ?
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{bottom: motion6}}>
        <TouchableOpacity
          style={{
            // backgroundColor: '#FF814C',
            backgroundColor: COLORS.primary,
            width: 200,
            height: 48,
            justifyContent: 'center',
            borderRadius: 28,
            marginTop: 58,
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
            LOGIN
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
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default Loginani;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    // backgroundColor: 'red',
    position: 'relative',
    alignItems: 'center',
    borderRadius: 1,
  },
  inputPass: {
    width: 350,
    color: '#000',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#9292',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',
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
