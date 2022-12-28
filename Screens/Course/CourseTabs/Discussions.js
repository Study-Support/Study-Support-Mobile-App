import React from 'react';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  IconsComment,
  Line,
  CategoryCard,
  HorizontalCourseCard,
  FilterModal,
} from '../../../Components';
import {ActivityIndicator} from 'react-native-paper';
import {SharedElement} from 'react-navigation-shared-element';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
  Keyboard,
  FlatList,
} from 'react-native';
const {AsyncStorage} = require('react-native');
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
  constants,
} from '../../../constants';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {event} from 'react-native-reanimated';
import {useRef} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  child,
  get,
  onValue,
} from '../../../firebase/firebase';
import {Provider, useDispatch, useSelector} from 'react-redux';
const CommentSection = ({
  commentItem,
  commentOption,
  replies,
  user,
  onPress,
}) => {
  // console.log(user?.id);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        // backgroundColor : 'red',
        // justifyContent: 'space-between',
      }}>
      <Image
        source={{uri: commentItem?.url}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: 3,
          marginLeft: SIZES.radius,
          // backgroundColor: 'red',
          // justifyContent: 'flex-start',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{...FONTS.h3}}>{commentItem?.name}</Text>
            <Text style={{...FONTS.body4}}>{commentItem?.comment}</Text>
          </View>
          {user?.id == commentItem?.iduser && (
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onPress}>
              <IconLabel
                icon={icons.menu}
                containerStyle={
                  {
                    // marginTop: -30,
                  }
                }
                label={'Update'}
              />
            </TouchableOpacity>
          )}
        </View>
        {commentOption}
        {replies}
      </View>
    </View>
  );
};
function Discussions({idgroup}) {
  const user = useSelector(state => state.Reducers.userDetail);
  // console.log(idgroup);
  const id = useRef('');
  const rep = useRef('');
  const key = useRef(false);
  const chat = useRef();
  const [text, setText] = React.useState('');
  const [count, setCount] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(false);
  const [footerPosittion, setFooterPosition] = React.useState(0);
  const [footerHeight, setFooterHeight] = React.useState(60);
  React.useEffect(() => {
    async function fetchData() {
      // let idfake = 1;
      onValue(
        firebaseDatabaseRef(firebaseDatabase, `groups/${idgroup}`),
        async snapshot => {
          let arr = [];
          let reply = 0;
          if (snapshot.exists()) {
            let snapshotObject = snapshot;
            // console.log(snapshotObject);
            snapshotObject.forEach(ele => {
              let discussion = {};
              discussion.keyDiscussion = ele.key;
              discussion.id = ele.val().id;
              discussion.iduser = ele.val().iduser;
              discussion.name = ele.val().name;
              discussion.url = ele.val().url;
              discussion.posted_on = ele.val().posted_on;
              discussion.comment = ele.val().comment;
              let replies = [];
              if (
                ele.val().replies !== null &&
                ele.val().replies !== undefined
              ) {
                replies = Object.values(ele.val().replies);
                discussion.no_of_comments =
                  replies.length === 0 ? '' : replies.length;
              } else {
                replies = [];
                discussion.no_of_comments = '';
              }
              discussion.reply = reply == 0 ? '' : reply;
              discussion.replies = replies;
              arr.push(discussion);
              reply += 1;
              // console.log(discussion);
              // console.log(arr);
            });
            setCount(arr);
            chat.current = arr;
            setLoading(false);
            // console.log(chat.current);
            // firebaseSet(
            //   firebaseDatabaseRef(
            //     firebaseDatabase,
            //     `groups/${idgroup}/Discussion/${id}/replies${rep}`,
            //   ),
            //   {id: 3 , name : 'quang'},
            // );
          } else {
            id.current = '';
            setCount(arr);
            chat.current = arr;
            setLoading(false);
            console.log('No data available');
          }
        },
      );
    }
    fetchData();
  }, [loading]);
  // const {navigation, route} = props;
  // const {navigate, goBack} = navigation;
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  } else {
    function RenderDiscussions() {
      return (
        <View
          style={{
            flex: 1,
            //   backgroundColor: 'red',
            bottom: 30,
            marginTop: 30,
          }}>
          {chat.current && (
            <FlatList
              scrollEnabled={true}
              data={chat.current}
              keyExtractor={(item, index) => `Discussions-main-${index}`}
              contentContainerStyle={{
                paddingHorizontal: SIZES.padding,
                paddingBottom: 30,
              }}
              renderItem={({item}) => (
                <CommentSection
                  commentItem={item}
                  commentOption={
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        paddingVertical: 3,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.gray20,
                      }}>
                      <IconsComment
                        icon={icons.comment}
                        label={'comments ' + item?.no_of_comments}
                        iconStyle={{
                          width: 20,
                          height: 20,
                          tintColor: COLORS.primary2,
                        }}
                        labelStyle={{
                          marginLeft: 5,
                          color: COLORS.black,
                          ...FONTS.h4,
                        }}
                      />

                      <IconsComment
                        icon={icons.reply}
                        label={'Reply'}
                        containerStyle={{
                          paddingHorizontal: SIZES.padding,
                          paddingVertical: 0,
                          marginLeft: 12,
                        }}
                        iconStyle={{
                          width: 20,
                          height: 20,
                          tintColor: COLORS.primary,
                        }}
                        labelStyle={{
                          marginLeft: 6,
                          color: COLORS.black,
                          ...FONTS.h4,
                        }}
                        onPress={() => {
                          id.current = item.keyDiscussion;
                          setUpdate(true);
                          // firebaseSet(
                          //   firebaseDatabaseRef(
                          //     firebaseDatabase,
                          //     `groups/${idgroup}/${id.current}`,
                          //   ),
                          //   null,
                          // );
                        }}
                      />
                      <View style={{justifyContent: 'flex-start', flex: 1}}>
                        <IconsComment
                          icon={icons.time}
                          label={item?.posted_on}
                          containerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: 0,
                            marginLeft: 0,
                          }}
                          iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary,
                          }}
                          labelStyle={{
                            marginLeft: 5,
                            color: COLORS.black,
                            ...FONTS.h5,
                            fontSize: 9,
                          }}
                        />
                      </View>
                    </View>
                  }
                  replies={
                    <FlatList
                      data={item?.replies}
                      scrollEnabled={false}
                      keyExtractor={item => `Discussions-replies-${item.id}`}
                      renderItem={({item, index}) => (
                        <CommentSection
                          commentItem={item}
                          commentOption={
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                justifyContent: 'space-between',
                                // paddingVertical: SIZES.base,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: COLORS.gray20,
                              }}>
                              {user?.id == item?.iduser && (
                                <IconsComment
                                  icon={icons.xoa}
                                  label="Xóa"
                                  containerStyle={{
                                    paddingHorizontal: 5,
                                    // paddingVertical: 0,
                                  }}
                                  iconStyle={{
                                    tintColor: null,
                                    width: 30,
                                    height: 30,
                                  }}
                                  labelStyle={{
                                    marginLeft: 7,
                                    color: COLORS.black,
                                    ...FONTS.h4,
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                  }}
                                  // otherItem={item => console.log(item)}
                                  onPress={async () => {
                                    await firebaseSet(
                                      firebaseDatabaseRef(
                                        firebaseDatabase,
                                        `groups/${idgroup}/${item.parent}/replies/${item.id}`,
                                      ),
                                      null,
                                    );
                                    // console.log(item.parent);
                                    // console.log(item.id);
                                    await firebaseSet(
                                      firebaseDatabaseRef(
                                        firebaseDatabase,
                                        `groups/${idgroup}/${
                                          item.parent
                                        }/replies/${parseInt(item.id) + 1}`,
                                      ),
                                      null,
                                    );
                                  }}
                                />
                              )}
                              <IconsComment
                                icon={icons.time}
                                label={item?.posted_on}
                                containerStyle={{
                                  paddingHorizontal: SIZES.padding,
                                  paddingVertical: 0,
                                  marginLeft: 10,
                                }}
                                iconStyle={{
                                  width: 20,
                                  height: 20,
                                  tintColor: COLORS.primary,
                                }}
                                labelStyle={{
                                  marginLeft: 6,
                                  color: COLORS.black,
                                  ...FONTS.h5,
                                  fontSize: 10,
                                }}
                              />
                            </View>
                          }
                        />
                      )}
                    />
                  }
                  user={user}
                  onPress={() => {
                    key.current = true;
                    (id.current = item.keyDiscussion),
                      get(
                        firebaseDatabaseRef(
                          firebaseDatabase,
                          `groups/${idgroup}/${id.current}`,
                        ),
                      )
                        .then(res => res.toJSON())
                        .then(res => setText(res.comment));
                    setUpdate(true);
                  }}
                />
              )}
            />
          )}
        </View>
      );
    }
    function RenderFooterTextInput() {
      return (
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
            // height={50}
            // backgroundColor={COLORS.white}
            value={text}
            autoFocus={true}
            Keyboard={update}
            ref={ref => {
              if (ref !== undefined && ref && !ref.isFocused() && update) {
                ref.focus();
              }
            }}
            multiline
            onEndEditing={() => {
              // console.log('Huy');
              setUpdate(false);
            }}
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
            onChangeText={text1 => setText(text1)}
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
                let time = new Date().getTime();
                let minutes =
                  new Date().getMinutes() < 10
                    ? `0${new Date().getMinutes()}`
                    : new Date().getMinutes();
                if (key.current == false) {
                  let user1 = {
                    id: `${time}`,
                    iduser: `${user.id}`,
                    name: `${user.full_name}`,
                    posted_on: `${new Date().getHours()}:${minutes} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                    comment: text.toString(),
                    url:
                      user?.avatar_url != null
                        ? user?.avatar_url
                        : 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
                  };
                  if (id.current === '') {
                    id.current = `${new Date().getTime()}`;
                    await firebaseSet(
                      firebaseDatabaseRef(
                        firebaseDatabase,
                        `groups/${idgroup}/${id.current}`,
                      ),
                      user1,
                    );
                  } else {
                    rep.current = `${new Date().getTime()}`;
                    user1.parent = id.current;
                    await firebaseSet(
                      firebaseDatabaseRef(
                        firebaseDatabase,
                        `groups/${idgroup}/${id.current}/replies/${rep.current}`,
                      ),
                      user1,
                    );
                  }
                  // console.log('No');
                } else {
                  // console.log(text.length);
                  if (text.length == 0) {
                    await firebaseSet(
                      firebaseDatabaseRef(
                        firebaseDatabase,
                        `groups/${idgroup}/${id.current}`,
                      ),
                      null,
                    );
                  } else if (id.current != '') {
                    await firebaseSet(
                      firebaseDatabaseRef(
                        firebaseDatabase,
                        `groups/${idgroup}/${id.current}/comment`,
                      ),
                      text,
                    );
                  }
                }
                key.current = false;
                Keyboard.dismiss();
                setText('');
                id.current = '';
                rep.current = '';
                setUpdate(false);
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          // padding: SIZES.radius,
          height: '100%',
          width: '100%',
        }}>
        {RenderDiscussions()}
        {RenderFooterTextInput()}
      </View>
    );
  }
}
export default Discussions;
