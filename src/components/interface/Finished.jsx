import React from 'react'
import { useStore } from  '../../store'

import { ZeroPad } from '../../utils/utils'

const Finished = () => {
    const score = useStore((state) => state.score)
    const coins = useStore((state) => state.coins)
    const start = useStore((state) => state.start)

    const handleStart = () => {
        start()
    }

    return (
        <div className="ended">
            <div className="score-board">
                <div className="score-title">Score</div>
                <div className="score-score">{ZeroPad(score, 4)}</div>
                <div className="score-coins">{ZeroPad(coins, 2)}</div>
                <div className="score-start" onClick={handleStart}></div>
            </div>
        </div>
    )
}

export default Finished