import React from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

const Ground = () => {
    return (
        <RigidBody type="fixed">
            <mesh rotation-x={-Math.PI/2}>
                <planeGeometry args={[50, 1000]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            <CuboidCollider args={[25, 0.1, 500]} friction={1.0} restitution={0.1} position={[0, -0.1, 0]} />
        </RigidBody>
    )
}

export default Ground