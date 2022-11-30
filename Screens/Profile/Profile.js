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
// import {FontAwesome5} from '@expo/vector-icons';
import {useEffect, useRef, useState} from 'react';
import {Easing, Animated} from 'react-native';
import {Logout} from '../../store/actions.js';
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
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Reducers.userDetail);
  // console.log(user);
  const khoa = useSelector(state => state.Reducers.getFaculties);
  const [fal, setFal] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState(true);
  const init = async () => {
    if (khoa != null && user != null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };
  useEffect(() => {
    init();
    if (khoa != null && user != null) {
      khoa.forEach(khoa => {
        if (khoa.id === user.faculty_id) {
          setFal(khoa.name);
        }
      });
      if (user.gender === 0) {
        setGender('Nữ');
      } else {
        setGender('Nam');
      }
    }
  }, []);
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
    // const user = useSelector(state => state.Reducers.userDetail);
    // console.log(user);
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
          }}>
          <Image
            source={images.profile}
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
            Hi {user.full_name}!
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
          value={user.full_name}
          color={COLORS.primary}
        />
        <Line />

        <Profilevalue
          icon={icons.email}
          label="Email"
          value={user.email}
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
          value={user.phone_number}
          color={COLORS.primary}
        />

        <Line />

        <Profilevalue
          icon={icons.password}
          label="Gender"
          value={gender}
          color={COLORS.primary}
        />

        <Line />

        <Profilevalue
          icon={icons.birthday}
          label="Ngày Sinh"
          value={user.birthday}
        />

        <Line />
        {/* {console.log(khoa.id)} */}
        <Profilevalue icon={icons.khoa} label="Khoa" value={fal} />
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

        <Profilevalue icon={icons.mentor} label="My Group" value="4" />

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
          user={user}
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
