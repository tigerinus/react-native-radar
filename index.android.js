/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';

import Dimensions from 'Dimensions';

import {
  AppRegistry,
  View
} from 'react-native';

import { Radar } from './radar.component';

export default class learnA extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
      }}>
        <Radar
          size={Dimensions.get('window').width * 0.9}

          mine={{ lat: 43.5649526, long: -79.5969089 }}

          list={
            [
              //{ name: "me", lat: 43.5649526, long: -79.5969089 },
              { name: "Albert", lat: 43.564249, long: -79.528009 },
              { name: "Brent", lat: 43.571843, long: -79.597977 },
              { name: "Cassidy", lat: 43.564751, long: -79.616846 }
            ]
          }
          />
      </View>
    );
  }
}

AppRegistry.registerComponent('learnA', () => learnA);
