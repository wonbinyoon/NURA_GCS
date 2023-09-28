import { useState } from "react";

import Navball from "./navball";
import NavInfo from "./navInfo";
import Map from "./map3d";

import "./App.css";

function App() {
  let _imu_data = {
    vel: {
      x: 3.2,
      y: 2.1,
      z: 16.4,
    },
    accel: {
      x: 0.2,
      y: -0.1,
      z: -0.12,
    },
  };
  let _gps_data = {
    pos: {
      height: 201.23,
    },
  };

  let [imu_data, imu_dataSet] = useState(_imu_data);
  let [gps_data, gps_dataSet] = useState(_gps_data);

  setTimeout(() => {
    let o_imu_data = {
      vel: {
        x: 0,
        y: 0,
        z: 0,
      },
      accel: {
        x: 0.2,
        y: -0.1,
        z: -0.12,
      },
    };
    let o_gps_data = {
      pos: {
        height: 100.2123,
      },
    };

    imu_dataSet(o_imu_data);
    gps_dataSet(o_gps_data);

    console.log("changed");
  }, 5000);
  return (
    <div className="App">
      <div className="nav-info">
        <Navball />
        <NavInfo imu_data={imu_data} gps_data={gps_data} />
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
}

export default App;
