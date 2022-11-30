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
} from '../../../constants';
import {TextInput} from 'react-native-gesture-handler';
import {event} from 'react-native-reanimated';
const CommentSection = ({commentItem, commentOption, replies}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
      }}>
      <Image
        source={commentItem?.profile}
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
const Discussions = () => {
  const [footerPosittion, setFooterPosition] = React.useState(0);
  const [footerHeight, setFooterHeight] = React.useState(60);
  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setFooterPosition(e.endCoordinates.height);
    });
    const HideSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setFooterPosition(0);
    });
    return () => {
      showSubscription.remove();
      HideSubscription.remove();
    };
  }, []);
  function renderDiscussions() {
    return (
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'red',
        }}>
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={item => `Discussions-main-${item.id}`}
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
                    label={item?.no_of_comments}
                    iconStyle={{
                      width: 20,
                      height: 20,
                      tintColor: COLORS.black,
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: COLORS.black,
                      ...FONTS.h4,
                    }}
                  />

                  <IconsComment
                    icon={icons.heart}
                    label={item?.no_of_likes}
                    containerStyle={{
                      paddingHorizontal: SIZES.base,
                      paddingVertical: 0,
                    }}
                    iconStyle={{
                      width: 20,
                      height: 20,
                      tintColor: 'red',
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: COLORS.black,
                      ...FONTS.h4,
                    }}
                  />

                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      ...FONTS.h4,
                    }}>
                    {item.posted_on}
                  </Text>
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
                            paddingVertical: SIZES.base,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: COLORS.gray20,
                          }}>
                          <IconsComment
                            icon={icons.reply}
                            label="Reply"
                            containerStyle={{
                              paddingHorizontal: SIZES.base,
                              paddingVertical: 0,
                            }}
                            iconStyle={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.gray30,
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
                            icon={icons.heart_off}
                            label="Like"
                            containerStyle={{
                              paddingHorizontal: 5,
                              // paddingVertical: 0,
                            }}
                            iconStyle={{
                              tintColor: 'black',
                            }}
                            labelStyle={{
                              marginLeft: 7,
                              color: COLORS.black,
                              ...FONTS.h4,
                              color: COLORS.black,
                              fontWeight: 'bold',
                            }}
                          />
                          <Text
                            style={{
                              flex: 1,
                              textAlign: 'right',
                              ...FONTS.h4,
                              color: COLORS.black,
                              fontWeight: 'bold',
                            }}>
                            {item.posted_on}
                          </Text>
                        </View>
                      }
                    />
                  )}
                />
              }
            />
          )}
        />
      </View>
    );
  }
  function renderFooterTextInput() {
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
        }}>
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.base,
            ...FONTS.h3,
          }}
          // height={50}
          // backgroundColor={COLORS.white}
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
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <IconButton
            icon={icons.send}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
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
        padding: SIZES.padding,
        height: '100%',
      }}>
      {renderDiscussions()}
      {renderFooterTextInput()}
    </View>
  );
};
export default Discussions;
