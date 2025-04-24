import React, { useRef, useState, useMemo } from 'react'

import { PATH_LENGTH, PATH_SPAWN_OFFSET, PATH_THICKNESS, PATH_WIDTH, SPEED } from '../common/constants'

import { RigidBody, vec3 } from "@react-three/rapier"

import { useStore } from  '../store'

import * as THREE from "three"

import { useFrame } from '@react-three/fiber'

import { ObjectsPosition, ObstacleList } from '../utils/utils'

import { useTexture } from "@react-three/drei"

import { v4 as uuidv4 } from "uuid"

const DynamicPath = React.forwardRef(({ details, phase }, ref) => {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
        "../textures/stone_path/Stone_Path_008_basecolor.jpg",
        "../textures/stone_path/Stone_Path_008_height.png",
        "../textures/stone_path/Stone_Path_008_normal.jpg",
        "../textures/stone_path/Stone_Path_008_roughness.jpg",
        "../textures/stone_path/Stone_Path_008_ambientOcclusion.jpg",
    ])

    colorMap.repeat = new THREE.Vector2(1, 10)
    colorMap.wrapS = THREE.RepeatWrapping
    colorMap.wrapT = THREE.RepeatWrapping

    const cP = ref.current?.translation()
    let position = ref.current && (phase === "playing" || phase === "pause") ? [cP.x, cP.y, cP.z] :  details.position

    if (phase == "ended") {
        position = details.position
    }

    return (
        <group>
            {details.obstacles.map(({ side, Obstacle, posZ, uuid }) => {
                return (
                    <Obstacle 
                    pathName={details.name} 
                    key={uuid} uuid={uuid} 
                    color={details.color} 
                    side={side} 
                    position={[0, 0, ObjectsPosition[uuid]?.z  ||  posZ]} 
                    />
                )
            })}
            <RigidBody 
            type="fixed" 
            position={position} 
            ref={ref} 
            name={details.name} 
            colliders={"trimesh"} 
            userData={{ name: details.name }}>
                <mesh name="path">
                    <boxGeometry args={details.scale} name="pathBox" />
                    <meshStandardMaterial 
                    displacementScale={0} 
                    factor={4} 
                    map={colorMap} 
                    displacementMap={displacementMap} 
                    normalMap={normalMap} 
                    roughnessMap={roughnessMap} 
                    aoMap={aoMap} 
                    />
                </mesh>
            </RigidBody>
        </group>
    )
})

const Path = () => {
    const scale = [PATH_WIDTH, PATH_THICKNESS, PATH_LENGTH]
    const position = [0, -PATH_THICKNESS, -PATH_LENGTH / 2]

    const pathCount = useStore((state) => state.pathCount)
    const isPathAdded = useStore((state) => state.isPathAdded)
    const pathAdded = useStore((state) => state.pathAdded)

    const refPath1 = useRef()
    const refPath2 = useRef()

    const phase = useStore((state) => state.phase)
    const addScore = useStore((state) => state.addScore)

    const obs1 = useMemo(() => [], [])
    const obs2 = useMemo(() => ObstacleList(
        - PATH_LENGTH,
        - PATH_LENGTH * 2,
        "path1",
    ), [])


    const [paths, setPath] = useState([
        {
            scale,
            position,
            ref: refPath1,
            color: "black",
            name: "path0",
            obstacles: obs1,
        },
        {
            scale,
            position: [...position.slice(0, 2), position[2] - PATH_LENGTH],
            ref: refPath2,
            color: "yellow",
            name: "path1",
            obstacles: obs2
        }
    ])

    const getUpdatedPath = (ref, speed) => {
        const refObject = ref.current
        const curPosition = refObject.translation().z

        if (curPosition > (PATH_LENGTH / 2)+PATH_SPAWN_OFFSET  ) {
            const pathNo = refObject.userData.name.split("path")[1]
            const newArr = [...paths]
            const newZ = (-PATH_LENGTH / 2 - PATH_LENGTH) + PATH_SPAWN_OFFSET

            newArr[pathNo].obstacles = ObstacleList(newZ+PATH_LENGTH/2, (newZ - PATH_LENGTH)+PATH_LENGTH/2,'test')
            setPath(newArr)
            return vec3({ x: 0, y: 0, z: newZ })
        }

        return vec3({ x: 0, y: 0, z: curPosition + speed })
    }

    useFrame((state, delta) => {
        const speed = delta * SPEED
        if (phase === "playing") {
            addScore(1, state.clock.getElapsedTime())
            refPath1.current.setTranslation(getUpdatedPath(refPath1, speed), true)
            refPath2.current.setTranslation(getUpdatedPath(refPath2, speed), true)
        }
    })

    return (
        <>
        {paths.map((path, i) => (
            <DynamicPath key={uuidv4()} phase={phase} details={path} ref={path.ref} />
        ))}
        </>
    )
}

export default Path