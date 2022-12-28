import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, icons, FONTS, SIZES, images} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {IconButton, IconLabel, Line} from '../../Components';
import {StyleSheet} from 'react-native';
import BASE_URL from '../../config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Creatgroups, Deletegroups, Updategroups} from '../../store/actions';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {useRef, usSetate, useEffect} from 'react';
import {useMemo} from 'react';
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
const Creatgroup = ({navigation, route}) => {
  const {selectedGroup} = route?.params;
  const time = new Date().getTime();
  // console.log(selectedGroup);
  let group = selectedGroup;
  const [mucdich, setMucdich] = React.useState('');
  const [urlimage, setUrlimage] = React.useState(null);
  const [thongtin, setThongtin] = React.useState('');
  const [thoigian, setThoigian] = React.useState('');
  const [diadiem, setDiadiem] = React.useState('');
  const [survey1, setSurvey1] = React.useState('');
  const [survey2, setSurvey2] = React.useState('');
  const [survey3, setSurvey3] = React.useState('');
  const [survey4, setSurvey4] = React.useState('');
  const [survey5, setSurvey5] = React.useState('');
  const myanswers = useRef([]);
  myanswers.current = group?.survey_questions;
  // console.log(myanswers.current);
  const [isFocus1, setIsFocus1] = React.useState(false);
  const [isFocus2, setIsFocus2] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [questions, setQuestions] = React.useState('');
  const [button, setButton] = React.useState('Đăng Kí');
  const survey_questions = useRef([{}, {}, {}, {}, {}]);
  // console.log(survey_questions.current[0]);
  let question = useRef([]);
  const [num, setNum] = React.useState(() => 0);
  let i = num;
  let data = [];
  const sub = useRef();
  const self_study = useRef();
  const valuesub = useRef();
  const valuefal = useRef();
  const khoa = useSelector(state => state.Reducers.getFaculties);
  // console.log(khoa);
  const token = useSelector(state => state.Reducers.authToken);
  useEffect(() => {
    // console.log(group);
    if (group != undefined && group.length != 0) {
      setAgree(true);
      setMucdich(group?.topic);
      setThongtin(group?.information);
      setDiadiem(group?.location_study);
      setThoigian(group?.time_study);
      setButton('Cập Nhật');
      setUrlimage(group?.image_url);
      self_study.current = group?.self_study;
      setIsFocus(true);
      if (self_study.current == 0) {
        setIsFocus1(true);
        setIsFocus2(false);
      } else {
        setIsFocus1(false);
        setIsFocus2(true);
      }
      sub.current = khoa.find(ele => ele.id === group?.faculty_id)?.subjects;
      valuefal.current = group?.faculty_id;
      valuesub.current = group?.subject_id;
    } else {
      setButton('Đăng Kí');
    }
  }, []);
  khoa.forEach(key => {
    data.push({key: key.id, value: `${key.name}`});
  });
  // console.log(data);
  const [isFocus, setIsFocus] = React.useState(false);
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
            'groups/ImageBackground/' + `${time}.jpg`,
          );
          await uploadBytesResumable(storageRef, blobFile);
        } catch (e) {
          console.log(e);
        }
        getDownloadURL(
          stRef(storage, 'groups/ImageBackground/' + `${time}.jpg`),
        ).then(function (url) {
          console.log(url);
          setUrlimage(url);
        });
      }
    });
  };
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
        <View
          style={{
            height: 30,
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
              marginLeft: 100,
            }}>
            Đăng Kí Nhu Cầu
          </Text>
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
                if (group != undefined && group.length != 0) {
                  await Deletegroups(group?.id);
                  route.params.Updatelist();
                  navigation.goBack();
                } else {
                  navigation.goBack();
                }
              }}
            />
          </View>
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
          placeholder={'Chọn Khoa'}
          searchPlaceholder="Search..."
          value={valuefal.current}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valuefal.current = item.key;
            // console.log(valuefal.current);
            khoa.forEach(key => {
              if (key.id == item.key) {
                console.log(key.subjects);
                sub.current = key.subjects;
                setIsFocus(false);
              }
            });
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
          placeholder={!isFocus ? 'Chọn Môn' : '...'}
          searchPlaceholder="Search..."
          value={valuesub.current}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valuesub.current = item.id;
            console.log(valuesub.current);
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
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            paddingTop: 5,
          }}>
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
              // console.log(self_study.current);
              setIsFocus1(true);
              setIsFocus2(false);
            }}
          />
          <Text style={{...FONTS.h3, color: COLORS.black, marginLeft: 5}}>
            - Nhóm có người hướng dẫn
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            paddingTop: 10,
          }}>
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
          <Text style={{...FONTS.h3, color: COLORS.black, marginLeft: 5}}>
            - Nhóm tự học
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            // backgroundColor: 'red',
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 300,
            marginTop: 100,
          }}
          onPress={() => {
            UpdateAvartar();
          }}>
          <Image
            source={urlimage == null ? images.uploadphoto : {uri: urlimage}}
            style={{
              position: 'relative',
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
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
          defaultValue={group?.topic}
          placeholder={'Mục đích'}
          onChangeText={text => setMucdich(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {mucdich?.length}/100 Characters
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
          defaultValue={group?.information}
          multiline={true}
          borderWidth={2}
          onChangeText={text => setThongtin(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {thongtin?.length}/100 Characters
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
          defaultValue={group?.time_study}
          borderWidth={2}
          onChangeText={text => setThoigian(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {thoigian?.length}/100 Characters
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
          defaultValue={group?.location_study}
          borderWidth={2}
          onChangeText={text => setDiadiem(text)}
        />
        <Text
          style={{color: COLORS.gray80, textAlign: 'right', marginRight: 10}}>
          {diadiem?.length}/100 Characters
        </Text>
      </View>
      {button == 'Đăng Kí' && (
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
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
            icon={icons.add}
            label={'Add'}
            iconStyle={{
              height: 30,
              width: 30,
              tintColor: null,
            }}
            containerStyle={{
              borderRadius: 10,
              borderWidth: 0,
              borderColor: COLORS.primary,
            }}
            onPress={() => {
              if (i < 5) {
                setNum(i + 1);
              }
              // setRenderTasks(() => taskcreate(0));
            }}
          />
        </View>
      )}
      {button == 'Cập Nhật' && (
        <View
          style={{
            padding: 10,
            // flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h2,
              // marginTop: 10,
              paddingHorizontal: 2,
              color: COLORS.primary3,
            }}>
            Survey-Question
          </Text>
          {group?.survey_questions?.map((item, index) => {
            return (
              <View
                key={`Question-${index}`}
                style={{
                  flex: 1,
                  marginTop: 10,
                  // backgroundColor: 'red',
                  width: '100%',
                }}>
                <View style={{paddingHorizontal: 10}}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      // marginTop: 10,
                      paddingHorizontal: 2,
                      color: COLORS.primary2,
                    }}>
                    Câu hỏi số {index + 1}
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
                    onEndEditing={() => {
                      if (index == 0) {
                        myanswers.current[index].content = survey1;
                      } else if (index == 1) {
                        myanswers.current[index].content = survey2;
                      } else if (index == 2) {
                        myanswers.current[index].content = survey3;
                      } else if (index == 3) {
                        myanswers.current[index].content = survey4;
                      } else if (index == 4) {
                        myanswers.current[index].content = survey5;
                      }
                      console.log(myanswers.current);
                    }}
                    defaultValue={
                      myanswers.current.find(ele => ele.id === item.id)?.content
                    }
                    multiline={true}
                    borderWidth={2}
                    onChangeText={text => {
                      if (index == 0) {
                        setSurvey1(text);
                      } else if (index == 1) {
                        setSurvey2(text);
                      } else if (index == 2) {
                        setSurvey3(text);
                      } else if (index == 3) {
                        setSurvey4(text);
                      } else if (index == 4) {
                        setSurvey5(text);
                      }
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.gray80,
                      textAlign: 'right',
                      marginRight: 10,
                    }}>
                    {thongtin?.length}/100 Characters
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
      {/* {question.map((item, index) => {
        return (
          <View
            key={`Question-${index}`}
            style={{
              flex: 1,
              marginTop: 10,
            }}>
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
                defaultValue={group?.information}
                multiline={true}
                borderWidth={2}
                onChangeText={text => setThongtin(text)}
              />
              <Text
                style={{
                  color: COLORS.gray80,
                  textAlign: 'right',
                  marginRight: 10,
                }}>
                {thongtin?.length}/100 Characters
              </Text>
            </View>
          </View>
        );
      })} */}
      {/* {renderTasks} */}
      {[...Array(i)].map((el, index) => {
        return (
          <View
            key={`Question-${index + 1}`}
            style={{
              flex: 1,
              marginTop: 10,
            }}>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  ...FONTS.h3,
                  // marginTop: 10,
                  paddingHorizontal: 2,
                  color: COLORS.primary2,
                }}>
                Question-{index + 1}
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
                // placeholder={'Thông tin cụ thể'}
                maxLength={100}
                // value={survey1}
                // defaultValue={surval.current[index]}
                multiline={true}
                borderWidth={2}
                onChangeText={text => {
                  if (index == 0) {
                    setSurvey1(text);
                  } else if (index == 1) {
                    setSurvey2(text);
                  } else if (index == 2) {
                    setSurvey3(text);
                  } else if (index == 3) {
                    setSurvey4(text);
                  } else if (index == 4) {
                    setSurvey5(text);
                  }
                }}
                onEndEditing={() => {
                  if (index == 0) {
                    survey_questions.current[index].question = survey1;
                  } else if (index == 1) {
                    survey_questions.current[index].question = survey2;
                  } else if (index == 2) {
                    survey_questions.current[index].question = survey3;
                  } else if (index == 3) {
                    survey_questions.current[index].question = survey4;
                  } else if (index == 4) {
                    survey_questions.current[index].question = survey5;
                  }
                  console.log(survey_questions.current);
                }}
              />
            </View>
          </View>
        );
      })}
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            // marginTop: 10,
            paddingHorizontal: 2,
            color: COLORS.primary,
          }}>
          -Bạn có đảm bảo học tập chăm chỉ nghiêm túc không ? Nếu đánh giá không
          tốt về thái độ trong quá trình học sẽ bị đánh giá rèn luyện!
        </Text>
        <TouchableOpacity
          onPress={() => {
            setAgree(!agree);
          }}>
          <IconLabel
            icon={icons.checkbox_off_dark}
            label={'Đảm bảo'}
            iconStyle={{
              height: 20,
              width: 20,
              tintColor: agree ? COLORS.primary : COLORS.black,
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
      {agree && (
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
            onPress={async () => {
              if (i < 1) {
                alert('Bạn phải có ít nhất 1 survey-question');
              }
              let creat = {};
              // console.log(agree);
              creat.confirm = agree ? 1 : 0;
              creat.faculty_id = valuefal.current;
              creat.information = thongtin;
              creat.location_study = diadiem;
              creat.self_study = self_study.current;
              creat.subject_id = valuesub.current;
              creat.survey_questions = [];
              if (button == 'Đăng Kí') {
                survey_questions.current.forEach(ele => {
                  // console.log(ele.question);
                  if (ele.question != undefined) {
                    creat.survey_questions.push(ele);
                  }
                });
              } else {
                creat.survey_questions = myanswers.current;
              }
              creat.time_study = thoigian;
              creat.topic = mucdich;
              creat.id = group?.id;
              creat.image_url = urlimage;
              console.log(creat);
              if (button == 'Đăng Kí') {
                await Creatgroups(creat);
                navigation.goBack();
              } else {
                await Updategroups(creat);
                route.params.Updatelist();
              }
              setAgree(false);
              survey_questions.current = [{}, {}, {}, {}, {}];
              myanswers.current = [];
              valuefal.current = null;
              valuesub.current = null;
              setThongtin('');
              setMucdich('');
              setDiadiem('');
              setThoigian('');
              self_study.current = null;
              setIsFocus1(false);
              setIsFocus2(false);
              setIsFocus(false);
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
        </View>
      )}
    </ScrollView>
  );
};
export default Creatgroup;
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
