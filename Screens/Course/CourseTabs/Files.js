import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  event,
  withDelay,
  withTiming,
  runOnJS,
  ColorSpace,
} from 'react-native-reanimated';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
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
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
  constants,
} from '../../../constants';
import {
  firebaseDatabase,
  firebaseSet,
  firebaseDatabaseRef,
  child,
  get,
  onValue,
  storage,
  stRef,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from '../../../firebase/firebase';
import DocumentPicker from 'react-native-document-picker';
import DocumentPickerUtil, {types} from 'react-native-document-picker';
import BASE_URL from '../../../config';
import {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';
import Pdf from 'react-native-pdf';
const Files = ({idgroup}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.Reducers.userDetail);
  const [dummyData1, setDummyData1] = useState([]);
  React.useEffect(() => {
    async function fetchData() {
      onValue(
        firebaseDatabaseRef(firebaseDatabase, `Files/${idgroup}`),
        async snapshot => {
          let arr = [];
          if (snapshot.exists()) {
            let snapshotObject = snapshot;
            // console.log(snapshotObject);
            snapshotObject.forEach(ele => {
              let file = {};
              file.id = ele.val().id;
              file.iduser = ele.val().iduser;
              file.name = ele.val().name;
              file.author = ele.val().author;
              file.upload_date = ele.val().posted_on;
              file.thumbnail =
                ele.val().name.slice(-1) == 'f'
                  ? require('../../../assets/images/pdf.png')
                  : require('../../../assets/images/doc.png');
              file.uri = ele.val().uri;
              arr.push(file);
            });
            setDummyData1(arr);
          } else {
            console.log('No data available');
          }
          // console.log(arr);
        },
      );
    }
    fetchData();
  }, []);
  const Uploadfile = useCallback(async () => {
    let source = [];
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      source = response;
      // console.log(source[0].uri);
      let id = new Date().getTime();
      const response1 = await fetch(source[0].uri);
      const blobFile = await response1.blob();
      const storageRef = stRef(storage, 'Files/' + `${source[0].name}`);
      await uploadBytesResumable(storageRef, blobFile);
      getDownloadURL(stRef(storage, 'Files/' + `${source[0].name}`)).then(
        async function (url) {
          let time = new Date().getTime();
          let file = {
            id: time,
            iduser: `${user.id}`,
            name: `${source[0].name}`,
            author: `${user.full_name}`,
            posted_on: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            uri: url,
          };
          await firebaseSet(
            firebaseDatabaseRef(firebaseDatabase, `Files/${idgroup}/${time}`),
            file,
          );
          alert('Upload Thành Công !');
        },
      );
    } catch (err) {
      console.log(err);
    }
  }, []);
  function renderMembers() {
    let members = [];
    if (dummyData?.course_details?.students.length > 3) {
      members = dummyData?.course_details?.students.slice(0, 3);
    } else {
      members = dummyData?.course_details?.students;
    }

    return (
      <View>
        <Text
          style={{
            ...FONTS.h2,
            fontSize: 25,
          }}>
          Members
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}>
          {members?.map((item, index) => {
            return (
              <View
                key={`Members-${index}`}
                style={{
                  marginLeft: index > 0 ? SIZES.radius : 0,
                }}>
                <Image
                  source={item?.thumbnail}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
            );
          })}
          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h2,
              }}
              contentContainerStyle={{
                marginLeft: SIZES.padding,
                backgroundColor: 'transparent',
              }}
            />
          )}
        </View>
      </View>
    );
  }
  function renderFiles() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h2, fontSize: 25}}>Files</Text>
          <IconButton
            icon={icons.upload}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            iconStyle={{
              width: 40,
              height: 40,
              tintColor: null,
              borderRadius: 20,
              borderColor: 'red',
              // borderWidth: 7,
              marginBottom: 15,
            }}
            onPress={() => Uploadfile()}
          />
        </View>
        {dummyData1.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{
                flexDirection: 'row',
                marginTop: SIZES.radius,
              }}>
              <Image
                source={item?.thumbnail}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}
                onPress={() => {
                  navigation.navigate('Pdf1', {uri1: item?.uri});
                }}>
                <Text style={{...FONTS.h2}}>{item?.name}</Text>
                <Text style={{...FONTS.body3, color: COLORS.gray30}}>
                  {item?.author}
                </Text>
                <Text style={{...FONTS.body4}}>{item?.upload_date}</Text>
              </TouchableOpacity>
              {item?.iduser == user?.id && (
                <IconButton
                  icon={icons.menu}
                  iconStyle={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.black,
                  }}
                  containerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                  onPress={async () => {
                    await firebaseSet(
                      firebaseDatabaseRef(
                        firebaseDatabase,
                        `Files/${idgroup}/${item.id}`,
                      ),
                      null,
                    );
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}>
      {renderMembers()}
      {renderFiles()}
    </ScrollView>
  );
};
export default Files;
