import React from 'react'
import { useStore } from  '../../store'

import { ZeroPad } from '../../utils/utils'

const Playing = () => {
    const phase = useStore((state) => state.phase)
    const pause = useStore((state) => state.pause)
    const resume = useStore((state) => state.resume)
    const score = useStore((state) => state.score)
    const coins = useStore((state) => state.coins)

    const handlerPause = () => {
        pause()
    }

    const handleResume = () => {
        resume()
    }

    return (
        <div className="interface">
            <div>
            {phase == "playing" ? (
                <img
                onClick={handlerPause}
                className="pause"
                src="https://amihungry.com/wp-content/uploads/2020/04/pause-button-square-300x300.png"
                />
            ) : null}
            </div>
            <div className="score">{ZeroPad(score, 4)}</div>
            <div className="coins">{ZeroPad(coins, 2)}</div>
            {phase == "pause" ? (
                <div className="resume" onClick={handleResume}>
                    RESUME
                </div>
            ) : null}
        </div>
    )
}

export default Playing