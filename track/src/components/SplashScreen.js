import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "white" }}>Getting Token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default SplashScreen;
