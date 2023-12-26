import React, { useContext } from "react";
import MapView, { Polyline, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import SplashScreen from "./SplashScreen";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  const coordinates = [
    { latitude: 37.8025259, longitude: -122.4351431 },
    { latitude: 37.7896386, longitude: -122.421646 },
    { latitude: 37.7665248, longitude: -122.4161628 },
    { latitude: 37.7734153, longitude: -122.4577787 },
    { latitude: 37.7948605, longitude: -122.4596065 },
    { latitude: 37.8025259, longitude: -122.4351431 },
  ];
  if (!currentLocation) {
    return <SplashScreen />;
  }
  console.log(currentLocation);
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsIndoorLevelPicker
      >
        <Circle
          center={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          radius={35}
          strokeColor="rgba(158,158,255,1.0)"
          fillColor="rgba(158,158,255,0.3)"
        />
        <Polyline coordinates={locations.map((location) => location.coords)} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    marginHorizontal: 20,
    height: 300,
  },
});

export default Map;
