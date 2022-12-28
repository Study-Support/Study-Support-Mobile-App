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
import Home from './Screens/Dashboard/Home';
import 'react-native-gesture-handler';
import Tabs from './Screens/Dashboard/Tab';
import Mymentor from './Screens/Joins/MyMentor';
import Chat1 from './Screens/Chat/Chat';
import Messenger from './Screens/Chat/Messenger';
import ProfileMentor from './Screens/Joins/Showmentor';
// const Stack = createStackNavigator();

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import JoinMentor from './Screens/Joins/JoinWithMentor';
import CreatMentor from './Screens/Joins/CreatMentor';
import {
  NotoficationListener,
  requestUserPermission,
} from './Screens/PushNotifi/pushnotification';
import Pdf1 from './Screens/Course/CourseTabs/pdf';
import Groupmember from './Screens/Joins/Groupmember';
import Mentorlist from './Screens/Course/Mentorlist';
import Rating from './Screens/Course/CourseTabs/Rating';
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
        name="Chat1"
        component={Chat1}
        // options={() => options}
      />
      <Stack.Screen
        name="Creatgroup"
        component={Creatgroup}
        // options={() => options}
      />
      <Stack.Screen
        name="JoinMentor"
        component={JoinMentor}
        // options={() => options}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetail}
        // options={() => options}
      />
      <Stack.Screen
        name="Pdf1"
        component={Pdf1}
        // options={() => options}
      />
      <Stack.Screen
        name="Joingroup"
        component={Joingroup}
        // options={() => options}
      />
      <Stack.Screen
        name="Mentorlist"
        component={Mentorlist}
        // options={() => options}
      />
      <Stack.Screen
        name="ProfileMentor"
        component={ProfileMentor}
        // options={() => options}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        // options={() => options}
      />
      <Stack.Screen
        name="Groupmember"
        component={Groupmember}
        // options={() => options}
      />
      <Stack.Screen name="CreatMentor" component={CreatMentor} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Mymentor" component={Mymentor} />
      <Stack.Screen name="Messenger" component={Messenger} />
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
    requestUserPermission();
    NotoficationListener();
    init();
    setLoading(false);
  }, []);

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
