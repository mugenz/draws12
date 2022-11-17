import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Game from "../models/Game";
import axios from "axios";
import { Box, Center, Divider, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
const Index = ({ teams }) => {
  console.log("teams :>> ", teams);
  const [games, setGames] = useState([])
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

  function getHT(e) {
    e.preventDefault()
    console.log('e.target :>> ', e.target.value);
    axios.get(`/api/get?ht=${e.target.value}`).then((res)=>res.data).then((data)=>setGames(data)).catch((e)=>console.log('error :>> ', e))
  }
console.log('games :>> ', games);
  return (
    <>
      <div>HOME PAGE</div>
      <button onClick={addGame} disabled>
        ADD
      </button>
      <button onClick={deleteMany} disabled>
        DELETE
      </button>
      <Select  onChange={getHT} placeholder="selest a Home Team">
        {teams.map((v)=>{return v && 
        <option key={v} value={v}>{v}
        </option>
      })}
      </Select>
      <Flex width="100%">
        <Center w="full" h="70px">Teams</Center>
        <Center w="full" h="70px">FT</Center>
        <Center w="full" h="70px">HT</Center>
      </Flex>
      {games.map((g)=>(
      <Flex key={g._id} w="100%">
        <Flex direction="column"  width="100%">
          <Center w="full" h="30px">{g.HomeTeam}</Center>
          <Center w="full" h="30px">{g.AwayTeam}</Center>
          <Divider/>
        </Flex>
        <Flex direction="column" width="100%">
          <Center w="full" h="30px">{g.FTHG}</Center>
          <Center w="full" h="30px">{g.FTAG}</Center>
          <Divider/>
        </Flex>
        <Flex direction="column" width="100%">
          <Center w="full" h="30px">{g.HTHG}</Center>
          <Center w="full" h="30px">{g.HTAG}</Center>
          <Divider/>
        </Flex>

      </Flex>
      
      )
        
        )}
    </>
  );
};


export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  // const res = await Game.find({});
  // console.log("result :>> ", res);
  const teams = await Game.distinct('HomeTeam')
  // const games = res.map((v) => {
  //   const game = v.toObject();
  //   game._id = game._id.toString();
  //   return game;
  // });

  return { props: { teams } };
}

export default Index;
