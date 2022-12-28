import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
} from '../../Components';
import UIHeader from './UIHeader';
import ChatItem from './ChatItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  child,
  get,
  onValue,
} from '../../firebase/firebase';
import BASE_URL from '../../config';
import {Provider, useSelector} from 'react-redux';
const Chat1 = props => {
  const [users, setUsers] = useState([
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      name: 'Amanda Weler',
      message: 'Hello, how are you ?',
      numberOfUnreadMessages: 3,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      name: 'Amanda Weler',
      message: 'Hello, how are you ?',
      numberOfUnreadMessages: 1,
    },
  ]);
  const token = useSelector(state => state.Reducers.authToken);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  useEffect(() => {
    async function fetchRating() {
      await fetch(`${BASE_URL}/rate`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data);
            return response.json();
          } else {
            console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.data.data);
          return response;
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchRating();
    onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = snapshot.val();
        let stringUser = await AsyncStorage.getItem('user');
        let myUserId = JSON.parse(stringUser).userId;
        setUsers(
          Object.keys(snapshotObject)
            .filter(item => item != myUserId)
            .map(eachKey => {
              let eachObject = snapshotObject[eachKey];
              return {
                url: 'https://www.w3schools.com/howto/img_avatar.png',
                name: eachObject.name,
                numberOfUnreadMessages: 0,
                userId: eachKey,
              };
            }),
        );
      } else {
        console.log('No data available');
      }
    });
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <UIHeader
          title={'Messengers'}
          leftIconName={icons.back}
          rightIconName={icons.search}
          onPressLeftIcon={() => {
            alert('press left icon');
          }}
          onPressRightIcon={() => {
            alert('press right icon');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingStart: 10,
          }}
        />
        {/* <Text
          style={{
            color: COLORS.primary2,
            fontSize: 18,
            marginStart: 10,
          }}>
          {users.length}
        </Text> */}
      </View>
      <FlatList
        style={{}}
        data={users}
        renderItem={({item}) => (
          <ChatItem
            onPress={() => {
              navigation.navigate('Messenger', {user: item});
            }}
            user={item}
            key={item.url}
          />
        )}
      />
    </View>
  );
};
export default Chat1;
