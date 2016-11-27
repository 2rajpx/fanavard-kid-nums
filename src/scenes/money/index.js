import React, { Component } from 'react';
import {
  Modal,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Icon,
  Tabs,
  Footer,
  FooterTab,
} from 'native-base';

import styles from './styles';
import TabOne from './tab-one';
import TabTwo from './tab-two';
import theme from '../../themes/base-theme.js'

export default class NHTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  modalToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  render() {
    return (
      <Container theme={theme}>
        <Header>
          <Title>تبدیل پول</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="menu" />
          </Button>

          <Button transparent onPress={this.modalToggle}>
            <Icon name='info' />
          </Button>
        </Header>

        <Content>
          <Tabs>
            <TabOne tabLabel="ریال به تومان" />
            <TabTwo tabLabel="تومان به ریال" />
          </Tabs>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}>
            <Container>
              <Content style={{padding: 10}}>
                <Text>
                  در این صفحه شما فقط می توانید اعداد صحیح را وارد کنید.
                </Text>
                <Text>
                  در تبدیل ریال به تومان مجاز به وارد کردن 13 رقم و در تبدیل تومان به ریال 12 رقم می باشید
                </Text>
                <Text>
                  همچنین تعداد ارقام ریال و تومان برای سادگی بررسی نشان داده می شود
                </Text>
              </Content>

              <Footer>
                <FooterTab>
                  <Button onPress={this.modalToggle}>
                    <Icon name='close'/>
                  </Button>
                </FooterTab>
              </Footer>
            </Container>
          </Modal>
        </Content>
      </Container>
    );
  }
}
