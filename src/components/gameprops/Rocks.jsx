import React, { useRef } from 'react'

import { RigidBody } from '@react-three/rapier'

import AdventurePack, { AdventurePackObjects } from '../models/AdventurePack'

import { useFrame } from '@react-three/fiber'

import { useStore } from  '../../store'

import { GetForwardTranslation, ObjectsPosition } from '../../utils/utils'

import { SPEED } from '../../common/constants'

import { HitSound2 } from '../../common/Audio'


const Rocks = (props) => {
    const ref = useRef()

    const end = useStore((state) => state.end)


    useFrame((state, delta) => {
        const speed = delta * SPEED
        const fT = GetForwardTranslation(ref, speed)

        ref.current.setTranslation(fT, true)
        ObjectsPosition[props.uuid] = fT

        if (ObjectsPosition[props.uuid]?.z > 10) {
            delete ObjectsPosition[props.uuid]
        }
    })

    return (
        <RigidBody
        ref={ref}
        name="Rocks"
        colliders={"hull"}
        type="fixed"
        position={[1, 0.1, props.position[2]]}
        scale={[1.5, 2, 1]}
        {...props}
        onCollisionEnter={(payload) => {
            HitSound2.currentTime = 0
            HitSound2.play()
            end()
        }}>
            <group name="Rocks">
            <AdventurePack 
            name={AdventurePackObjects.Rocks} 
            scale={0.027} 
            rotation={[-Math.PI / 2, 0, props.side < 0 ? -Math.PI : 0]} 
            position={[0.75 * props.side, -0.1, -2]} 
            />
            </group>
        </RigidBody>
    )
}

export default Rocks