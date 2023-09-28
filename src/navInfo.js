import { useState, useEffect } from "react";

import "./navInfo.css";

/**
 * 서버로부터 받은 정보를 적절히 가공 후 표시하기 위한 함수
 * @returns 인포가 적힌 html
 */
function NavInfo(props) {
  const height = window.innerHeight > 700 ? window.innerHeight - 360 : 340;

  let [vel, velSet] = useState(0.0);
  let [h_vel, h_velSet] = useState(0.0);
  let [v_vel, v_velSet] = useState(0.0);

  let [accel, accelSet] = useState(0.0);

  let [alti, altiSet] = useState(0.0);
  let [ap, apSet] = useState(0.0);
  let [t_ap, t_apSet] = useState(0.0);

  useEffect(() => {
    let h2 =
      Math.pow(props.imu_data.vel.x, 2) + Math.pow(props.imu_data.vel.y, 2);
    let h_velocity = Math.sqrt(h2);
    let v_velocity = props.imu_data.vel.z;
    let velocity = Math.sqrt(h2 + Math.pow(v_velocity, 2));

    let a = Math.sqrt(
      Math.pow(props.imu_data.accel.x, 2) +
        Math.pow(props.imu_data.accel.y, 2) +
        Math.pow(props.imu_data.accel.z, 2)
    );

    velSet(velocity);
    h_velSet(h_velocity);
    v_velSet(v_velocity);
    accelSet(a);

    let altitute = props.gps_data.pos.height;
    let apoapsis = altitute + Math.pow(v_velocity, 2) / 19.6;
    let timeToApoapsis = v_velocity / 9.8;

    altiSet(altitute);
    apSet(apoapsis);
    t_apSet(timeToApoapsis);
  }, [props]);

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
            <th>수평속력</th>
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
