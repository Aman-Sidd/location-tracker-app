import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import { AntDesign } from "@expo/vector-icons";
import LoadingSpinner from "../components/LoadingSpinner";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTrack } = useContext(TrackContext);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTrack(setFetched);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {fetched ? (
        state.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: "white",
              fontSize: 20,
            }}
          >
            No Tracks Added Yet.
          </Text>
        ) : (
          <FlatList
            data={state}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate("TrackDetail", { _id: item._id })
                }
              >
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <AntDesign
                    name="rightcircle"
                    size={24}
                    color="rgb(115,13,92)"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        )
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(93,16,73)",
    padding: 10,
  },
  itemContainer: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(115,13,92)",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 75,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default TrackListScreen;
