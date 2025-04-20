import React from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useStore } from  '../store'

const Coin = ({ id, pos, score }) => {
    const collectCoin = useStore(state => state.collectCoin)

    return (
        <RigidBody type="fixed" onCollisionEnter={() => collectCoin(id, score)}>
            <CuboidCollider args={[0.5,0.5,0.5]} sensor />
            <mesh position={pos}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="yellow" />
            </mesh>
        </RigidBody>
    )
}

export default Coin