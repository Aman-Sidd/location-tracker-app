import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ navigation, route }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const { errorMessage } = state;
  const { setUserToken } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        displayText="Sign up for Account"
        errorMessage={errorMessage}
        setUserToken={setUserToken}
        onSubmit={signup}
        submitButtonText="Sign Up"
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    paddingBottom: 200,
    backgroundColor: "rgb(93,16,73)",
  },
});

export default SignupScreen;
