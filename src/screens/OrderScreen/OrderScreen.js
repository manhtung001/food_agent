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

const listFood = (props) => {

  useEffect(() => {
    getList();
  }, []);

  const [listData, setListData] = useState([]);
  const getList = async () => {

    let data = {
      idShop: 1,
      name: "Bán trà sữa",
      area: "Cầu Giấy",
      email: "lehuyaa0103@gmail.com",
      phoneNumber: "0847979889",
      linkImage: "https://nhomsatquocthang.com/wp-content/uploads/2020/06/tu-tra-sua.png",
      productResponseList: [
        {
          id: 1,
          categoryProductName: "trà sữa",
          shopname: "Bán trà sữa",
          productName: "Trà sữa 1",
          price: 100000,
          idShop: 1,
          idCategoryProduct: 1,
          linkImage: "https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
        },
        {
          id: 2,
          categoryProductName: "trà sữa",
          shopname: "Bán trà sữa",
          productName: "Trà sữa 2",
          price: 100000,
          idShop: 1,
          idCategoryProduct: 1,
          linkImage: "https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
        }
      ]
    }
    setListData(data.productResponseList)
  }


  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
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
          justifyContent: 'center',
          height: 100,
        }}
        underlayColor={'#AAA'}
      >
        <View>
          <Text>I am {data.item.productName}</Text>
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

export default listFood;
