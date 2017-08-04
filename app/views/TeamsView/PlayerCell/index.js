'use strict';

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';
import { Image,Text,View ,TouchableHighlight} from 'react-native';
import roles from './../../../utils/rolesData.js';


export default class PlayerCell extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.playerRole}>
          {roles[this.props.player.position]}
        </Text>
        <Text style={styles.playerName}>
          {this.props.player.name}
        </Text>
      </View>
    );
  }

}
