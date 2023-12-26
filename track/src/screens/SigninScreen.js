import React, { useContext, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const SigninScreen = ({ navigation, route }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const { errorMessage } = state;
  const { setUserToken } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Clear the errorMessage when the screen is focused
      // This will be triggered when navigating from signin to signup
      // You can also use other navigation events like 'didFocus'
      // depending on your navigation library version
      // Assuming that 'clearErrorMessage' is an action in your AuthContext
      // that sets the errorMessage to an empty string
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        displayText={"Sign in to Account"}
        errorMessage={errorMessage}
        onSubmit={signin}
        submitButtonText={"Sign In"}
        setUserToken={setUserToken}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Signup instead!"
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

export default SigninScreen;
