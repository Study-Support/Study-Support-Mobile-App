import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Creatgroup from './Screens/Joins/Creatgroup';
import Login from './Screens/Login/Login';
import Signup from './Screens/Login/signup';
import Home from './Screens/Dashboard/Home';
import 'react-native-gesture-handler';
import Tabs from './Screens/Dashboard/Tab';
import Chat from './Screens/Joins/Join';
// const Stack = createStackNavigator();

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {StatusBar, Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './store';
import {ActivityIndicator} from 'react-native-paper';
import {images, icons, theme, COLORS} from './constants';
import {Init} from './store/actions';
import FormInfo from './Screens/Login/FormInfo';
import Profile from './Screens/Profile/Profile';
import {useNavigation} from '@react-navigation/native';
import CourseListing from './Screens/Course/CourseListing';
import GroupDetail from './Screens/Course/GroupDetail';
import Joingroup from './Screens/Joins/Joingroup';
const Stack = createSharedElementStackNavigator();

const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 800, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 800, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const MyStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        useNativeDrive: true,
        headerShown: false,
      }}
      initialRouteName={'Tabs'}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="CourseListing"
        component={CourseListing}
        options={() => options}
      />
      <Stack.Screen
        name="Joingroup"
        component={Joingroup}
        // options={() => options}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetail}
        // options={() => options}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Creatgroup" component={Creatgroup} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="FormInfo" component={FormInfo} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  // console.log(token);
  const id = useSelector(state => state.Reducers.idUser);
  // console.log(id);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    dispatch(Init());
  };

  useEffect(() => {
    init();
    setLoading(false);
  },[]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
