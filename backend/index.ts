const cors = require("cors");
import express, { Express, Request, Response } from "express";
import axios from "axios";
import fs from "fs";
import "dotenv/config";

const app: Express = express();
const port = process.env.PORT || 3000;
const gameIdsArr: Array<string> = JSON.parse(
  fs.readFileSync("./top-20-games-IDs.json", "utf8"),
);
const top20GamesArr: Array<Game> = [];

const writeTop20GamesFile = () => {
  axios
    .get("https://steamspy.com/api.php?request=top100in2weeks")
    .then((res) => {
      let data: any = res.data;
      data = Object.keys(data).slice(-20);
      fs.writeFileSync("top-20-games-IDs.json", JSON.stringify(data));
    })
    .catch((err) => console.log(err));
};

const fetchGames = () => {
  gameIdsArr.forEach((gameId) => {
    axios
      .get(`http://store.steampowered.com/api/appdetails?appids=${gameId}`)
      .then((res) => {
        let data: any = res.data;
        top20GamesArr.push({
          id: data[gameId].data.steam_appid,
          name: data[gameId].data.name,
          src: data[gameId].data.header_image,
        });
      });
  });
};

interface Game {
  id: number;
  name: string;
  src: string;
}

app.use(cors());

fetchGames();

// writeTop20GamesFile()

app.get("/", (req, res) => {
  res.statusMessage = "Success";
  res.status(200).send(top20GamesArr.reverse());
  console.log(`[server]: Sending response with status code: ${res.statusCode}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
