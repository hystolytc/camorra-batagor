import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native'

import Row from './Row'
import {getPlaces} from './../database/places'

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: null
    }
  }

  componentDidMount() {
    getPlaces().then((result) => {
      console.log('received result', result);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        dataSource: ds.cloneWithRows(result),
      })
    })
  }

  navigator(name) {
      this.props.navigator.push({
        name: 'Home',
        passProps: {
          name: name
        }
      })
  }

  render() {
    return (
      <View>


        {this.state.dataSource ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(result) => <Row {...result} navigator={this.props.navigator} /> }
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />

          : <View><Text>Loading..</Text></View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8e8e8e',
  },
});
