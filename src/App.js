import Navball from "./navball";
import NavInfo from "./navInfo";
import Map from "./map3d";
import CFG from "./cfg_window";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CFG />
      <div className="nav-info">
        <Navball />
        <NavInfo />
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
}

export default App;
