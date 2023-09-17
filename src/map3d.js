import { useEffect, useRef } from "react";

import * as maptalks from "maptalks";

/**
 * 지도를 출력하는 아름다운 함수
 * @returns 지도가 있는 div
 */
function Map() {
  // 지도 인스턴스가 남아있는지 검사하기 위한 레퍼런스
  const ref = useRef();

  // 지도 너비, 높이
  const width = window.innerWidth - 360;
  const height = window.innerHeight - 40;

  // div가 생성된 후 지도를 만들기 위한 useEffect
  useEffect(() => {
    // 지도
    const map = new maptalks.Map("map", {
      center: [127.0794723, 37.5405464],
      zoom: 17,
      pitch: 40,
      centerCross: true,
      baseLayer: new maptalks.TileLayer("tile", {
        urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c"],
      }),
    });
    ref.current = map;

    // 임시 선(line)
    const line = new maptalks.LineString(
      [
        [127.0794723, 37.5405564],
        [127.0794625, 37.5405462],
        [127.0783527, 37.5405153],
      ],
      {
        properties: {
          altitude: [100, 125, 170],
        },
        symbol: {
          lineColor: "rgb(255, 0, 55)",
          lineWidth: 3,
        },
      }
    );

    // 지도에 선 긋기
    new maptalks.VectorLayer("vector", [line], { enableAltitude: true }).addTo(
      map
    );

    return () => {
      if (ref.current) {
        // 이전에 실행한 maptalks.Map 인스턴스가 남아있는 경우
        ref.current.remove(); // 제거
      }
    };
  }, []);
  return (
    <>
      <div id="map" style={{ width: width, height: height }}></div>
    </>
  );
}

export default Map;
