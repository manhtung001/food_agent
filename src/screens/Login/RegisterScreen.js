/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Keyboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/Color';
import dataService from '../../network/dataService';
import helpers from './../../globals/helpers';

const RegisterScreen = ({ navigation }) => {
  const [nameAccount, setNameAccount] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameShop, setNameShop] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordAgain, setPassWordAgain] = useState('');

  const register = async () => {
    Keyboard.dismiss();
    if (passWordAgain != passWord) {
      helpers.showMessage({
        content: 'Mật khẩu thử lại không trùng. Vui lòng thử lại'
      });
    } else if (passWord.length < 8) {
      helpers.showMessage({
        content: 'Mật khẩu tối thiểu 8 kí tự'
      });
    } else if (
      nameAccount.trim() &&
      phone.trim() &&
      email.trim() &&
      name.trim() &&
      passWordAgain.trim() &&
      passWord.trim()
    ) {
      let data = {
        adminName: nameAccount,
        passWord: passWord,
        phoneNumber: phone,
        name: name,
        shopName: nameShop,
        email: email
      };
      helpers.showLoading();
      let res = await dataService.register(data);
      helpers.hideModal();
      if (res.message == 'Đăng Ký Thành Công') {
        helpers.showMessage({
          content: res.message
        });
        navigation.goBack();
      } else {
        helpers.showMessage({
          content: 'Đã có lỗi xảy ra'
        });
      }
    } else {
      helpers.showMessage({
        content: 'Vui lòng thử lại'
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center'
      }}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 20,
          left: 10,
          zIndex: 10
        }}
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10
        }}
      >
        <View>
          <Text style={styles.logo}>Tạo tài khoản</Text>
        </View>
      </View>
      <View style={styles.inputwrapper}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="tài khoản"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setNameAccount(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="số điện thoại"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="email"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="tên"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="tên shop"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setNameShop(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="mật khẩu"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPassWord(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="nhập lại mật khẩu"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPassWordAgain(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          register();
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 52,
    color: '#fb5b5a'
  },
  inputwrapper: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#dedede',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden'
  },
  inputView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fb5b5a'
  },
  inputText: {
    height: 50,
    color: 'black'
  },
  forgot: {
    color: '#fb5b5a',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white'
  }
});
