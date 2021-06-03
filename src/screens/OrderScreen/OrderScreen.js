import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  RefreshControl
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Color from '../../constants/Color';
import FastImage from 'react-native-fast-image';
import helpers from './../../globals/helpers';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
const listFood = (props) => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getList();
    });
  }, []);

  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getList = async () => {
    setListData([]);
    helpers.showLoading();
    setRefreshing(true);
    let res = await dataService.getProductByIdShop(props.userInfo.idShop);
    console.log(res);
    helpers.hideModal();
    if (res) {
      setListData(res.productResponseList);
    }
    setRefreshing(false);
  };

  const toDetailFood = (item) => {
    props.navigation.navigate('DetailFood', { data: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces={true}
        bouncesZoom={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        refreshControl={
          <RefreshControl
            progressViewOffset={100}
            refreshing={Platform.OS == 'ios' ? false : refreshing}
            onRefresh={() => getList()}
            colors={[Color.Primary, Color.SUCCESS, Color.Primary]}
            tintColor={Color.Primary}
          />
        }
        ListFooterComponent={
          <View
            style={{
              width: '100%',
              height: 200
            }}
          />
        }
        keyExtractor={(item, index) => index + ''}
        data={listData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: Color.WHITE,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              height: 100
            }}
            underlayColor={'#AAA'}
            onPress={() => toDetailFood(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <FastImage
                style={{ width: 100, height: 100, marginLeft: 10 }}
                source={{
                  uri: item.linkImage,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={{ marginLeft: 20 }}>
                <Text>Tên loại: {item.categoryProductName}</Text>
                <Text>Tên sản phẩm: {item.productName}</Text>
                <Text>Giá: {item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  backTextWhite: {
    color: '#FFF'
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: 'pink',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 100
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 100
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  }
});

const mapStateToProps = (state) => ({
  userInfo: state.userState?.user,
  token: state.userState?.token
});

export default connect(mapStateToProps)(listFood);
