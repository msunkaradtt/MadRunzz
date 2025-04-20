import React from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useStore } from  '../store'

const CameraController = () => {
    const { camera } = useThree()
    const players = useStore(state => state.players)

    useFrame(() => {
        const alive = players.filter(p => p.alive)
        if (alive.length === 0) return

        const avgX = alive.reduce((sum, p) => sum + p.position[0], 0) / alive.length
        const avgZ = alive.reduce((sum, p) => sum + p.position[2], 0) / alive.length
        const target = new THREE.Vector3(avgX, 5, avgZ + 10)

        camera.position.lerp(target, 0.1)
        camera.lookAt(new THREE.Vector3(avgX, 0, avgZ))
    })

    return null
}

export default CameraController