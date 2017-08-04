'use strict';

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,Image,Text,TouchableHighlight,View} from 'react-native';
import images from './../../../utils/imagesData.js'
import styles from './style'


export default class TeamCell extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.teamTitle}>
            {this.props.team.name}
          </Text>
          <Image
            source={{uri: images[this.props.team.code]}}
            style={styles.teamThumbnail} />
        </View>
      </TouchableHighlight>
    );
  }

}
