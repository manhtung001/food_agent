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

const CreateScreen = (props) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);

  const addFood = () => {
    let priceCheck = Number(price);
    let categoryCheck = Number(category);
    let priceCheck2 = Number.isInteger(priceCheck);
    let categoryCheck2 = Number.isInteger(categoryCheck);

    if (!priceCheck2 || !categoryCheck2) {
      helpers.showMessage({ content: "Giá hoặc loại sản phẩm phải là số!" })
    } else if (categoryCheck < 1 || categoryCheck > 3) {
      helpers.showMessage({ content: "Loại sản phẩm từ 1-3" })
    } else if (name.trim()) {
      let data = {
        priceCheck,
        categoryCheck,
        name,
        idShop: props.userInfo.idShop
      }
      console.log(data)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }} >
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Tên món"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Giá (VNĐ)"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPrice(text)}
            keyboardType="number-pad"
          />
        </View>
        <Text
          style={{
            marginVertical: 10,
            marginLeft: 20,
            fontSize: 20
          }}
        >
          Loại sản phẩm</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Loại"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setCategory(text)}
            keyboardType="numeric"
          />
        </View>
        <Text>
          1: Trà sữa
        </Text>
        <Text>
          2: Đồ ăn
        </Text>
        <Text>
          3: Cà phê
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            left: 0,
            backgroundColor: Color.PLACEHOLDER
          }}
          onPress={() => addFood()}
        >
          <Text>
            Them
        </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fb5b5a',
    marginTop: 10
  },
  inputText: {
    height: 50,
    color: 'black'
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.userState?.user,
  token: state.userState?.token
});

export default connect(mapStateToProps)(CreateScreen);

