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
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from './../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import helpers from '../../globals/helpers';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const data = [
  {
    shopName: '1',
    status: 'Đang Giao',
    subTotal: null,
    listProduct: [
      {
        productName: 'Trà sữa 1',
        total: 90000,
        price: 30000,
        count: 3,
        linkimage: null
      },
      {
        productName: 'Trà sữa 2',
        total: 160000,
        price: 50000,
        count: 2,
        linkimage: null
      },
      {
        productName: 'Đồ ăn 1',
        total: 90000,
        price: 80000,
        count: 1,
        linkimage: null
      },
      {
        productName: 'Đồ ăn 2',
        total: 45000,
        price: 90000,
        count: 1,
        linkimage: null
      }
    ]
  },
  {
    shopName: '2',
    status: 'Đang Giao',
    subTotal: null,
    listProduct: [
      {
        productName: 'Cà phê 1',
        total: 30000,
        price: 45000,
        count: 1,
        linkimage: null
      },
      {
        productName: 'Cà phê 2',
        total: 90000,
        price: 90000,
        count: 1,
        linkimage: null
      }
    ]
  }
];

const NotificationScreen = (props) => {
  // const [listDataShop, setListDataShop] = useState(data);

  useEffect(() => {
    getList();
  }, []);

  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getList = async () => {
    setListData([]);
    helpers.showLoading();
    setRefreshing(true);
    let res = await dataService.getAllOrder(props.userInfo.idShop);
    console.log(res);
    helpers.hideModal();
    if (res) {
      setListData(res);
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}
    >
      <View style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.titleNoti}>Danh sách các đơn hàng</Text>
        </View>

        {/* <FlatList
          bounces={true}
          bouncesZoom={false}
          refreshControl={
          <RefreshControl
            progressViewOffset={100}
            refreshing={Platform.OS == 'ios' ? false : refreshing}
            onRefresh={() => getList()}
            colors={[Color.Primary, Color.SUCCESS, Color.Primary]}
            tintColor={Color.Primary}
          />
        }
          contentContainerStyle={
            {
              // paddingBottom: 50,
            }
          }
          ListFooterComponent={
            <View
              style={{
                width: '100%',
                height: 200
              }}
            />
          }
          ListHeaderComponent={
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 1
                  }}
                />
              </View>
            </View>
          }
          keyExtractor={(item, index) => index + ''}
          data={listData}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTopColor: Color.GRAY2,
                  borderTopWidth: 1,
                  marginHorizontal: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 5
                  }}
                >
                  ĐƠn HÀNG SỐ: {item.shopName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 5
                  }}
                >
                  Trạng thái: {item.status}
                </Text>
                {item.listProduct.map((child, index2) => {
                  return (
                    <View
                      key={index2}
                      style={{
                        paddingTop: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 5
                        }}
                      >
                        {child.productName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        Giá: {child.price} x {child.count} ={' '}
                        {child.count * child.price}
                      </Text>
                    </View>
                  );
                })}
                <TouchableOpacity
                  onPress={() => {
                    console.log('dầ');
                  }}
                >
                  <MaterialIcons
                    name="pedal-bike"
                    size={30}
                    style={{
                      marginLeft: 40,
                      marginTop: 40,
                      color: Color.Primary
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        /> */}
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

const mapStateToProps = (state) => ({
  userInfo: state.userState?.user,
  token: state.userState?.token
});

export default connect(mapStateToProps)(NotificationScreen);
