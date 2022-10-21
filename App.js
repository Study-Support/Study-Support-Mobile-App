import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Screens/Login/Login';
import Signup from './Screens/Login/signup';
import Home from './Screens/Dashboard/Home';
import 'react-native-gesture-handler';
import Tabs from './Screens/Dashboard/Tab';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0006d',
    alignItems: 'center',
    borderRadius: 5,
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
