import React from 'react'
import { useStore } from  '../../store'

import Playing from './Playing'
import Ready from './Ready'
import Finished from './Finished'

const Interface = () => {
    const phase = useStore((state) => state.phase)

    if (phase === "ready") {
        return <Ready />
    } else if (phase === "ended") {
        return <Finished />
    } else {
        return <Playing />
    }
}

export default Interface