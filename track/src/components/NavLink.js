import { navigateToScreen } from "../navigationRef";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import Spacer from "./Spacer";

const NavLink = ({ text, routeName }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigateToScreen(routeName)}>
        <Spacer>
          <Text style={styles.link}>{text}</Text>
        </Spacer>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "white",
    fontSize: 17,
  },
});

export default NavLink;
