import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
} from 'react-native';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import UIHeader from './UIHeader';
import MessengerItem from './MessengerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
} from '../../firebase/firebase';
import {IconButton} from '../../Components';

const Messenger = props => {
  const [typedText, setTypedText] = useState('');
  const [footerHeight, setFooterHeight] = React.useState(60);
  const [footerPosittion, setFooterPosition] = React.useState(0);
  const [chatHistory, setChatHistory] = useState([
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      showUrl: true,
      isSender: true,
      messenger: 'Hello',
      timestamp: 1641654238000,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      showUrl: false,
      isSender: true,
      messenger: 'How are you ?',
      timestamp: 1641654298000,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      showUrl: false,
      isSender: true,
      messenger:
        'How about your work ?. nujdhsfuhduf dhuhu uhuh uhfudhufduhu hufhfd',
      timestamp: 1641654538000,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/50.jpg',
      showUrl: true,
      isSender: false,
      messenger: 'Yes',
      timestamp: 1641654598000,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/50.jpg',
      showUrl: false,
      isSender: false,
      messenger: 'I am fine',
      timestamp: 1641654598000,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      showUrl: true,
      isSender: true,
      messenger: "Let's go out",
      timestamp: 1641654778000,
    },
  ]);
  const {url, name, userId} = props.route.params.user;
  const {navigate, goBack} = props.navigation;
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <UIHeader
        title={name}
        leftIconName={icons.back}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          alert('press right icon');
        }}
      />

      <FlatList
        style={{
          flex: 1,
        }}
        data={chatHistory}
        renderItem={({item}) => (
          <MessengerItem
            onPress={() => {
              alert(`You press item's name: ${item.timestamp}`);
            }}
            item={item}
            key={`${item.timestamp}`}
          />
        )}
      />
      {/* <TouchableOpacity
          style = {{backgroundColor: 'blue'}}
          onPress={async () => {
            if (typedText.trim().length == 0) {
              return;
            }
            let stringUser = await AsyncStorage.getItem('user');
            let myUserId = JSON.parse(stringUser).userId;
            let myFriendUserId = props.route.params.user.userId;
            let newMessengerObject = {
              url: 'https://randomuser.me/api/portraits/men/50.jpg',
              showUrl: false,
              messenger: typedText,
              timestamp: new Date().getTime(),
            };
            Keyboard.dismiss();
            firebaseSet(
              firebaseDatabaseRef(
                firebaseDatabase,
                `chats/${myUserId}-${myFriendUserId}`,
              ),
              newMessengerObject,
            ).then(() => {
              setTypedText('');
            });
          }}
        />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: footerPosittion,
          left: 0,
          right: 0,
          height: footerHeight,
          paddingHorizontal: SIZES.padding,
          paddingVertical: 5,
          backgroundColor: COLORS.gray10,
          marginBottom: 0,
        }}>
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.base,
            ...FONTS.h3,
          }}
          value={typedText}
          autoFocus={true}
          multiline
          placeholder="Type SomeThing"
          placeholderTextColor={COLORS.gray80}
          onContentSizeChange={event => {
            const height = event.nativeEvent.contentSize.height;
            if (height <= 60) {
              setFooterHeight(60);
            } else if (height > 60 && height <= 100) {
              setFooterHeight(height);
            } else if (height > 100) {
              setFooterHeight(100);
            }
          }}
          onChangeText={text1 => setTypedText(text1)}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <IconButton
            icon={icons.send}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
            }}
            onPress={async () => {
              if (typedText.trim().length == 0) {
                return;
              }
              let stringUser = user;
              let myUserId = JSON.parse(stringUser).userId;
              let myFriendUserId = props.route.params.user.userId;
              let newMessengerObject = {
                url: 'https://randomuser.me/api/portraits/men/50.jpg',
                showUrl: false,
                messenger: typedText,
                timestamp: new Date().getTime(),
              };
              Keyboard.dismiss();
              firebaseSet(
                firebaseDatabaseRef(
                  firebaseDatabase,
                  `chats/${myUserId}-${myFriendUserId}`,
                ),
                newMessengerObject,
              ).then(() => {
                setTypedText('');
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default Messenger;
