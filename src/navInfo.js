import "./navInfo.css";

/**
 * 서버로부터 받은 정보를 적절히 가공 후 표시하기 위한 함수
 * @returns 인포가 적힌 html
 */
function NavInfo() {
  const height = window.innerHeight > 700 ? window.innerHeight - 360 : 340;
  return (
    <div className="info-container" style={{ height: height }}>
      <h3>정보</h3>
      <table>
        <tr>
          <th>속력</th>
          <td>0 m/s</td>
        </tr>
        <tr style={{ border: "none", fontSize: "13px" }}>
          <th>수평속력</th>
          <td>0 m/s</td>
        </tr>
        <tr style={{ fontSize: "13px" }}>
          <th>수직속도</th>
          <td>0 m/s</td>
        </tr>
        <tr>
          <th>가속도</th>
          <td>
            0 m/s<sup>2</sup>
          </td>
        </tr>
        <tr>
          <th>고도</th>
          <td>0 m</td>
        </tr>
        <tr style={{ border: "none", fontSize: "13px" }}>
          <th>최고점</th>
          <td>0 m</td>
        </tr>
        <tr style={{ fontSize: "13px" }}>
          <th>도달 시간</th>
          <td>0 s</td>
        </tr>
      </table>
    </div>
  );
}

export default NavInfo;
