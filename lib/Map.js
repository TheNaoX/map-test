import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userLocation: props.location
    }
  }
  onDragEnd = (e) => {
    let { userLocation } = this.state

    userLocation.coords = e.nativeEvent.coordinate

    this.setState({ userLocation })
  }

  render() {
    const { userLocation } = this.state

    return(
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapView.Marker draggable
          coordinate={userLocation.coords}
          title="Ubicacion Actual"
          description={JSON.stringify(userLocation)}
          onDragEnd={this.onDragEnd}
        />
      </MapView>
    )
  }
}
