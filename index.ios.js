'use strict';
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { AppRegistry,StyleSheet,NavigatorIOS } from 'react-native';
import TeamsView from './app/views/TeamsView';

export default class PremierLeague extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#4C2D73'
        initialRoute={{
          component: TeamsView,
          title: 'Premier League browser',
        }}
        style={{flex: 1}}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});

AppRegistry.registerComponent('PremierLeague', () => PremierLeague);
