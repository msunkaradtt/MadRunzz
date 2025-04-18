import React from "react";

import { LobbyCanvas, LobbyManager } from "../components";

/**
 * 2‑column layout on ≥ 768 px (md); single‑column stack on small screens.
 * `h-dvh` = full viewport height.  Each child gets 100 % height.
 */
const Lobby = () => {
  return (
    <div className="h-dvh flex flex-col md:flex-row">
      <div className="h-1/2 md:h-full md:basis-2/3">
        <LobbyCanvas />
      </div>
      <div className="h-1/2 md:h-full md:basis-1/3 overflow-hidden bg-lobbyblue">
        <LobbyManager />
      </div>
    </div>
  );
};

export default Lobby;
