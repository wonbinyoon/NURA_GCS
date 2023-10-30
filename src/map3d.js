import { useEffect, useRef } from "react";
import { socket, serIsOn } from "./socket";

import * as maptalks from "maptalks";

/**
 * 지도를 출력하는 아름다운 함수
 * @returns 지도가 있는 div
 */
function Map() {
  const ref_map = useRef();
  const ref_line = useRef();
  const timeRef = useRef(-1);

  const width = window.innerWidth > 660 ? window.innerWidth - 360 : 300;
  const height = window.innerHeight > 700 ? window.innerHeight - 40 : 660;

  // div가 생성된 후 한번 실행되는 함수
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
    ref_map.current = map;

    // 지도 위 선
    const line = new maptalks.LineString(undefined, {
      properties: {
        altitude: [],
      },
      symbol: {
        lineColor: "rgb(255, 0, 55)",
        lineWidth: 3,
      },
    });
    ref_line.current = line; // 블록 밖에서도 선을 수정할 수 있게

    // 지도에 선을 긋는 벡터 레이어
    new maptalks.VectorLayer("vector", line, { enableAltitude: true }).addTo(
      map
    );

    // socket
    const edit_line = (data) => {
      if (Array.isArray(data.pos) && data.pos.length !== 0) {
        ref_map.current.setCenter(data.pos[data.pos.length - 1]);
        const coords = ref_line.current.getCoordinates();
        if (!coords) {
          // 비어있으면
          ref_line.current.setCoordinates(data.pos);
          ref_line.current.setProperties({ altitude: data.alti });
        } else {
          // 안 비어있으면
          ref_line.current.setCoordinates([...coords, ...data.pos]);
          ref_line.current.setProperties({
            altitude: [
              ...ref_line.current.getProperties().altitude,
              ...data.alti,
            ],
          });
        }
        timeRef.current = data.time;
      }
    };
    socket.on("pull_map_data", edit_line); // socket 이벤트 추가

    let interval = setInterval(() => {
      if (serIsOn) {
        socket.emit("get_map_data", timeRef.current);
      }
    }, 1000);

    return () => {
      // 언마운트시 실행
      if (ref_map.current) {
        // 이전에 실행한 maptalks.Map 인스턴스가 남아있는 경우
        ref_map.current.remove(); // 제거
      }
      if (ref_line.current) {
        ref_line.current.remove();
      }
      socket.off("pull_map_data", edit_line); // socket 이벤트 제거
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: width, height: height }}></div>
    </>
  );
}

export default Map;
