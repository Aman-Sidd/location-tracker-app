import React, { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { navigateToScreen } from "../navigationRef";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const { reset } = useContext(LocationContext);
  const {
    state: { name, locations },
  } = useContext(LocationContext);

  const saveTrack = () => {
    createTrack(name, locations);
    reset();
    // navigateToScreen("TrackListFlow");
  };

  return [saveTrack];
};
