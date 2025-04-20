import React from 'react'
import { useStore } from  '../store'

const StartScreen = () => {
    const setStart = useStore(state => state.setStart)
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black bg-lobbyblue bg-opacity-50">
            <h1 className="text-4xl mb-4">Endless Runner</h1>
            <button 
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700" 
            onClick={setStart}>
                Start Game
            </button>
        </div>   
    )
}

export default StartScreen