import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import { Provider as AuthProvider, Context } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { setNavigator } from "./src/navigationRef";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./src/components/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { LogBox } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const TrackListFlow = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name="Track List"
      component={TrackListScreen}
      options={{
        headerStyle: {
          backgroundColor: "rgb(79,4,58)",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 30,
          marginBottom: 7,
        },
      }}
    />
    <Stack.Screen
      name="TrackDetail"
      component={TrackDetailScreen}
      options={{
        headerStyle: {
          backgroundColor: "rgb(79,4,58)",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          marginBottom: 7,
          fontWeight: "bold",
          fontSize: 30,
        },
      }}
    />
  </Stack.Navigator>
);

const MainFlow = ({ setUserToken }) => (
  <Tab.Navigator
    activeColor="#e0e0e0"
    inactiveColor="white"
    barStyle={{ backgroundColor: "rgb(79,4,58)", color: "white" }}
  >
    <Tab.Screen
      name="TrackListFlow"
      component={TrackListFlow}
      options={{
        tabBarLabel: "Track List",
        tabBarIcon: () => (
          <FontAwesome5 name="th-list" size={24} color="white" />
        ),
      }}
    />
    <Tab.Screen
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{
        tabBarLabel: "Add Track",
        tabBarIcon: () => (
          <MaterialIcons name="add-box" size={24} color="white" />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      initialParams={{ setUserToken }}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: () => (
          <MaterialIcons name="settings" size={24} color="white" />
        ),
      }}
    />
  </Tab.Navigator>
);

const LoginFlow = ({ setUserToken }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      initialParams={{ setUserToken }}
    />
    <Stack.Screen
      name="Signin"
      component={SigninScreen}
      initialParams={{ setUserToken }}
    />
  </Stack.Navigator>
);

const MyApp = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = useState(null);

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
        {userToken == null ? (
          <LoginFlow setUserToken={setUserToken} />
        ) : (
          <MainFlow setUserToken={setUserToken} />
        )}
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <MyApp />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
