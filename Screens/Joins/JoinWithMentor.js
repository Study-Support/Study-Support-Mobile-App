import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, icons, FONTS, SIZES, images} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {IconButton, IconLabel, Line} from '../../Components';
import {StyleSheet} from 'react-native';
import BASE_URL from '../../config';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {useRef, usSetate, useEffect} from 'react';
const Creat = () => {
  const [subject, setSubject] = React.useState([]);
  const [text, setText] = React.useState('');
  const [isFocus1, setIsFocus1] = React.useState(false);
  const [isFocus2, setIsFocus2] = React.useState(false);
  let data = [];
  const sub = useRef();
  const self_study = useRef();
  const valuesub = useRef();
  const valuefal = useRef();
  const khoa = useSelector(state => state.Reducers.getFaculties);
  useEffect(() => {
    fetch(`${BASE_URL}/subjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`,
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
        sub.current = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  khoa.forEach(key => {
    data.push({key: `${key.id}`, value: `${key.name}`});
  });
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        bottom: 0,
      }}
      >
      <View
        style={{
          position: 'relative',
          // backgroundColor: 'red',
          borderRadius: 20,
          // alignItems: 'center',
          justifyContent: 'center',
          // height: 90,
          width: '100%',
          paddingHorizontal: 8,
          marginTop: 10,
          // backgroundColor: 'red',
        }}>
        {/* <View style={styles.container1}> */}
        {/* {renderLabel()} */}
        <View
          style={{
            height: 30,
          }}>
          <Text
            style={{
              ...FONTS.h2,
              textAlign: 'center',
              justifyContent: 'center',
              color: COLORS.primary3,
            }}>
            Đăng Kí Nhu Cầu
          </Text>
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
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="value"
          valueField="key"
          placeholder={!isFocus ? 'Chọn Khoa' : '...'}
          searchPlaceholder="Search..."
          value={valuefal.current}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valuefal.current = item.key;
            console.log(valuefal.current);
            data.forEach(key => {
              if (key.value === item.value) {
                console.log(key.key);
                setIsFocus(false);
                sub.current.forEach(ele => {
                  // console.log(ele);
                  if (ele.id == key.key) {
                    setSubject([ele]);
                    console.log(subject);
                  }
                });
                // console.log(subject);
              }
            });
          }}
          // renderLeftIcon={() => ()}
        />
      </View>
      <View style={{padding: 10, marginTop: 10}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={subject}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? 'Chọn Môn' : '...'}
          searchPlaceholder="Search..."
          value={valuesub.current}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valuesub.current = item.id;
            console.log(valuesub);
            setIsFocus(true);
          }}
          // renderLeftIcon={() => ()}
        />
        <Text
          style={{
            ...FONTS.h3,
            marginTop: 5,
            paddingHorizontal: 2,
            color: COLORS.primary3,
          }}>
          - Bạn Muốn Nhóm Thuộc Loại Nào ?
        </Text>
        <View style={{flexDirection: 'row', paddingHorizontal: SIZES.padding, paddingTop:5,}}>
          <IconButton
            icon={icons.checked}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: isFocus1 ? COLORS.primary : COLORS.black,
            }}
            containerStyle={{
              borderRadius: 20,
              borderWidth: 2,
            }}
            onPress={() => {
              self_study.current = 0;
              setIsFocus1(true);
              setIsFocus2(false);
            }}
          />
          <Text style={{...FONTS.h3, color: COLORS.black, marginLeft : 5,}}>- Nhóm có người hướng dẫn</Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: SIZES.padding, paddingTop : 10,}}>
          <IconButton
            icon={icons.checked}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: isFocus2 ? COLORS.primary : COLORS.black,
            }}
            containerStyle={{
              borderRadius: 20,
              borderWidth: 2,
            }}
            onPress={() => {
              self_study.current = 1;
              setIsFocus1(false);
              setIsFocus2(true);
            }}
          />
          <Text style={{...FONTS.h3, color: COLORS.black, marginLeft : 5,}}>- Nhóm tự học</Text>
        </View>
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
            2.Thông Tin Nhóm Học
          </Text>
          <Line
            lineStyle={{
              position: 'absolute',
              marginTop: 20,
              width: '40%',
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
          - Mục đích tạo nhóm học ?
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
          borderWidth={2}
          placeholder={'Khó Khăn'}
          onChangeText={text => setText(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {text.length}/100 Characters
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            ...FONTS.h3,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary2,
          }}>
          - Thông tin và mục tiêu sau khi kết thúc nhóm học ?
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
          placeholder={'Thông tin cụ thể'}
          maxLength={100}
          multiline={true}
          borderWidth={2}
          onChangeText={text => setText(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {text.length}/100 Characters
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            ...FONTS.h3,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary2,
          }}>
          - Thời Gian Học ?
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
          placeholder={'Thời gian'}
          maxLength={100}
          multiline={true}
          borderWidth={2}
          onChangeText={text => setText(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {text.length}/100 Characters
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
      <Text
          style={{
            ...FONTS.h3,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary2,
          }}>
          - Địa điểm Học ?
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
          placeholder={'Địa điểm học'}
          maxLength={100}
          multiline={true}
          borderWidth={2}
          onChangeText={text => setText(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {text.length}/100 Characters
        </Text>
      </View>
      <View style={{padding: 0 ,flexDirection : 'row', justifyContent: 'space-around'}}>
      <Text
          style={{
            ...FONTS.h3,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary2,
          }}>
          -Thêm câu hỏi duyệt thành viên vào nhóm ?
        </Text>
        <IconButton
            icon={icons.right_arrow}
            label={'Add'}
            iconStyle={{
              height: 30,
              width: 60,
              tintColor: COLORS.primary,
            }}
            containerStyle={{
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
            onPress={{

            }}
          />

      </View>
      {}
      <View style={{paddingHorizontal: 10 ,flexDirection : 'column', justifyContent: 'space-around'}}>
      <Text
          style={{
            ...FONTS.h5,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary,
          }}>
          -Bạn có đảm bảo học tập chăm chỉ nghiêm túc không ? Nếu đánh giá không tốt về thái
          độ trong quá trình học sẽ bị đánh giá rèn luyện!
        </Text>
        <TouchableOpacity onPress={() => {
              // setIcon(true);
        }}>
          <IconLabel
            icon={icons.checkbox_off_dark}
            label={'Đảm bảo'}
            iconStyle={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
            }}
            containerStyle={{
              // width : 30,
              borderRadius: 0,
              // borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>

      </View>
      {/* <View style={{padding: 10}}>
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
          borderWidth={2}
          onChangeText={text => setText(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {text.length}/100 Characters
        </Text>
      </View> */}
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
            // navigation.navigate('GroupDetail');
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
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Creat;
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
