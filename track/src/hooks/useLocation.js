import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  // const [subscriber, setSubscriber] = useState(null);
  // const [location, setLocation] = useState(null);

  useEffect(() => {
    let subscriber = null;
    const startWatching = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") setErr("Permission Denied!");
        // let location = await getCurrentPositionAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 10,
          },
          callback
        );

        // setLocation(location);
      } catch (err) {
        setErr(err);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
