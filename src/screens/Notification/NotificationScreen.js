/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  RefreshControl,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from './../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import helpers from '../../globals/helpers';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NotificationScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <Text>NotificationScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  titleNoti: {
    fontSize: 18,
    fontWeight: '700'
  },
  bodyNoti: {
    fontSize: 16
  },
  createDate: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  headerFlat: {
    height: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textHeader: {
    fontSize: 18,
    color: Color.Primary,
    marginHorizontal: 10
  }
});

export default NotificationScreen;
