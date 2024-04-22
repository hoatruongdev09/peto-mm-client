import { useState } from "react";
import socketHelper from "./socket-helper/socket.js";

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [findMatchData, setFindMatchData] = useState({
    token: "",
    hero: "",
    weapon: "",
    mode: "arena_sole",
    region: "vn",
  })

  const onFindMatch = () => {
    if (isConnected) {
      socketHelper.disconnect()
    } else {
      socketHelper.connect("http://localhost:8000", {
        query: findMatchData
      })

      handleSocketEvent(socketHelper.socket)
    }
  }

  const handleSocketEvent = (socket) => {

    socket.on("connect", () => {
      setIsConnected(true)
      console.log("on connect")
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      console.log("on disconnect")
    })

    socket.on("queue:player_changes", (data) => {
      console.log("player queue changes: ", data)
    })

    socket.on("match:created", (data) => {
      console.log("match created: ", data)
    })
  }

  const onFindMatchDataChange = (e) => {
    setFindMatchData({
      ...findMatchData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="App">
      <form>
        <label htmlFor="input-token">Access Token: </label>
        <input type="text" id="input-token" name="token" value={findMatchData.token} onChange={(e) => onFindMatchDataChange(e)}></input>
        <br></br>
        <label htmlFor="input-hero">Hero: </label>
        <input type="text" id="input-hero" name="hero" value={findMatchData.hero} onChange={(e) => onFindMatchDataChange(e)}></input>
        <br></br>
        <label htmlFor="input-weapon">Weapon: </label>
        <input type="text" id="input-weapon" name="weapon" value={findMatchData.weapon} onChange={(e) => onFindMatchDataChange(e)}></input>
        <br></br>
        <label htmlFor="input-mode">Mode:</label>
        <select name="mode" id="input-mode" value={findMatchData.mode} onChange={(e) => onFindMatchDataChange(e)}>
          <option value="arena_sole">Arena Sole Survival</option>
        </select>
        <br></br>
        <label htmlFor="input-region">Region:</label>
        <select name="region" id="input-region" value={findMatchData.region} onChange={(e) => onFindMatchDataChange(e)}>
          <option value="vn">Vietnam</option>
        </select>
      </form>
      <button onClick={() => onFindMatch()}>{isConnected ? "Stop Find Match" : "Find match"}</button>
    </div>
  );
}

export default App;
