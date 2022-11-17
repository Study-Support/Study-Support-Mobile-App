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
  FilterModal,
} from '../../Components';
// import {FontAwesome5} from '@expo/vector-icons';
import {useEffect, useRef, useState} from 'react';
import {Easing, Animated} from 'react-native';
import {useDispatch} from 'react-redux';
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
const Profile = () => {
  const filterSharevalue1 = useSharedValue(SIZES.height);
  const filterSharevalue2 = useSharedValue(SIZES.height);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  function renderProfileCard() {
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
            Hi NhatQuang!
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
  function renderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <Profilevalue
          icon={icons.profile}
          label="Name"
          value="Tran Nhat Quang"
          color={COLORS.primary}
        />
        <Line />

        <Profilevalue
          icon={icons.email}
          label="Email"
          value="nhatquangtran135@gmail.com"
          color={COLORS.primary}
          onPress={() => {
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
        />
        <Line />

        <Profilevalue
          icon={icons.call}
          label="Contact Number"
          value="0935267739"
          color={COLORS.primary}
        />

        <Line />

        <Profilevalue
          icon={icons.password}
          label="Password"
          value="Update"
          color={COLORS.primary}
        />

        <Line />

        <Profilevalue
          icon={icons.birthday}
          label="Ngày Sinh"
          value="02/01/2001"
        />

        <Line />

        <Profilevalue
          icon={icons.khoa}
          label="Khoa"
          value="Công Nghệ Thông Tin"
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
        {renderProfileCard()}
        {renderProfileSection1()}
        {renderProfileSection2()}
      </ScrollView>
      <FilterModal
        filterSharevalue1={filterSharevalue1}
        filterSharevalue2={filterSharevalue2}
        height={400}
        bottom={200}
      />
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
