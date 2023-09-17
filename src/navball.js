// import { createRoot } from "react-dom/client";
import React from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

import "./navball.css";

/**
 * Navball을 html 위에 출력하는 함수,
 * 3D로 멋지게 출력함
 * @returns Navball 캔버스가 포함된 깔끔한 html 구문
 */
function Navball() {
  return (
    <div id="navball-container">
      <Canvas
        camera={{
          zoom: 3.55,
          top: 150,
          bottom: -150,
          left: 150,
          right: -150,
          near: 1,
          far: 1024,
          position: [0, 0, 200],
        }}
        orthographic={true} // 멋진 orthographic 카메라
        flat={true} // 아카데미 색공간 말고 그냥 색공간 씁시다
      >
        <NavMesh />
      </Canvas>
    </div>
  );
}

/**
 * navball을 출력하는 함수.
 * mesh가 canvas 안에 있으니까 오류가 떠서 이렇게 분리함.
 * @returns navball을 three.js로 랜더링한 그거
 */
function NavMesh() {
  const myMesh = React.useRef();

  // navball 회전을 위한 함수
  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime();
  });

  // 텍스쳐 로딩
  const navTexture = useLoader(TextureLoader, "navball.png");
  navTexture.anisotropy = 16;

  return (
    <mesh ref={myMesh}>
      <sphereGeometry args={[40, 48, 32]} />
      <meshBasicMaterial map={navTexture} />
    </mesh>
  );
}

export default Navball;
