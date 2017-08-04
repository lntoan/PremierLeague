'use strict';

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,ImageBackground,Text,ListView,View,Image } from 'react-native';
import images from './../../../utils/imagesData.js';
import styles from './style';
import PlayerCell from '../PlayerCell';

export default class TeamDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      teams: [],
      url: require('../../../images/Arsenal-FC-icon.png')// + images[this.props.team.code]) //require('../../../images/Swansea-City-icon.png')
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderPlayerCell = this.renderPlayerCell.bind(this);
    this.getTeamImage = this.getTeamImage.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('Downloading data from ' + JSON.stringify(this.props.team._links.players.href));
    fetch(this.props.team._links.players.href, {
          method: 'get',
          headers: {
            'X-Auth-Token': 'd5cdb5865b134320bcfc572f17bccf34'
          }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.players),
          loaded: true,
          players: responseData.teams,
        });
      })
      .done();
  }
  renderHeader() {
      if (!this.state.loaded){
        return(
          <Text style={styles.loadingText}>
            Loading {this.props.team.name}''s players ...
          </Text>
        );
      } else {
        return(
          <View style={styles.container}>
            <Text style={styles.teamName}>
              {this.props.team.name}
            </Text>
            <Image
              source={this.getTeamImage(this.props.team.code)}
              style={styles.teamMainImage} />
          </View>
        );
      }
  }
  renderPlayerCell(player){
    return(
      <PlayerCell
        player={player}/>
    );
  }
  getTeamImage(Teamcode){
    switch(Teamcode){
      case 'MUFC': return require('../../../images/Manchester-United-icon.png');
      case 'SWA':  return require('../../../images/Swansea-City-icon.png');
      case 'LCFC': return require('../../../images/Leicester-City-icon.png');
      case 'EFC':  return require('../../../images/Everton-FC-icon.png');
      case 'WHU':  return require('../../../images/West-Ham-United-icon.png');
      case 'THFC': return require('../../../images/Tottenham-Hotspur-icon.png');
      case 'WBA':  return require('../../../images/West-Bromwich-Albion-icon.png');
      case 'SUN':  return require('../../../images/Sunderland-AFC-icon.png');
      case 'SCFC': return require('../../../images/Stoke-City-icon.png');
      case 'AVFC': return require('../../../images/Aston-Villa-icon.png');
      case 'QPR':  return require('../../../images/Queens-Park-Rangers-icon.png');
      case 'AFC':  return require('../../../images/Arsenal-FC-icon.png');
      case 'CRY':  return require('../../../images/Crystal-Palace-icon.png');
      case 'LFC':  return require('../../../images/Liverpool-FC-icon.png');
      case 'SFC':  return require('../../../images/Southampton-FC-icon.png');
      case 'NUFC': return require('../../../images/Newcastle-United-icon.png');
      case 'MCFC': return require('../../../images/Manchester-City-icon.png');
      case 'BFC':  return require('../../../images/Burnley-FC-icon.png');
      case 'CFC':  return require('../../../images/Chelsea-FC-icon.png');
      case 'HUL':  return require('../../../images/Hull-City-icon.png');
    }
  }
  render() {
    return(
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderPlayerCell}/>
    );
  }

}
