import { useState, useEffect, useRef } from "react";
import { socket, serIsOn } from "./socket";

import "./navInfo.css";

function NavInfo() {
  const height = window.innerHeight > 700 ? window.innerHeight - 360 : 340;

  const [vel, velSet] = useState(0.0);
  const [h_vel, h_velSet] = useState(0.0);
  const [v_vel, v_velSet] = useState(0.0);

  const [accel, accelSet] = useState(0.0);
  const [h_accel, h_accelSet] = useState(0.0);
  const [v_accel, v_accelSet] = useState(0.0);

  const [alti, altiSet] = useState(0.0);
  const [ap, apSet] = useState(0.0);
  const [t_ap, t_apSet] = useState(0.0);

  const timeRef = useRef({ imu: -1, gps: -1 });

  useEffect(() => {
    const set_imu = (imu_data) => {
      timeRef.current.imu = imu_data.time;

      const g = 9.8;

      let h_a2 =
        Math.pow(g * imu_data.acc[0], 2) + Math.pow(g * imu_data.acc[1], 2);
      let h_a = Math.sqrt(h_a2);
      let v_a = g * imu_data.acc[2];
      let a = Math.sqrt(h_a2 + Math.pow(v_a, 2));

      accelSet(a);
      h_accelSet(h_a);
      v_accelSet(v_a);
    };
    socket.on("here_are_your_imu", set_imu);

    const set_gps = (gps_data) => {
      timeRef.current.gps = gps_data.time;

      let h2 = Math.pow(gps_data.velN, 2) + Math.pow(gps_data.velE, 2);
      let h_velocity = Math.sqrt(h2);
      let v_velocity = gps_data.velD;
      let velocity = Math.sqrt(h2 + Math.pow(v_velocity, 2));

      velSet(velocity);
      h_velSet(h_velocity);
      v_velSet(v_velocity);

      let altitute = gps_data.height;
      let apoapsis = altitute + Math.pow(v_velocity, 2) / 19.6;
      let timeToApoapsis = v_velocity / 9.8;

      altiSet(altitute);
      apSet(apoapsis);
      t_apSet(timeToApoapsis);
    };
    socket.on("here_are_your_gps", set_gps);

    let imuInt = setInterval(() => {
      if (serIsOn) {
        socket.emit("give_me_imu", timeRef.current.imu);
      }
    }, 500);

    let gpsInt = setInterval(() => {
      if (serIsOn) {
        socket.emit("give_me_gps", timeRef.current.gps);
      }
    }, 1000);

    return () => {
      socket.off("here_are_your_imu", set_imu);
      socket.off("here_are_your_gps", set_gps);
      clearInterval(imuInt);
      clearInterval(gpsInt);
    };
  }, []);

  return (
    <div className="info-container" style={{ height: height }}>
      <h3>정보</h3>
      <table>
        <tbody>
          <tr>
            <th>속력</th>
            <td>{vel.toFixed(2)} m/s</td>
          </tr>
          <tr style={{ border: "none", fontSize: "13px" }}>
            <th>수평속도</th>
            <td>{h_vel.toFixed(2)} m/s</td>
          </tr>
          <tr style={{ fontSize: "13px" }}>
            <th>수직속도</th>
            <td>{v_vel.toFixed(2)} m/s</td>
          </tr>
          <tr>
            <th>가속도</th>
            <td>
              {accel.toFixed(2)} m/s<sup>2</sup>
            </td>
          </tr>
          <tr style={{ border: "none", fontSize: "13px" }}>
            <th>수평가속도</th>
            <td>
              {h_accel.toFixed(2)} m/s<sup>2</sup>
            </td>
          </tr>
          <tr style={{ fontSize: "13px" }}>
            <th>수직가속도</th>
            <td>
              {v_accel.toFixed(2)} m/s<sup>2</sup>
            </td>
          </tr>
          <tr>
            <th>고도</th>
            <td>{alti.toFixed(1)} m</td>
          </tr>
          <tr style={{ border: "none", fontSize: "13px" }}>
            <th>최고점</th>
            <td>{ap.toFixed(1)} m</td>
          </tr>
          <tr style={{ fontSize: "13px" }}>
            <th>도달 시간</th>
            <td>{t_ap.toFixed(1)} s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NavInfo;
