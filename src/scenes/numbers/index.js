import React, { Component } from 'react';
import {
  Modal,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  View,
  Button,
  Text,
  Icon,
  Tabs,
  Footer,
  FooterTab,
  InputGroup,
  Input,
  Card,
  CardItem,
} from 'native-base';

import styles from './styles';
import theme from '../../themes/base-theme.js'
import FaNoToWord from '../../helpers/FaNoToWord';

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
          <Title>تبدیل اعداد</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="menu" />
          </Button>

          <Button transparent onPress={this.modalToggle}>
            <Icon name='info' />
          </Button>
        </Header>

        <Content>
          <Control/>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}>
            <Container>
              <Content style={{padding: 10}}>
                <Text>
                  در این صفحه شما می توانید اعداد صحیح، اعشاری، منفی و مثبت را وارد کنید.
                </Text>
                <Text>
                  اعداد صحیح تا 36 رقم و قسمت اعشاری تا 5 رقم پشتیبانی می شود.
                </Text>
                <Text>
                  همچنین تعداد ارقام و نمایش حروفی اعداد نیز قابل مشاده است.
                </Text>
                <Text>
                  در قسمت تعداد ارقام فقط قسمت صحیح اعداد شمرده می شود
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

class Control extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      number: new FaNoToWord(null, 5, false),
    }
  }

  onChangeNumber = value => {
    this.setState({
      number: this.state.number.changeNumber(value)
    });
  };

  render() {
    return (
      <View style={{padding: 10}}>
        <NumberInput number={this.state.number} onChangeNumber={this.onChangeNumber} />
        <StatusCard number={this.state.number} />
      </View>
    );
  }
}

class NumberInput extends Component
{
  render() {
    return (
      <InputGroup
        iconLeft
        borderType='underline'
        success={this.props.number.validate===true}
        error={this.props.number.validate===false}>
        <Icon name='edit' style={{ color: this.iconColor() }}/>
        <Input
          placeholder="-123456789.54321"
          keyboardType='numeric'
          maxLength={this.maxLength()}
          onChangeText={this.props.onChangeNumber} />
      </InputGroup>
    );
  }

  maxLength() {
    return 36;
  }

  iconColor() {
    if (this.props.number.validate === true) {
      return '#2b8339';
    } else if (this.props.number.validate === false) {
      return '#ed2f2f';
    } else {
      return '#D9D5DC';
    }    
  }
}

class StatusCard extends Component
{
  render() {
    if (this.props.number.validate === true) {
      return this.valid();
    } else if (this.props.number.validate === false) {
      return this.invalid();
    } else {
      return this.default();
    }
  }
  default() {
    return (
      <Card style={{marginTop: 10}}>
        <CardItem>
          <Text>
            عددی وارد نشده است
          </Text>
        </CardItem>
      </Card>
    );
  }
  valid() {
    return (
      <Card style={{marginTop: 10}}>
        <CardItem header>
          <Text>
            {this.props.number.numberFormat()}
          </Text>
        </CardItem>
        <CardItem>
          <Text>
            {this.props.number.words()}
          </Text>
        </CardItem>
        <CardItem>
          <Text>
            {this.props.number.integerLength() + ' رقم'}
          </Text>
        </CardItem>
      </Card>
    );
  }
  invalid() {
    return (
      <Card style={{marginTop: 10}}>
        <CardItem>
          <Text>
            {this.props.number.error}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
