import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {store} from '../../store';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  event,
  withTiming,
} from 'react-native-reanimated';
import {
  Line,
  IconButton,
  TextButton,
  Profilevalue,
  FilterUpdate,
  FilterUpdatePass,
} from '../../Components';
import {useEffect, useRef, useState} from 'react';
import {Easing, Animated} from 'react-native';
import {Logout, UpdateUser} from '../../store/actions.js';
import {
  images,
  icons,
  theme,
  COLORS,
  SIZES,
  FONTS,
} from '../../constants/index.js';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {
  GetAllClients,
  GetInfoUser,
  GetFaculitys,
  Login,
} from '../../store/actions';
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
} from '../../firebase/firebase';
import BASE_URL from '../../config';
const Profile = () => {
  const dispatch = useDispatch();
  // const user = useRef();
  // user = useSelector(state => state.Reducers.userDetail);
  const token = useSelector(state => state.Reducers.authToken);
  // console.log(token);
  const khoa = useSelector(state => state.Reducers.getFaculties);
  const [fal, setFal] = useState('');
  const user = useRef([]);
  const [urlimage, setUrlimage] = useState(null);
  const [update, setUpdate] = useState(false);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState(true);
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birday, setBirthday] = useState('');
  useEffect(() => {
    async function fetchUser() {
      await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log(response.status.toString());
            return response.json();
          }
        })
        .then(response => {
          dispatch({
            type: 'GetUserDetail',
            user: response.data,
          });
          user.current = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      if (user.current.length != 0) {
        setLoading(false);
      }
    }
    fetchUser();
    if (khoa != null && user.current != null) {
      khoa.forEach(khoa1 => {
        if (khoa1.id === user.current?.faculty_id) {
          setFal(khoa1.name);
        }
      });
      if (user.current.length != 0) {
        setName(user.current?.full_name);
        setEmail(user.current?.email);
        setPhone(user.current?.phone_number);
        setBirthday(user.current?.birthday);
        setGender(user.current?.gender === 0 ? 'Nữ' : 'Nam');
        setUrlimage(user.current?.avatar_url);
        // setFal(`${user.current?.faculty_id}`);
        // setLoading(false);
      }
      // setLoading(false);
    }
  }, [user.current, update]);
  const Updatelist = () => {
    setLoading(true);
    user.current = [];
    // setTimeout(() => {}, 1000);
    setUpdate(!update);
  };
  const filterSharevalue1 = useSharedValue(SIZES.height);
  const filterSharevalue2 = useSharedValue(SIZES.height);
  const navigation = useNavigation();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h1,
            fontSize: 28,
            fontWeight: 'bold',
            color: COLORS.black,
          }}>
          Profile
        </Text>
        <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  }
  function RenderProfileCard() {
    const UpdateAvartar = async () => {
      let source = [];
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // console.log('response', JSON.stringify(response));
          source = response;
          console.log(source.assets[0].uri);
          try {
            const response = await fetch(source.assets[0].uri);
            const blobFile = await response.blob();
            const storageRef = stRef(
              storage,
              'Files/' + `${user.current?.id}.jpg`,
            );
            await uploadBytesResumable(storageRef, blobFile);
          } catch (e) {
            console.log(e);
          }
          // const storageRef = stRef(storage, 'Files/' + `${user?.id}.jpg`);
          // uploadBytes(storageRef, response.data);
          getDownloadURL(
            stRef(storage, 'Files/' + `${user.current?.id}.jpg`),
          ).then(function (url) {
            // console.log(url);
            // setUrlimage(url);
            user.current.avatar_url = url;
            console.log(user.current);
            UpdateUser(user.current);
            // Updatelist();
            setUrlimage(url);
          });
        }
      });
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary3,
        }}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
          onPress={() => UpdateAvartar()}>
          <Image
            source={
              user.current?.avatar_url == null
                ? images.profile
                : {uri: urlimage}
            }
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Hi {name}!
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}>
            Full Stack Developer!
          </Text>
        </View>
        <TouchableOpacity
          style={{
            // flex: 1,
            width: 90,
            marginLeft: SIZES.radius,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
          onPress={() => dispatch(Logout())}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            style={{
              width: 37,
              height: 37,
            }}
          />
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.white,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function RenderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <Profilevalue
          icon={icons.profile}
          label="Name"
          value={name}
          color={COLORS.primary}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />
        <Line />

        <Profilevalue
          icon={icons.email}
          label="Email"
          value={Email}
          color={COLORS.primary}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />

        <Line />
        <Profilevalue
          icon={icons.password}
          label="Password"
          value="Update"
          color={COLORS.primary}
          onPress={() => {
            setChoose(true);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />
        <Line />

        <Profilevalue
          icon={icons.call}
          label="Contact Number"
          value={phone}
          color={COLORS.primary}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />

        <Line />

        <Profilevalue
          icon={icons.password}
          label="Gender"
          value={gender}
          color={COLORS.primary}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />

        <Line />

        <Profilevalue
          icon={icons.birthday}
          label="Ngày Sinh"
          value={birday}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />

        <Line />
        {/* {console.log(khoa.id)} */}
        <Profilevalue
          icon={icons.khoa}
          label="Khoa"
          value={fal}
          onPress={() => {
            setChoose(false);
            filterSharevalue1.value = withTiming(0, {duration: 100});
            filterSharevalue2.value = withTiming(0, {duration: 500});
          }}
        />
      </View>
    );
  }
  function renderProfileSection2() {
    return (
      <View style={styles.profileSectionContainer}>
        <Profilevalue
          icon={icons.nhanxet}
          value="Đánh Giá"
          color={COLORS.primary}
        />
        <Line />

        <Profilevalue
          icon={icons.mentor}
          label=""
          value="My Mentor"
          onPress={() => {
            navigation.navigate('Mymentor');
          }}
        />

        {/* <Line /> */}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 80,
        }}>
        {RenderProfileCard()}
        {RenderProfileSection1()}
        {renderProfileSection2()}
      </ScrollView>
      {!choose && (
        <FilterUpdate
          filterSharevalue1={filterSharevalue1}
          filterSharevalue2={filterSharevalue2}
          height={650}
          bottom={0}
          user={user.current}
          update={Updatelist}
        />
      )}
      {choose && (
        <FilterUpdatePass
          filterSharevalue1={filterSharevalue1}
          filterSharevalue2={filterSharevalue2}
          height={450}
          bottom={0}
        />
      )}
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});
