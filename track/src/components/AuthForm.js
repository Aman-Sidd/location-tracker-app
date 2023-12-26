import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({
  displayText,
  errorMessage,
  setUserToken,
  onSubmit,
  submitButtonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3 style={styles.headerText}>
          {displayText}
        </Text>
      </Spacer>
      <Input
        style={styles.input}
        label="Email"
        labelStyle={styles.labelInput}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        style={styles.input}
        secureTextEntry={true}
        label="Password"
        labelStyle={styles.labelInput}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password, setUserToken })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  labelInput: {
    color: "white",
    fontSize: 20,
  },
  input: {
    color: "white",
  },
});

export default AuthForm;
