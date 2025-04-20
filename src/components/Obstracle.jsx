import React from 'react'
import { RigidBody } from '@react-three/rapier'

const Obstacle = ({ id, pos, size }) => {
    return (
        <RigidBody type="fixed">
            <mesh position={pos}>
                <boxGeometry args={size} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
}

export default Obstacle