import React, { Component } from 'react';
import {
  BackAndroid,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
} from 'native-base';
import theme from './themes/base-theme';

export default class DrawerContent extends Component {
  render() {
    return (
      <Container theme={theme} style={{backgroundColor: '#fff'}}>
        <Content>
          <Button large transparent block onPress={() => this.props.navigate({'scene': 'numbers'})} textStyle={{color: '#007aff'}}>
            <Icon name='swap-horiz' style={{color: '#007aff'}}/>
            تبدیل اعداد
          </Button>
          <Button large transparent block onPress={() => this.props.navigate({'scene': 'money'})} textStyle={{color: '#007aff'}}>
            <Icon name='attach-money' style={{color: '#007aff'}}/>
            تبدیل پول
          </Button>
          <Button large transparent block onPress={() => this.props.navigate({'scene': 'about'})} textStyle={{color: '#007aff'}}>
            <Icon name='info-outline' style={{color: '#007aff'}}/>
            درباره
          </Button>
          <Button large transparent block onPress={() => BackAndroid.exitApp(0)} textStyle={{color: '#007aff'}}>
            <Icon name='exit-to-app' style={{color: '#007aff'}}/>
            خروج
          </Button>
        </Content>
      </Container>
    );
  }
}