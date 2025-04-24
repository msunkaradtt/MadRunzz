import React, { useEffect, useState } from 'react'

import { OrbitControls, Sky } from '@react-three/drei'

import { useFrame } from '@react-three/fiber'

import { Physics } from '@react-three/rapier'

import { useStore } from  '../store'

import Path from './Path'
import Lights from './Lights'
import Player from './Player'

import Ground from './Ground'
import House from './House'
import Ghost from './Ghost'

const MadRunzz = () => {
    const phase = useStore((state) => state.phase)

    const [state, setState] = useState(true)

    useEffect(() => {
        if (phase === "ended") {
            setState(false)
            setInterval(() => {
                setState(true)
            }, 500)
        }
    }, [phase])

    useFrame((state, delta) => {
        if (phase === "playing") {
            if (!state.clock.running) state.clock.start()   
        } else {
            state.clock.stop()
        }
    })

    return (
        <>
        <Physics debug={false}>
            <Sky />
            <Lights />
            <OrbitControls makeDefault />

            {state ? (
                <>
                <House />
                <Path />
                <Player />
                <Ground />
                <Ghost />
                </>
            ) : (
                <></>
            )}
        </Physics>
        </>
    )
}

export default MadRunzz