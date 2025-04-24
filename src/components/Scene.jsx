import React, { useEffect, useRef } from 'react'
import { RigidBody, quat, vec3 } from '@react-three/rapier'

const Scene = () => {
    const rigidBody = useRef()

    useEffect(() => {
        if (rigidBody.current) {
            const position = vec3(rigidBody.current.translation())
            const quaternion = quat(rigidBody.current.rotation())

            rigidBody.current.setTranslation(position, true)
            rigidBody.current.setRotation(quaternion, true)
        }
    }, [])

    return (
        <RigidBody ref={rigidBody}>
            <mesh>
                <boxBufferGeometry />
                <meshStandardMaterial />
            </mesh>
        </RigidBody>
    )
}

export default Scene