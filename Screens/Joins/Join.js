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
} from '../../Components';
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
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
  constants,
} from '../../constants';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {event} from 'react-native-reanimated';
import {useRef} from 'react';
import database, {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  child,
  get,
  onValue,
} from '../../firebase/firebase';
import {Provider, useDispatch, useSelector} from 'react-redux';
const CommentSection = ({commentItem, commentOption, replies}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        // backgroundColor : 'red',
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
        }}>
        <Text style={{...FONTS.h3}}>{commentItem?.name}</Text>
        <Text style={{...FONTS.body4}}>{commentItem?.comment}</Text>
        {commentOption}
        {replies}
      </View>
    </View>
  );
};
function Discussions1(props) {
  const user = useSelector(state => state.Reducers.userDetail);
  // console.log(user.id);
  let idgroup = 1;
  const id = useRef('');
  const rep = useRef('');
  const chat = useRef();
  const [text, setText] = React.useState('');
  const [count, setCount] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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
            setLoading(false);
            chat.current = [];
            console.log('No data available');
          }
        },
      );
    }
    fetchData();
  }, []);
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
          }}>
          {chat.current && (
            <FlatList
              scrollEnabled={true}
              data={chat.current}
              keyExtractor={(item, index) => `Discussions-main-${index}`}
              contentContainerStyle={{
                paddingHorizontal: SIZES.padding,
                paddingBottom: 70,
              }}
              renderItem={({item, index}) => (
                <CommentSection
                  commentItem={item}
                  commentOption={
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        paddingVertical: SIZES.base,
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
                          // rep.current = item.no_of_comments + 1;
                          console.log(id.current);
                        }}
                      />

                      <IconsComment
                        icon={icons.time}
                        label={item?.posted_on}
                        containerStyle={{
                          paddingHorizontal: SIZES.padding,
                          paddingVertical: 0,
                          marginLeft: 16,
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
                      />
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
                                marginTop: SIZES.radius,
                                justifyContent: 'space-between',
                                paddingVertical: SIZES.base,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: COLORS.gray20,
                              }}>
                              <IconsComment
                                icon={icons.heart_off}
                                label="Like"
                                containerStyle={{
                                  paddingHorizontal: 5,
                                  // paddingVertical: 0,
                                }}
                                iconStyle={{
                                  tintColor: 'red',
                                }}
                                labelStyle={{
                                  marginLeft: 7,
                                  color: COLORS.black,
                                  ...FONTS.h4,
                                  color: COLORS.black,
                                  fontWeight: 'bold',
                                }}
                              />
                              <IconsComment
                                icon={icons.time}
                                label={item?.posted_on}
                                containerStyle={{
                                  paddingHorizontal: SIZES.padding,
                                  paddingVertical: 0,
                                  marginLeft: 16,
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
                              />
                            </View>
                          }
                        />
                      )}
                    />
                  }
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
            marginBottom: 40,
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
                let user1 = {
                  id: `${uuidv4().toString()}`,
                  iduser: `${user.id}`,
                  name: `${user.full_name}`,
                  posted_on: '6h ago',
                  comment: text.toString(),
                  url: 'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',
                };
                if (id.current === '') {
                  id.current = uuidv4().toString();
                  await firebaseSet(
                    firebaseDatabaseRef(
                      firebaseDatabase,
                      `groups/${idgroup}/${id.current}`,
                    ),
                    user1,
                  );
                } else if (rep.current === '') {
                  rep.current = uuidv4().toString();
                  await firebaseSet(
                    firebaseDatabaseRef(
                      firebaseDatabase,
                      `groups/${idgroup}/${id.current}/replies/${rep.current}`,
                    ),
                    user1,
                  );
                } else {
                  await firebaseSet(
                    firebaseDatabaseRef(
                      firebaseDatabase,
                      `groups/${idgroup}/${id.current}/replies/${rep.current}`,
                    ),
                    user1,
                  );
                }
                console.log('No');
                Keyboard.dismiss();
                setText('');
                id.current = '';
                rep.current = '';
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          // flex: 1,
          // backgroundColor: 'red',
          // padding: SIZES.radius,
          height: '100%',
        }}>
        {RenderDiscussions()}
        {RenderFooterTextInput()}
      </View>
    );
  }
}
export default Discussions1;
