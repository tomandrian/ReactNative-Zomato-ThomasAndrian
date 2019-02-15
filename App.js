import React, { Component } from 'react';
import { Alert, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Left, List, ListItem, Body, Text, Thumbnail, Item, Icon, Input, Button, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      pencarian: ''
    };
  }

  cariresto = () => {
    let url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.pencarian}`;
    let config = {
      headers: { 'user-key': '37ce841eb1940f51e0c7c57c95e47d19' }
    };
    axios.get(url, config)
      .then((info) => {
        this.setState({
          resto: info.data.resto,
        })
        console.log(info.data.resto)
      })
  }
  render() {
    const data = this.state.restaurant.map((item, index) => {
      let name = item.restaurant.name;
      let city = item.restaurant.location.city;
      let address = item.restaurant.location.address;
      let price = item.restaurant.average_cost_for_two * 198.37;
      let picture = item.restaurant.thumb;
      let nopicture = 'https://me.me/i/i-ifttt-image-not-found-%3Cp%3Eso-sorry-little-one%3C-p%3E-22708528'
      if (picture == false) {
        picture = nopicture
      }
      return (
        <ListItem avatar key={index}>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: picture }} />
                  <Body>
                    <Text> {name} </Text>
                    <Text note> {city} </Text>
                  </Body>
                </Left>
                <Right>
                  <Text>Rp {price}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{ uri: picture }} style={{ height: 200, width: 400, flex: 1 }} />
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Icon active name="pin" />
                  <Text>{address}</Text>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: 'red' }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Mau makan apa? ?..." onChangeText={(x) => this.setState({ pencarian: x })} />
          </Item>
          {/* <Text>{this.state.pencarian}</Text> */}
        </Header>
        <Text></Text>

        <Button style={{ backgroundColor: 'red', width: 490, justifyContent: 'center' }}
          onPress={() => { this.carirestaurant() }}><Text>LIHAT DAFTAR restaurant</Text></Button>
        <Content>
          <ScrollView>
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}