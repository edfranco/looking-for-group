import { useState } from "react";
let gamesArr = [
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1723243773",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1723254824",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg?t=1723124013",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg?t=1723430791",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg?t=1723223912",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2139460/header.jpg?t=1723401976",
    "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/440/header.jpg?t=1722642121",
  ];


// `http://api.steampowered.com/<interface name>/<method name>/v<version>/?key=${process.env.REACT_APP_BASE_URL}`
console.log(process.env.REACT_APP_BASE_API_KEY)

interface State {
  images:string[];
}

export default function carousel() {
    const [games, setGames] = useState([]);
    
  return (
    <div className="top-carousel flex my-16">
      {games.map((game) => (
        <img
          src={game}
          className="carousel-slide h-96 w-96 bg-shades-white mx-2"
        />
      ))}
    </div>
  );
}
