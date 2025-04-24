import { create } from 'zustand'
import { PATH_DEFAULT_COUNT } from '../common/constants'

const useStore = create((set) => ({
    pathCount: PATH_DEFAULT_COUNT,
    isPathAdded: true,

    phase: "ready",
    ready: () => {
        set((state) => {
            return state.phase === "ended" ? {phase: "ready",} : {}
        })
    },
    start: () => {
        set((state) => {
            state.resetScore()
            return state.phase === "ready" || state.phase === "ended" ? {phase: "playing"} : {}
        })
    },
    restart: () => {
        set((state) => {
            return state.phase === "playing" ? {phase: "ready",} : {}
        })
    },
    end: () => {
        set((state) => {
            return state.phase === "playing" ? {phase: "ended",} : {} 
        })
    },
    pause: () => {
        set((state) => {
            return state.phase === "playing" ? {phase: "pause",} : {}
        })
    },
    resume: () => {
        set((state) => {
            return state.phase === "pause" ? {phase: "playing",} : {}
        })
    },
    
    addPath: () => {
        set((state) => {
            return {
                pathCount: state.pathCount + 1,
                isPathAdded: false,
            }
        })
    },

    pathAdded: () => {
        set((state) => {
            return {
                isPathAdded: true,
            }
        })
    },

    lastTime: 0,
    score: 0,

    addScore: (value, time) => {
        set((state) => {
            return time - state.lastTime > 0.2 || state.lastTime - time > 0.2 ? {score: state.score + value, lastTime: time,} : {}
        })
    },

    resetScore: () => {
        set((state) => {
            return {
                coins: 0,
                score: 0,
            }
        })
    },

    coins: 0,

    addCoins: (value = 1) => {
        set((state) => {
            return {
                coins: state.coins + value,
            }
        })
    },
}))

export default useStore