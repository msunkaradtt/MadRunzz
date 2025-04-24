import React, { Suspense, useEffect, useState } from 'react'

import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Loader } from "@react-three/drei"

import { Interface, MadRunzz } from "../components"


const Game = () => {
  return (
    <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ]}
    >
      <Canvas shadows camera={{
        fov: 45,
        near: 0.1,
        far: 40,
        position: [2.5, 4, -6],
      }}
      >
        <Suspense fallback={null}>
          <MadRunzz />
        </Suspense>
      </Canvas>
      <Loader />
      <Interface />
    </KeyboardControls>
  )
}
  
export default Game