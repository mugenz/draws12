import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const GameSchema = new mongoose.Schema({
  Div: {
    type: String,
  },
  Date: {
    type: String,
  },
  Time: {
    type: String,
  },
  HomeTeam: {
    type: String,
  },
  AwayTeam: {
    type: String,
  },
  FTHG: {
    type: Number,
  },
  FTAG: {
    type: Number,
  },
  FTR: {
    type: String,
  },
  HTHG: {
    type: Number,
  },
  HTAG: {
    type: Number,
  },
  HTR: {
    type: String,
  },
});

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
