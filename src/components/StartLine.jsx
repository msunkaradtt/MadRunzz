import React from 'react'

const StartLine = () => {
    return (
        <mesh position={[0,0,-1]}>
            <boxGeometry args={[10, 0.1, 0.1]} />
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

export default StartLine