import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useKeyboardControls } from '../hooks'
import { useStore } from  '../store'

const Player = ({ id, startPos }) => {
    const bodyRef = useRef()
    const meshRef = useRef()
    const { left, right, jump, crouch } = useKeyboardControls()

    const isStarted = useStore(state => state.start)
    const updateDistance = useStore(state => state.updateDistance)
    const updatePosition = useStore(state => state.updatePosition)
    const markDead = useStore(state => state.markDead)

    useFrame(() => {
        if (!bodyRef.current || !isStarted) return

        const vel = { x: 0, y: 0, z: -5 }
        if (left) vel.x = -2
        if (right) vel.x = 2
        bodyRef.current.setLinvel(vel, true)
        
        if (jump) bodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
        
        if (meshRef.current) {
            meshRef.current.scale.set(1, crouch ? 0.5 : 1, 1) 
        }

        const pos = bodyRef.current.translation()
        updateDistance(id, Math.abs(pos.z))
        updatePosition(id, [pos.x, pos.y, pos.z])
    })

    return (
        <RigidBody ref={bodyRef} colliders={false} onCollisionEnter={() => markDead(id)} 
        position={startPos} linearDamping={0.5} angularDamping={0.5} >
            <CuboidCollider args={[0.5, 1, 0.5]} friction={0.8} restitution={0.1} />
            <mesh ref={meshRef}>
                <boxGeometry args={[1, 2, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>
    )
}

export default Player