'use strict';

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import { StyleSheet,ActivityIndicatorIOS,Text,View ,ListView} from 'react-native';
import TeamCell from './TeamCell';
import TeamDetail from './TeamDetail';

export default class TeamsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: true,
      teams: []
    };
    this.fetchData = this.fetchData.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderFooterSpinner = this._renderFooterSpinner.bind(this);
    this._renderTeamCell = this._renderTeamCell.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://api.football-data.org/v1/competitions/445/teams', {
          method: 'get',
          headers: {
            'X-Auth-Token': 'd5cdb5865b134320bcfc572f17bccf34'
          }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.teams),
          loaded: true,
          teams: responseData.teams,
        });
      })
      .done();
  }

  render() {
    return(
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooterSpinner}
        renderHeader={this._renderHeader}
        renderRow={this._renderTeamCell}/>
    );
  }

  _renderHeader(){
    if (!this.state.loaded){
      return(
        <Text style={styles.loadingText}>
          Loading Teams from the server ...
        </Text>
      );
    } else {
      return(
        <Text style={styles.loadingText}>
          #{this.state.teams.length} teams downloaded!
        </Text>
      );
    }
  }

  _renderFooterSpinner() {
    if (!this.state.loaded) {
      return <ActivityIndicatorIOS />;
    }
    return null;
  }

  _renderTeamCell(team){
    return(
      <TeamCell
        onSelect={() => this.selectTeam(team)}
        team={team}/>
    );
  }

  selectTeam(team){
    this.props.navigator.push({
      title: team.name + " details",
      component: TeamDetail,
      passProps: {team: team},
    });
  }
}
