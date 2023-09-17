import Navball from "./navball";
import NavInfo from "./navInfo";
import Map from "./map3d";

import "./App.css";

function App() {
  return (
    <div className="App">
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
