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
const ProfileMentor = ({route}) => {
  const id = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.Reducers.authToken);
  const khoa = useSelector(state => state.Reducers.getFaculties);
  const [fal, setFal] = useState('');
  const [mentors, setMentors] = useState(null);
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
    async function fetchDetailMentor() {
      await fetch(`${BASE_URL}/mentors/${id}`, {
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
          setMentors(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchDetailMentor();
    setLoading(false);
    if (mentors != null || mentors != undefined) {
      setLoading(false);
    }
  }, [update]);
  const Updatelist = () => {
    setLoading(true);
    // setTimeout(() => {}, 1000);
    setUpdate(!update);
  };
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
            textAlign: 'center',
          }}>
          Mentor Information
        </Text>
        {/* <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        /> */}
      </View>
    );
  }
  function RenderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}>
          <Image
            source={
              mentors?.avatar_url == null
                ? images.profile
                : {uri: mentors?.avatar_url}
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
            {mentors?.full_name}!
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}>
            {mentors?.faculty}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.primary3,
              ...FONTS.h2,
            }}>
            Rating
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}>
            {mentors?.rating?.slice(0, 4)}
          </Text>
          <IconButton
            icon={icons.star}
            iconStyle={{
              tintColor: COLORS.primary2,
            }}
            containerStyle={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.base,
            }}
          />
        </View>
      </View>
    );
  }
  function RenderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.h2,
            textAlign: 'center',
          }}>
          {' '}
          Môn Làm Mentor : {mentors?.number_of_subjects}
        </Text>
        {mentors?.subjects.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
              }}
              key={`Subjects -${index}`}>
              <Profilevalue
                icon={icons.nhanxet}
                value={item?.name}
                color={COLORS.primary}
              />
              <Line />
            </View>
          );
        })}
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
        {mentors?.ratings.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              key={`Ratings -${index}`}>
              <Text style={{...FONTS.h3, color: COLORS.primary3}}>
                {index + 1}. {item?.group}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.primary3}}>
                Người đánh giá : {item?.account_from}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.primary3}}>
                Nhận Xét : {item?.comment}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.primary3}}>
                Đánh Giá : {item?.rating}
              </Text>
            </View>
          );
        })}
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
    </View>
  );
};
export default ProfileMentor;
const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});
