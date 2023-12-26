import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

function LoadingSpinner() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "white" }}>Loading Tracks...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingSpinner;
