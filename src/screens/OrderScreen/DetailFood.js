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
  StatusBar,
  Image,
  FlatList,
  Platform,
  RefreshControl,
  TextInput,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Color from '../../constants/Color';
import helpers from '../../globals/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';

// {"categoryProductName": "Trà sữa", "id": 15, "idCategoryProduct": null, "idShop": null, "linkImage": "https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg", "price": 10000, "productName": "tra sua", "shopName": "ban kem"}

const DetailFood = (props) => {
  const { data } = props.route.params;
  const [name, setName] = useState(data.productName);
  const [price, setPrice] = useState(data.price);

  const onDelete = async () => {
    helpers.showLoading();
    let res = await dataService.onDeleteFood(data.id);
    helpers.hideModal();
    if (res.message == 'xóa thành công') {
      helpers.showMessage({ content: res.message });
      props.navigation.goBack();
    }
  };

  const onChangeFood = async () => {
    let params = {
      id: data.id,
      idCategoryProduct: data.idCategoryProduct,
      idShop: data.idShop,
      name: name,
      price: price
    };
    helpers.showLoading();
    let res = await dataService.onChangeFood(params);
    if (res.message == 'Sửa thành công') {
      helpers.showMessage({ content: res.message });
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{}}
          >
            <Ionicons
              name="arrow-back"
              size={40}
              color={Color.Primary}
              style={{
                marginRight: 4
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginTop: 10
            }}
          >
            Chi tiết món ăn
          </Text>
          <View
            style={{
              width: 50,
              height: 1
            }}
          />
        </View>
        <View>
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
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: !(
              name != data.productName || price != String(data.price)
            )
              ? Color.BORDER
              : Color.SUCCESS
          }}
          disabled={!(name != data.productName || price != String(data.price))}
          onPress={() => {
            Keyboard.dismiss();
            helpers.showComfirm({
              content: 'Bạn có chắc chắn muốn sửa?',
              onOk: () => {
                onChangeFood();
              }
            });
          }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            Sửa sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: Color.Primary,
            marginTop: 20
          }}
          onPress={() => {
            Keyboard.dismiss();
            helpers.showComfirm({
              content: 'Bạn có chắc chắn muốn xoá?',
              onOk: () => {
                onDelete();
              }
            });
          }}
        >
          <Text
            style={{
              color: Color.WHITE,
              fontSize: 20
            }}
          >
            Xoá sản phẩm
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
  }
});

export default DetailFood;
