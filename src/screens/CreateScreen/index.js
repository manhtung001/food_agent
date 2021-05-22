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
  UIManager,
  Keyboard
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
        price: priceCheck,
        idCategoryProduct: categoryCheck,
        name,
        idShop: props.userInfo.idShop
      }
      helpers.showLoading();
      let res = dataService.addProduct(data);
      helpers.hideModal()
      if (res.message = "Thêm thành công") {
        setName("")
        setPrice(0)
        setCategory(0)
        Keyboard.dismiss()
        helpers.showMessage({ content: "Thêm thành công" })
      }
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
            value={name}
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
            value={price.toString()}
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
            value={category.toString()}

          />
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            1: Trà sữa
        </Text>
          <Text
            style={{
              fontSize: 20
            }}
          >
            2: Đồ ăn
        </Text>
          <Text
            style={{
              fontSize: 20
            }}
          >
            3: Cà phê
        </Text>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            left: 0,
            padding: 10,
            backgroundColor: Color.Primary,
            borderRadius: 16,
            margin: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => addFood()}
        >
          <Text
            style={{
              fontSize: 20,
              color: Color.WHITE
            }}
          >
            Thêm
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

