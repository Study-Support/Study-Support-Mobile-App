import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {SharedElement} from 'react-navigation-shared-element';
// import {View} from 'moti';
const CategoryCard = ({
  SharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 200,
        height: 150,
        ...containerStyle,
      }}>
      <SharedElement
        id={`${SharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: SIZES.radius,
            // paddingVertical: SIZES.padding,
            // paddingHorizontal: SIZES.radius,
            // justifyContent: 'flex-end',
            // ...containerStyle,
          }}
        />
      </SharedElement>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 15,
        }}>
        <SharedElement
          id={`${SharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Text
            style={{
              position: 'absolute',
              // marginTop: 0,
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryCard;
