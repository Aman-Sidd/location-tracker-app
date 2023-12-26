import React from "react";
import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = ({ route }) => {
  const { signout } = useContext(AuthContext);
  const { setUserToken } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account Screen</Text>
      <TouchableOpacity
        style={styles.signOutButtonContainer}
        onPress={() => signout({ setUserToken })}
      >
        <Text style={styles.signOutButtonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(93,16,73)",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  signOutButtonContainer: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signOutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountScreen;
