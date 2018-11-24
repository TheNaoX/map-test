import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Map from './lib/Map.js'

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  errorMessage() {
    const { text } = this.state;

    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    )
  }

  render() {
    let text = 'Waiting..';

    if (this.state.errorMessage) {
      return this.errorMessage();
    } else if (this.state.location) {
      return <Map location={this.state.location}></Map>
    }

    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  }
});
