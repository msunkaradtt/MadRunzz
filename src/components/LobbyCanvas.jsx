import React from "react"
import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, Gltf } from "@react-three/drei"

const LobbyCanvas = (props) => {
    return (
        <Canvas shadows 
        gl={{ antialias: false }} 
        dpr={[1, 1.5]} 
        camera={{ position: [4, -1, 8], fov: 35 }}>
            <color attach="background" args={['skyblue']} />
            <Stage intensity={0.5} 
            preset="rembrandt" 
            shadows={{ type: 'accumulative', color: 'skyblue', colorBlend: 2, opacity: 1}}
            adjustCamera={1}
            environment="city">
                <Gltf castShadow receiveShadow src={"./assets/models/loddy/base.glb"} />
            </Stage>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} makeDefault />
        </Canvas>
    )
}

export default LobbyCanvas