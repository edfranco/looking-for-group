import express, { Express, Request, Response } from "express";
import { MongoClient } from 'mongodb';
import { getMongoDbUri } from "./functions";
import axios from "axios";
import fs from "fs";

import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3000;

const uri = getMongoDbUri(process.env.MONGODB_USER, process.env.MONGODB_PW);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


interface Game {
  id: number
  name: string
  src: string
}

const gameIdsArr: Array<string> = JSON.parse(fs.readFileSync('./top-10-games.json', 'utf8'));
const top10GamesArr: Array<Game> = [];

const writeTop10GamesFile = () => {
  axios
    .get("https://steamspy.com/api.php?request=top100in2weeks")
    .then((res) => {
        let data:any = res.data;
        data = Object.keys(data).slice(-10)
        fs.writeFileSync("top-10-games-IDs.json", JSON.stringify(data))
    }
    )
    .catch((err) => console.log(err));
};

const fetchTop10Games = () => {
  gameIdsArr.forEach((gameId)=> {
    axios.get(`http://store.steampowered.com/api/appdetails?appids=${gameId}`)
    .then((res) => {
      let data: any = res.data;
      top10GamesArr.push({
        id: data[gameId].data.steam_appid,
        name: data[gameId].data.name,
        src: data[gameId].data.header_image
      })
      // console.log(top10GamesArr)
    })
  })
}

fetchTop10Games()
console.log(top10GamesArr);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

var dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(function () {
  writeTop10GamesFile();
}, dayInMilliseconds);

let gamesArr: string[] = Object.keys(JSON.parse(fs.readFileSync('top-100-games.json', 'utf8'))).slice(-10).reverse();
// writeTop10GamesFile()
