import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';

const MessengerItem = props => {
  const {onPress} = props;
  const {url, isSender, messenger, timestamp, showUrl} = props.item;
  return isSender == false ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {showUrl == true ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            marginStart: 10,
          }}
        />
      )}
      <View
        style={{
          width: SIZES.width * 0.7,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              paddingVertical: 5,
              paddingHorizontal: 7,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
            }}>
            {messenger}
          </Text>
        </View>
        <View style={{width: 20}} />
      </View>
      {/* isSender = true */}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: SIZES.width * 0.7,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View style={{width: 40}} />
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              paddingVertical: 5,
              paddingHorizontal: 7,
              backgroundColor: COLORS.gray10,
              borderRadius: 10,
            }}>
            {messenger}
          </Text>
        </View>
      </View>
      {showUrl == true ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            marginStart: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export default MessengerItem;
