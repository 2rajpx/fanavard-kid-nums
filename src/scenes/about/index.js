import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
} from 'native-base';

export default class NHTabs extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>درباره</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content style={{padding: 10}}>
          <Text>
            در این برنامه علاوه بر تبدیل اعداد به حروف می توان پسوند ریال و تومان را نیز در خواند پول بررسی کرد.
          </Text>
          <Text style={{paddingTop: 10}}>
            در هر صفحه برای آشنایی با نحوه استفاده می توانید قسمت راهنما را بزنید.
          </Text>
          <Text style={{paddingTop: 10}}>
            توسط منوی شناور می توانید بین این دو امکان جابجا شوید یا از برنامه خارج گردید.
          </Text>
        </Content>
      </Container>
    );
  }
}
