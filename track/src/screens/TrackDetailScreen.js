import React, { useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(TrackContext);
  const { _id } = route.params;
  const track = state.find((t) => t._id === _id);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.trackName}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...track.locations[0].coords,
        }}
      >
        <Polyline
          coordinates={track.locations.map((t) => t.coords)}
          strokeColor="black"
          strokeWidth={3}
        />
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(93,16,73)",
  },
  trackName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    color: "white",
  },
  map: {
    height: 300,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default TrackDetailScreen;
