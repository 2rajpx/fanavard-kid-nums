import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Card,
  CardItem,
  Text,
  View,
  Icon,
  Picker,
  Item,
} from 'native-base';

import styles from './styles';
import Money from '../../helpers/Money';

export default class TabOne extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      money: new Money(null, Money.Toman),
    }
  }

  onChangeMoney = value => {
    this.setState({
      money: this.state.money.changeNumber(value)
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <NumberInput money={this.state.money} onChangeMoney={this.onChangeMoney} />
          <StatusCard money={this.state.money} />
        </Content>
      </Container>
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
        success={this.props.money.toman.validate===true}
        error={this.props.money.toman.validate===false}>
        <Icon name='edit' style={{ color: this.iconColor() }}/>
        <Input
          placeholder="15000"
          keyboardType='numeric'
          maxLength={this.maxLength()}
          onChangeText={this.props.onChangeMoney} />
      </InputGroup>
    );
  }

  maxLength() {
    return 35;
  }

  iconColor() {
    if (this.props.money.toman.validate === true) {
      return '#2b8339';
    } else if (this.props.money.toman.validate === false) {
      return '#ed2f2f';
    } else {
      return '#D9D5DC';
    }    
  }
}

class StatusCard extends Component
{
  render() {
    if (this.props.money.toman.validate === true) {
      return this.valid();
    } else if (this.props.money.toman.validate === false) {
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
      <View>
        <Card style={{marginTop: 10}}>
          <CardItem header>
            <Text>
              {this.props.money.rial.numberFormat()} ریال
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              {this.props.money.rial.words()} ریال
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              {this.props.money.rial.integerLength()} رقم
            </Text>
          </CardItem>
        </Card>
        <Card style={{marginTop: 10}}>
          <CardItem header>
            <Text>
              {this.props.money.toman.numberFormat()} تومان
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              {this.props.money.toman.words()} تومان
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              {this.props.money.toman.integerLength()} رقم
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
  invalid() {
    return (
      <Card style={{marginTop: 10}}>
        <CardItem>
          <Text>
            {this.props.money.toman.error}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
