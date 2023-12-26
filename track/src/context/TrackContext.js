import trackerApi from "../api/tracker";
import { navigateToScreen } from "../navigationRef";
import createDataContext from "./createDataContext";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_track": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const createTrack = (dispatch) => async (name, locations) => {
  try {
    await trackerApi.post("/tracks", { name, locations });
    console.log("successfully saved tracks in db");
    navigateToScreen("TrackListFlow");
  } catch (err) {
    console.log(err);
  }
};
const fetchTrack = (dispatch) => async (callback) => {
  console.log("fetching tracks...");
  try {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_track", payload: response.data });
    callback(true);
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { createTrack, fetchTrack },
  []
);
