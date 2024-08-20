import express, { Express, Request, Response } from "express";
import axios from "axios";
import fs from "fs";

const app: Express = express();
const port = process.env.PORT || 3000;

const writeTop10GamesFile = () => {
  axios
    .get("https://steamspy.com/api.php?request=top100in2weeks")
    .then((res) => {
        let data:any = res.data;
        data = Object.keys(data).slice(-10)
        fs.writeFileSync("top-10-games.json", JSON.stringify(data))
    }
    )
    .catch((err) => console.log(err));
};

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

var dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(function () {
  writeTop10GamesFile();
}, dayInMilliseconds);

let gamesArr: string[] = Object.keys(JSON.parse(fs.readFileSync('top-100-games.json', 'utf8'))).slice(-10).reverse();
writeTop10GamesFile()
