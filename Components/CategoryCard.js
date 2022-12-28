import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from '../constants';
import {SharedElement} from 'react-navigation-shared-element';
// import {View} from 'moti';
const CategoryCard = ({
  SharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
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
            source={
              category?.avatar_url != null
                ? {uri: category?.avatar_url}
                : images.thumbnail_1
            }
            resizeMode="contain"
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
            flex: 1,
            position: 'absolute',
            bottom: 50,
            left: 15,
          }}>
          <SharedElement
            id={`${SharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}>
            {/* <Text
              style={{
                position: 'absolute',
                // marginTop: 0,
                color: COLORS.primary3,
                ...FONTS.h2,
                zIndex: 3,
              }}>
              {category?.full_name}
            </Text> */}
          </SharedElement>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            position: 'relative',
            // marginTop: 0,
            color: COLORS.primary3,
            ...FONTS.h2,
            zIndex: 3,
          }}>
          {category?.full_name}
        </Text>
        <Text>{category?.faculty}</Text>
      </View>
    </View>
  );
};
export default CategoryCard;
