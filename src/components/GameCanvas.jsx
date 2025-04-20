import React, { useEffect } from 'react'
import { useStore } from  '../store'

import CameraController from './CameraController'
import StartLine from './StartLine'
import Ground from './Ground'
import ObstracleManager from './ObstracleManager'
import CoinManager from './CoinManager'
import Player from './Player'

const GameCanvas = () => {
    const GROUND_HALF = 0.1
    const PLAYER_HALF = 1.0
    const initialY = PLAYER_HALF + GROUND_HALF + 1.5

    /*
    [0, initialY, 0], [1.5, initialY, 0],
        [-1, initialY, -1.5], [0.5, initialY, -1.5], [2, initialY, -1.5],
        [-0.5, initialY, -3], [1, initialY, -3], [2.5, initialY, -3],
        [0.5, initialY, -4.5]
    */

    const pinPositions = [
        [-1.5, initialY, 0],
    ]

    const addPlayer = useStore(state => state.addPlayer)
    const players = useStore(state => state.players)

    useEffect(() => {
        if (players.length === 0) {
            pinPositions.forEach((pos, i) => {
                addPlayer({ id: i + 1, position: pos, alive: true, distance: 0, coins: 0 })
            })
        }
    }, [players.length, addPlayer])

    return(
        <>
        <CameraController />
        <StartLine />
        <Ground />
        <ObstracleManager />
        <CoinManager />
        {players.map(p => p.alive && (
            <Player key={`player-${p.id}`} id={p.id} startPos={p.position} />
        ))}
        </>
    )
}

export default GameCanvas