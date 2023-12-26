import { CommonActions } from "@react-navigation/native";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigateToScreen = (routeName, params) => {
  if (navigator) {
    navigator.dispatch(CommonActions.navigate({ name: routeName, params }));
  }
};
