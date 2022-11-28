import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Game from "../models/Game";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Select,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
const Index = ({ teams }) => {
  console.log("teams :>> ", teams);
  const [games, setGames] = useState([]);
  const [values, setValues] = useState({
    ht: "all",
    at: "all",
    ftr: "all",
    htr: "all",
  });

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

  function formValues(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  function getData(e, v) {
    e.preventDefault();
    console.log("values from state :>> ", values);
    // return;
    const ht = e.target[0].value;
    const at = e.target[1].value;
    const ftr = e.target[2].value;
    const htr = e.target[3].value;


    if (ht == "" || at == "") return;
    const params = { ht, at, ftr, htr };
    axios
      .get(`/api/get`, { params })
      .then((res) => res.data)
      .then((data) => setGames(data))
      .catch((e) => console.log("error :>> ", e));
  }
  console.log("games :>> ", games);
  return (
    <>
    <div>HOME PAGE</div>
      <button onClick={addGame} disabled>
        ADD
      </button>
      <button onClick={deleteMany} disabled>
        DELETE
      </button>
      <Center bg="gray.300">fields with * are required</Center>
      <form style={{ width: "100%" }} onSubmit={getData}>
        <HStack>
          <FormControl>
            <FormLabel>Home Team</FormLabel>
            <Select id="ht" onChange={formValues}>
              <option key="all" value="all" defaultValue="all">
                ALL
              </option>
              {teams.map((v) => {
                return (
                  v && (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  )
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Away Team</FormLabel>
          <Select id="at" onChange={formValues}>
            <option key="all" value="all">
              ALL
            </option>
            {teams.map((v) => {
              return (
                v && (
                  <option key={v} value={v}>
                    {v}
                  </option>
                )
              );
            })}
          </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Full Time Result</FormLabel>
          <Select id="ftr" onChange={formValues}>
            <option key="all" value="all">
              All
            </option>
            <option key="home" value="H">
              Home
            </option>
            <option key="draw" value="D">
              Draw
            </option>
            <option key="away" value="A">
              Away
            </option>
          </Select>
          </FormControl>
          <FormControl>
          <FormLabel>Half Time Result</FormLabel>
          <Select id="htr" onChange={formValues}>
            <option key="all" value="all">
              All
            </option>
            <option key="home" value="H">
              Home
            </option>
            <option key="draw" value="D">
              Draw
            </option>
            <option key="away" value="A">
              Away
            </option>
          </Select>
          </FormControl>
          <Button type="submit">GO!</Button>
        </HStack>
      </form>
      <TableContainer>
        <Table size="md" variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Teams</Th>
              <Th>FT</Th>
              <Th>HT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((g) => (
              <Tr key={g._id}>
                <Td>
                  {g.HomeTeam} - {g.AwayTeam}
                </Td>
                <Td>
                  {g.FTHG} - {g.FTAG}
                </Td>
                <Td>
                  {g.HTHG} - {g.HTAG}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  // const res = await Game.find({});
  // console.log("result :>> ", res);
  const teams = await Game.distinct("HomeTeam");
  // const games = res.map((v) => {
  //   const game = v.toObject();
  //   game._id = game._id.toString();
  //   return game;
  // });

  return { props: { teams } };
}

export default Index;
