import React from 'react'
import { useStore } from  '../../store'

const Ready = () => {
    const start = useStore((state) => state.start)
    const handleStart = () => {
        start()
    }

    return (
        <div className="ready" onClick={handleStart}>
            <div className="text">Tap To Start</div>
        </div>   
    )
}

export default Ready