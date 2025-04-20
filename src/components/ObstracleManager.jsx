import React, { useMemo } from 'react'
import { useStore } from  '../store'

import Obstacle from './Obstracle'

const ObstacleManager = () => {
    const players = useStore(s => s.players)
    const lanes = players.map(p => p.position[0])

    const obstacles = useMemo(() => {
        // stagger them down Z, but cycle through each lane
        return Array.from({ length: 100 }).map((_, i) => {
          const laneX = lanes[i % lanes.length]
          return {
            id: i,
            pos: [laneX, 1, -10 - i * 10],
            size: [1, 1, 1],
          }
        })
    }, [lanes])

    return <>{obstacles.map(o => <Obstacle key={`obstacle-${o.id}`} {...o} />)}</>
}

export default ObstacleManager