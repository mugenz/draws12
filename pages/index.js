import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Game from "../models/Game";
import axios from "axios";
import prem from "/public/stats/en_prem_21-22.json";

const Index = ({ games }) => {
  console.log("games :>> ", games);

  function getAll() {
    return axios.get("/api/add").then((res) => res);
  }

  function addGame() {
    axios
      .post("/api/add", {
        name: "NIKOS",
      })
      .then((res) => {
        console.log("game ADDED :>> ", res.data);
        getAll().then((res) => console.log("res :>> ", res));
      });
  }
  function deleteMany() {
    axios.delete("/api/add").then((res) => {
      console.log("games deleted :>> ", res.data);
      getAll().then((res) => console.log("res :>> ", res));
    });
  }

  return (
    <>
      <div>HOME PAGE</div>
      <button onClick={addGame}>ADD</button>
      <button onClick={deleteMany}>DELETE</button>
      {games.map((game) => (
        <div key={game._id}>
          {game.HomeTeam} - {game.AwayTeam} : {game.FTHG} - {game.FTAG} :{" "}
          {game.HTHG} - {game.HTAG}
        </div>
      ))}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const res = await Game.find({});
  console.log("result :>> ", res);
  const games = res.map((v) => {
    const game = v.toObject();
    game._id = game._id.toString();
    return game;
  });

  return { props: { games } };
}

export default Index;
