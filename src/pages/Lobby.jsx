import React from "react"

import { LobbyCanvas, LobbyManager } from "../components"

const Lobby = (props) => {
    return (
        <div className="h-dvh flex flex-row">
            <div className="basis-2/3"><LobbyCanvas /></div>
            <div className="basis-1/3"><LobbyManager /></div>
        </div>
    )
}

export default Lobby