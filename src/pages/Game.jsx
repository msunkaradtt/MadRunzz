import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useStore } from  '../store'

import { StartScreen, GameCanvas } from "../components"


const Game = () => {
  const start = useStore(state => state.start)
  const setStart = useStore(s => s.setStart)

  useEffect(() => {
    const onKey = e => {
      if (e.key.toLowerCase() === 'w' && !start) {
        setStart()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [start, setStart])

  return (
    <div className="w-full h-screen bg-gray-800">
      {start && (
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Physics>
            <Suspense fallback={null}>
              <GameCanvas />
            </Suspense>
          </Physics>
        </Canvas>
      )}
    </div>
  )
}
  
export default Game