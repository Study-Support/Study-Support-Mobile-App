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
import Profile from '../Profile/Profile';
import {images, icons, theme, COLORS} from '../../constants/index.js';

import CreatMentor from '../Joins/CreatMentor';
import FormInfo from '../Login/FormInfo';
import {useNavigation} from '@react-navigation/native';
import Mygroup from './Mygroup';
import JoinMentor from '../Joins/JoinWithMentor';
import Chat1 from '../Chat/Chat';
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: 'transparent'}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'transparent'}
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
        style={{flex: 1, height: 60, backgroundColor: 'transparent'}}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};
const Tabs = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.primary3,
          elevation: 0,
          borderWidth: 1,
          borderRadius: 1,
          marginBottom: 0,
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
              source={icons.houseblue2}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                borderRadius: 0,
              }}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Chat1"
        component={Chat1}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.messenger}
              style={{
                position: 'absolute',
                marginLeft: 5,
                marginTop: 10,
                width: 35,
                height: 35,
                tintColor: COLORS.primary,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor: focused ? 'transparent' : '#FFF',
              }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Mygroups"
        component={Mygroup}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.mentor}
              style={{
                position: 'absolute',
                marginLeft: 5,
                marginTop: 10,
                width: 30,
                height: 30,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor: focused ? 'transparent' : '#FFF',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.profile}
              style={{
                borderRadius: 18,
                position: 'absolute',
                marginLeft: 5,
                marginTop: 10,
                width: 30,
                height: 30,
                backgroundColor: COLORS.primary,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
