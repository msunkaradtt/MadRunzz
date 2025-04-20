import React, { useMemo } from 'react'
import { useStore } from  '../store'

import Coin from './Coin'

const CoinManager = () => {
    const players = useStore(s => s.players)
    const lanes = players.map(p => p.position[0])
    
    const coins = useMemo(() => {
        return Array.from({ length: 100 }).map((_, i) => {
            const laneX = lanes[i % lanes.length]
            return {
                id: i,
                pos: [laneX, 2, -5 - i * 8],
                score: 1,
            }
        })
    }, [lanes])

    return <>{coins.map(c => <Coin key={`coin-${c.id}`} {...c} />)}</>
}

export default CoinManager