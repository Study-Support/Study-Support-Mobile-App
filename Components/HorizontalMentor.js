import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ImageBackground,
  Animated,
  Keyboard,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import IconLabel from './IconLabel';
const HorizontalMentor = ({containerStyle, course, onPress}) => {
  // console.log(course);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,
      }}
      onPress={onPress}>
      <ImageBackground
        source={
          course?.avatar_url != null
            ? {uri: course?.avatar_url}
            : images.thumbnail_1
        }
        resizeMode="contain"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
          // backgroundColor: 'red',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            // marginTop: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary3,
            }}>
            {course?.full_name}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary3,
              paddingHorizontal: 5,
            }}>
            {course?.faculty}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            // alignItems: 'center',
            marginTop: 8,
            paddingRight: 10,
            borderWidth: 1,
            borderColor: COLORS.primary3,
            borderRadius: 15,
            padding: SIZES.padding,
          }}>
          <View
            style={{
              // flexDirection: 'row',
              alignItems: 'center',
              // marginTop: SIZES.base,
              justifyContent: 'flex-start',
            }}>
            <Text>Môn Làm Mentor : {course?.number_of_subjects}</Text>
            {course?.subjects.map((item, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                  }}
                  key={`Subjects -${index}`}>
                  <Text>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default HorizontalMentor;
