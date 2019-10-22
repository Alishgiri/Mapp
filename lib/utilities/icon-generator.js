import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PURPLE_LIGHT} from './constants/style-constants';

export const generateEntypoIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Entypo name={name} color={color} size={size} />;
};

export const generateFontistoIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Fontisto name={name} color={color} size={size} />;
};

export const generateZocialIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Zocial name={name} color={color} size={size} />;
};

export const generateFeatherIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Feather name={name} color={color} size={size} />;
};

export const generateIonicon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Ionicons name={name} color={color} size={size} />;
};

export const generateOcticon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <Octicons name={name} color={color} size={size} />;
};

export const generateMaterialIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <MaterialIcons name={name} color={color} size={size} />;
};

export const generateEvilIcon = (name, size = 20, color = PURPLE_LIGHT) => {
  return <EvilIcons name={name} color={color} size={size} />;
};

export const generateAntDesignIcon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <AntDesign name={name} color={color} size={size} />;
};

export const generateSimpleLineIcon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <SimpleLineIcons name={name} color={color} size={size} />;
};

export const generateFoundationIcon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <Foundation name={name} color={color} size={size} />;
};

export const generateFontAwesomeIcon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <FontAwesome name={name} color={color} size={size} />;
};

export const generateFontAwesome5Icon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <FontAwesome5 name={name} color={color} size={size} />;
};

export const generateMCommunityIcon = (
  name,
  size = 20,
  color = PURPLE_LIGHT,
) => {
  return <MaterialCommunityIcons name={name} color={color} size={size} />;
};
