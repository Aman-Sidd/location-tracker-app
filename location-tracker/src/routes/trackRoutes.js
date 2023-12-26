const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const user = req.user;
  const tracks = await Track.find({ userId: user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations)
    return res.status(422).send("You must provide name and locations");

  try {
    const track = new Track({ userId: req.user._id, name, locations });
    await track.save();
    res.send(track);
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

module.exports = router;
