import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {IconButton} from '../../Components';
import {COLORS} from '../../constants';

const UIHeader = props => {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  return (
    <View
      style={{
        height: 55,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {leftIconName != undefined ? (
        <IconButton
          icon={leftIconName}
          iconStyle={{
            tintColor: null,
          }}
          containerStyle={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}
          onPress={onPressLeftIcon}
        />
      ) : (
        <View style={{width: 50, height: 50}} />
      )}
      <Text
        style={{
          fontSize: 18,
          alignSelf: 'center',
          lineHeight: 45,
          color: COLORS.primary3,
        }}>
        {title}
      </Text>
      {rightIconName != undefined ? (
        <IconButton
          icon={rightIconName}
          iconStyle={{
            tintColor: null,
          }}
          containerStyle={{
            // position: 'absolute',
            // top: 20,
            // left: 20,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            backgroundColor: COLORS.primary3,
          }}
          onPress={onPressRightIcon}
        />
      ) : (
        <View style={{width: 50, height: 50}} />
      )}
    </View>
  );
};
export default UIHeader;
