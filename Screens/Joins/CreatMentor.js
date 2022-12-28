import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, icons, FONTS, SIZES, images} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {IconButton, IconLabel, Line} from '../../Components';
import {StyleSheet} from 'react-native';
import BASE_URL from '../../config';
import {
  Creatgroups,
  DeleteMentor,
  Deletegroups,
  Updategroups,
} from '../../store/actions';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {useRef, usSetate, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
const CreatMentor = ({navigation, route}) => {
  const {selectedGroup, bank, Updatelist} = route?.params;
  let group = selectedGroup;
  // console.log(group.length);
  const [cvlink, setCvlink] = React.useState('');
  const [smartbank, setSmartbank] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  const [button, setButton] = React.useState('Đăng Kí Mentor');
  const [loading, setLoading] = React.useState(true);
  const [valuesub1, setValuesub1] = React.useState(group?.subject_id);
  const sub = useRef();
  const valuesub = useRef();
  const token = useSelector(state => state.Reducers.authToken);
  useEffect(() => {
    async function fetchData() {
      await fetch(`${BASE_URL}/mentor`, {
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
            // console.log(response);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.data.data.bank);
          setSmartbank(response.data.data.bank);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchData();
    fetch(`${BASE_URL}/subjects`, {
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
          console.log(response);
          return response.json();
        }
      })
      .then(response => {
        sub.current = response.data;
        console.log(response.data);
      })
      .catch(err => {
        console.log(err + 'NO');
      });
    if (group.length != 0) {
      console.log(group?.active == 1);
      valuesub.current = group?.subject_id;
      setValuesub1(group?.active == 1);
      setButton('Cập nhật');
      setCvlink(group?.cv_link);
      setSmartbank(bank);
      setIsFocus(true);
    }
    setLoading(false);
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  async function Updatebank() {
    await fetch(`${BASE_URL}/mentor/bank`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        smart_banking: smartbank,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          // console.log(response);
          return response.json();
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async function SignupMentor(mentor) {
    if (button == 'Đăng Kí Mentor') {
      await fetch(`${BASE_URL}/mentor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cv_link: mentor.cv_link,
          smart_banking: mentor.smartbank,
          subject_id: mentor.subject_id,
        }),
      })
        .then(response => {
          if (response.status === 200) {
            alert('Đăng Kí Mentor cho môn này thành công Chờ xét duyệt!');
            return response.json();
          } else {
            alert('Thất bại');
            console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          // console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await fetch(`${BASE_URL}/mentor/subjects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject_id: mentor.subject_id,
          cv_link: mentor.cv_link,
          id: mentor.id,
        }),
      })
        .then(response => {
          if (response.status === 200) {
            alert('Thành Công');
            return response.json();
          } else {
            alert('Thất Bại');
            console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          console.log(response.meta);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // setLoading(true);
  }
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        bottom: 0,
      }}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          // backgroundColor: 'red',
          borderRadius: 20,
          // alignItems: 'center',
          justifyContent: 'center',
          // height: 90,
          // width: '100%',
          paddingHorizontal: 8,
          marginTop: 10,
          // backgroundColor: 'red',
          alignContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            // height: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h2,
              textAlign: 'center',
              justifyContent: 'center',
              color: COLORS.primary3,
              marginLeft: 70,
            }}>
            Đăng Kí Mentor Môn Học
          </Text>
          {button == 'Cập nhật' && (
            <View>
              <IconButton
                icon={icons.xoa}
                containerStyle={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                iconStyle={{
                  width: 30,
                  height: 30,
                  tintColor: null,
                  borderRadius: 20,
                  borderColor: 'red',
                  borderWidth: 7,
                }}
                onPress={async () => {
                  await DeleteMentor(group?.subject_id);
                  navigation.goBack();
                  route.params.Updatelist();
                }}
              />
            </View>
          )}
        </View>
        <View>
          <Text
            style={{
              ...FONTS.h3,
              marginBottom: 10,
              paddingHorizontal: 2,
              color: COLORS.primary3,
            }}>
            1.Chọn Môn Bạn Muốn Đăng Kí Học
          </Text>
          <Line
            lineStyle={{
              position: 'absolute',
              marginTop: 20,
              width: '63%',
              marginLeft: 16,
              backgroundColor: COLORS.primary3,
            }}
          />
        </View>
        <View style={{padding: 10, marginTop: 10}}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sub.current}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Chọn Môn'}
            searchPlaceholder="Search..."
            value={valuesub.current}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              valuesub.current = item.id;
              console.log(valuesub.current);
              setIsFocus(true);
            }}
          />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View>
            <Text
              style={{
                ...FONTS.h3,
                marginBottom: 5,
                paddingHorizontal: 2,
                color: COLORS.primary3,
              }}>
              2.Thông Tin Mentor
            </Text>
            <Line
              lineStyle={{
                position: 'absolute',
                marginTop: 20,
                width: '35%',
                marginLeft: 16,
                backgroundColor: COLORS.primary3,
              }}
            />
          </View>
          <Text
            style={{
              ...FONTS.h3,
              // marginTop: 10,
              paddingHorizontal: 12,
              color: COLORS.primary2,
            }}>
            - Vui Lòng Gửi Link CV Cho Chúng Tôi ?
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 25,
              fontStyle: 'italic',
              fontSize: 16,
              paddingHorizontal: 15,
            }}
            numberOfLines={3}
            maxLength={100}
            editable={group?.active == 1 ? false : true}
            multiline={true}
            borderWidth={2}
            value={cvlink}
            placeholder={'link cv của bạn'}
            onChangeText={text => setCvlink(text)}
          />
          <Text
            style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
            {cvlink?.length}/100 Characters
          </Text>

          <Text
            style={{
              ...FONTS.h3,
              // marginTop: 10,
              paddingHorizontal: 12,
              color: COLORS.primary2,
            }}>
            - Vui Lòng Nhập SmartBaking !
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 25,
              fontStyle: 'italic',
              fontSize: 16,
              paddingHorizontal: 15,
            }}
            numberOfLines={3}
            maxLength={100}
            multiline={true}
            editable={group?.active == 1 ? false : true}
            borderWidth={2}
            value={smartbank}
            placeholder={'smart banking'}
            onChangeText={text => setSmartbank(text)}
          />
          <Text
            style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
            {smartbank?.length}/100 Characters
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          // height: 50,
          // backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 80,
        }}>
        {group?.active != 1 && (
          <TouchableOpacity
            style={{
              borderRadius: 25,
              backgroundColor: COLORS.primary,
              width: 120,
              height: 50,
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'green',
              borderWidth: 1,
              // marginLeft: 120,
              // position: 'absolute',
            }}
            onPress={() => {
              let mentor = {};
              mentor.cv_link = cvlink;
              mentor.smartbank = smartbank;
              mentor.subject_id = valuesub.current;
              mentor.id = group.id;
              if (smartbank.length != 0) {
                SignupMentor(mentor);
                Updatebank();
              } else {
                alert('Banking chưa nhập !');
              }
              setCvlink('');
              setSmartbank('');
              group = [];
              setIsFocus(false);
              setButton('Đăng Kí Mentor');
              valuesub.current = null;
              setLoading(true);
              navigation.goBack();
            }}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                // marginLeft: 18,
                fontSize: 14,
                fontStyle: 'italic',
                fontWeight: '600',
                color: COLORS.black,
              }}>
              {button}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
export default CreatMentor;
const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    padding: 16,
    color: COLORS.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 8,
    color: COLORS.black,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: COLORS.black,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: COLORS.black,
  },
});
