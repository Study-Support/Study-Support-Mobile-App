import react from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Home from './Home';
// import Dasboard from './Dasborad';
import Svg, {Path} from 'react-native-svg';
import {images, icons, theme, COLORS} from '../../constants/index.js';
import Login from '../Login/Login';
import Loginani from '../Login/loginanimation';
import Signup from '../Login/signup';
const Tab = createBottomTabNavigator();

const TabBarCustomButton =  ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return  (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: 'transparent'}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'#FFFFFF'}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: 'transparent'}} />
        </View>
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#9292',
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{flex: 1, height: 60, backgroundColor: '#FFFFFF'}}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};
const Tabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          elevation: 0,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 5,
        },
        tabBarShowLabel: false,
        tabBarShowHeader: false,
        headerShown: false,
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.house}
              style={{position: 'absolute',
              width: 25,
              height: 25,
            borderRadius:12,
            }}
            />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search1}
              style={{position: 'absolute', marginLeft: 5, marginTop: 10, width: 35, height:35,backgroundColor: focused ? 'transparent' : '#FFF'}}

            />
          ),
        }}></Tab.Screen>
    <Tab.Screen
        name="Loginani"
        component={Loginani}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.staff_pick}
              style={{position: 'absolute', marginLeft: 5, marginTop: 10, width: 35, height:35,backgroundColor: focused ? 'transparent' : '#FFF'}}

            />
          ),
        }}></Tab.Screen>
        <Tab.Screen
        name="Signup"
        component={Signup}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.profile}
              style={{borderRadius:18,position: 'absolute', marginLeft: 5, marginTop: 10, width: 35, height:35,backgroundColor: focused ? 'transparent' : COLORS.primary2}}

            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
