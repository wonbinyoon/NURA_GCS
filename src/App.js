import { useEffect, useState, useRef } from "react";

import { socket, serIsOn } from "./socket";

import Navball from "./navball";
import NavInfo from "./navInfo";
import Map from "./map3d";
import CFG from "./cfg_window";

import "./App.css";

function App() {
  const [imu, imuSet] = useState([]);
  const [gps, gpsSet] = useState([]);
  const [coord, coordSet] = useState([]);
  const [alt, altSet] = useState([]);
  const timeRef = useRef({ imu: -1, gps: -1 });

  useEffect(() => {
    const set_imu = (data) => {
      if (Array.isArray(data.imu) && data.imu.length > 0) {
        imuSet((imu) => [...imu, ...data.imu]);
        timeRef.current.imu = data.time;
      }
    };
    const set_gps = (data) => {
      if (Array.isArray(data.gps) && data.gps.length > 0) {
        gpsSet([...gps, ...data.gps]);

        let coordList = [];
        let altList = [];
        data.gps.map((value) => {
          coordList.push([value.lat, value.lon]);
          altList.push(value.height);
        });
        coordSet((coord) => [...coord, ...coordList]);
        altSet((alt) => [...alt, ...altList]);
        timeRef.current.gps = data.time;
      }
    };

    socket.on("here_are_your_imu", set_imu);
    socket.on("here_are_your_gps", set_gps);

    let imuInt = setInterval(() => {
      if (serIsOn) {
        socket.emit("give_me_imu", timeRef.current.imu);
      }
    }, 15);
    let gpsInt = setInterval(() => {
      if (serIsOn) {
        socket.emit("give_me_gps", timeRef.current.gps);
      }
    }, 30);

    return () => {
      socket.off("here_are_your_imu", set_imu);
      socket.off("here_are_your_gps", set_gps);

      clearInterval(imuInt);
      clearInterval(gpsInt);
    };
  }, []);

  return (
    <div className="App">
      <CFG />
      <div className="nav-info">
        <Navball euler={imu[imu.length - 1]?.euler} />
        <NavInfo imu={imu} gps={gps} />
      </div>
      <div className="map">
        <Map coord={coord} alt={alt} />
      </div>
    </div>
  );
}

export default App;
