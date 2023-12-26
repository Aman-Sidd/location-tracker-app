import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigateToScreen } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin": {
      return { errorMessage: "", token: action.payload };
    }
    case "add_error": {
      return { ...state, errorMessage: action.payload };
    }
    case "clear_error_message": {
      return { ...state, errorMessage: action.payload };
    }
    case "signout": {
      return { token: "", errorMessage: "" };
    }
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message", payload: "" });
  };
};

const getUserToken = () => {
  const token = AsyncStorage.getItem("token");
  if (!token) return null;
  return token;
};

const signup =
  (dispatch) =>
  async ({ email, password, setUserToken }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      console.log(response.data);
      setUserToken(response.data.token);
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signin = (dispatch) => {
  return async ({ email, password, setUserToken }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      console.log(response.data);
      setUserToken(response.data);
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async ({ setUserToken }) => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "signout" });
      setUserToken(null);
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage },
  { token: null, errorMessage: "" }
);
