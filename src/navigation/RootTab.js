/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  listShop,
  Profile,
  NotificationScreen,
  OrderScreen,
  CreateScreen
} from './../screens/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from '../constants/Color';

const BottomTab = createBottomTabNavigator();

const RootTab = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: Color.Primary,
          inactiveTintColor: Color.GRAY
        }}
      >
        <BottomTab.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <MaterialCommunityIcons
                  size={30}
                  name="clipboard-list-outline"
                  color={focused ? Color.Primary : Color.GRAY}
                />
              </View>
            ),
            tabBarLabel: 'Món ăn'
          }}
        />
        <BottomTab.Screen
          name="CreateScreen"
          component={CreateScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign
                size={30}
                color={focused ? Color.Primary : Color.GRAY}
                name="plus"
              />
            ),
            tabBarLabel: 'Thêm'
          }}
        />
        <BottomTab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                size={30}
                color={focused ? Color.Primary : Color.GRAY}
                name="bell"
              />
            ),
            tabBarLabel: 'Danh sách ship'
          }}
        />
        <BottomTab.Screen
          name="ProfileUserScreen"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                size={30}
                color={focused ? Color.Primary : Color.GRAY}
                name="user-circle"
              />
            ),
            tabBarLabel: 'Cá nhân'
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default RootTab;
