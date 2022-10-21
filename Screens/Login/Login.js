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
// import LottieView from 'lottie-react-native';
import {images, icons, theme} from '../../constants/index.js';
import Loginani from './loginanimation';
import Signup from './signup';
import TabLayout from 'react-native-simple-tablayout';
const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const motion = useRef(new Animated.Value(-200)).current;
  const motion1 = useRef(new Animated.Value(-200)).current;
  const motion2 = useRef(new Animated.Value(-200)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const tabName = ['Login', 'Signup'];
  const Screen1 = () => {
    return (
      <View
        style={{
          flex: 1,
          width,
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <Loginani />
      </View>
    );
  };

  const Screen2 = props => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          width,
          backgroundColor: props.color,
          justifyContent: 'center',
        }}>
        <Signup />
      </View>
    );
  };
  //tab screen passed as array of screens
  const data = [<Screen1 />, <Screen2 />];
  const topMotion = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(motion, {
          toValue: 20,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion1, {
          toValue: 20,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        Animated.timing(motion2, {
          toValue: 20,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
        // Animated.loop(
        //   Animated.sequence([
        //     Animated.timing(spinValue, {
        //       toValue: 1,
        //       duration: 500,
        //       useNativeDriver: false,
        //       easing: Easing.linear,
        //     }),

        //     Animated.timing(spinValue, {
        //       toValue: -1,
        //       duration: 1000,
        //       useNativeDriver: false,
        //       easing: Easing.linear,
        //     }),

        //     Animated.timing(spinValue, {
        //       toValue: 0,
        //       duration: 500,
        //       useNativeDriver: false,
        //       easing: Easing.linear,
        //     }),
        //   ]),
        // ),
      ]).start();
    });
  });
  // const spin = spinValue.interpolate({
  //   inputRange: [-1, 0, 1],
  //   outputRange: ['-25deg', '0deg', '25deg'],
  // });
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.bg_1}
        style={{width: '100%', height: '103%', flex: 1.2}}>
        <View style={styles.container}>
          <Animated.Image
            source={images.work}
            style={{
              width: 80,
              height: 80,
              marginTop: 50,
              textAlign: 'center',
              justifyContent: 'center',
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
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}>
        <View style={{backgroundColor: '#FFFFFF', marginTop: 20}}>
          <TabLayout
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
          />
        </View>
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
            justifyContent: 'center',
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
            justifyContent: 'center',
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
            justifyContent: 'center',
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
              navigation.navigate('Tabs');
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
