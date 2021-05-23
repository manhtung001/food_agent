import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,

} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import Color from '../../constants/Color';
import FastImage from 'react-native-fast-image';
import helpers from './../../globals/helpers';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
const listFood = (props) => {

  useEffect(() => {
    getList();
  }, []);

  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getList = async () => {

    // let data = {
    //   idShop: 1,
    //   name: "Bán trà sữa",
    //   area: "Cầu Giấy",
    //   email: "lehuyaa0103@gmail.com",
    //   phoneNumber: "0847979889",
    //   linkImage: "https://nhomsatquocthang.com/wp-content/uploads/2020/06/tu-tra-sua.png",
    //   productResponseList: [
    //     {
    //       id: 1,
    //       categoryProductName: "trà sữa",
    //       shopname: "Bán trà sữa",
    //       productName: "Trà sữa 1",
    //       price: 100000,
    //       idShop: 1,
    //       idCategoryProduct: 1,
    //       linkImage: "https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
    //     },
    //     {
    //       id: 2,
    //       categoryProductName: "trà sữa",
    //       shopname: "Bán trà sữa",
    //       productName: "Trà sữa 2",
    //       price: 100000,
    //       idShop: 1,
    //       idCategoryProduct: 1,
    //       linkImage: "https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
    //     }
    //   ]
    // }
    // setListData(data.productResponseList)
    setListData([]);
    helpers.showLoading();
    setRefreshing(true);
    let res = await dataService.getProductByIdShop( props.userInfo.idShop);
    console.log(res);
    helpers.hideModal();
    if (res) {
      setListData(res.productResponseList);
    }
    setRefreshing(false);
  }


  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    helpers.showComfirm({
      textOk: "Đồng ý",
      content: "Bạn có chắc chắn muốn xoá sản phầm này?",
      onOk: () => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
      }
    })

  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = data => {
    console.log('renderItem')
    console.log(data)
    return (
      <View
        style={{
          backgroundColor: Color.WHITE,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          height: 100,
        }}
        underlayColor={'#AAA'}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <FastImage
            style={{ width: 100, height: 100, marginLeft: 10 }}
            source={{
              uri: data.item.linkImage,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{ marginLeft: 20 }}>
            <Text>Tên loại: {data.item.categoryProductName}</Text>
            <Text>Tên sản phẩm: {data.item.productName}</Text>
            <Text>Giá: {data.item.price}</Text>
          </View>
        </View>
      </View>
    )
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
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
    width: 100,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.userState?.user,
  token: state.userState?.token
});


export default connect(mapStateToProps)(listFood);