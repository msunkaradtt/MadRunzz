import React from "react"

const LobbyManager = (props) => {
    return (
        <></>
    )
}


import React, { useState } from "react";

// A helper function to generate a short unique code
function generateUniqueCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function LobbyManager() {
  // Toggle between "create" and "join"
  const [mode, setMode] = useState("create");

  // CREATE ROOM STATES
  const [roomName, setRoomName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [environment, setEnvironment] = useState("Fire");
  const [totalPlayers, setTotalPlayers] = useState(4);
  const [movementSpeed, setMovementSpeed] = useState("1");
  const [roomCode, setRoomCode] = useState("");

  // JOIN ROOM STATES
  const [playerName, setPlayerName] = useState("");
  const [characterColor, setCharacterColor] = useState("#ff0000");
  const [joinCode, setJoinCode] = useState("");

  // Possible speeds with increments of 0.5 from 1 to 5
  const speedOptions = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
  ];

  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Generate a unique code for the room
    const code = generateUniqueCode();
    setRoomCode(code);
    // In a real app, you'd also send this to the server, store it in DB, etc.
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    // In a real app, you'd validate the joinCode on the server
    alert(`Joining room with code: ${joinCode}\nPlayer: ${playerName}\nColor: ${characterColor}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Lobby Manager</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setMode("create")}
            className={`px-4 py-2 rounded 
              ${mode === "create" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Create Room
          </button>
          <button
            onClick={() => setMode("join")}
            className={`px-4 py-2 rounded 
              ${mode === "join" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Join Room
          </button>
        </div>

        {mode === "create" && (
          <form onSubmit={handleCreateRoom} className="space-y-4">
            {/* Room Name */}
            <div>
              <label className="block font-semibold mb-1">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Room Creator Name */}
            <div>
              <label className="block font-semibold mb-1">Creator Name</label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Environment Selection */}
            <div>
              <label className="block font-semibold mb-1">Environment</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Earth">Earth</option>
                <option value="Air">Air</option>
              </select>
            </div>

            {/* Total Players */}
            <div>
              <label className="block font-semibold mb-1">Total Players (Max 12)</label>
              <input
                type="number"
                min="1"
                max="12"
                value={totalPlayers}
                onChange={(e) => setTotalPlayers(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Movement Speed */}
            <div>
              <label className="block font-semibold mb-1">Movement Speed (1 to 5)</label>
              <select
                value={movementSpeed}
                onChange={(e) => setMovementSpeed(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {speedOptions.map((speed) => (
                  <option key={speed} value={speed}>{speed}x</option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                "1" is normal speed, "5" is 5x normal speed.
              </p>
            </div>

            {/* Create Room Button */}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Room
            </button>

            {/* Unique Code Display */}
            {roomCode && (
              <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded">
                <p className="font-semibold">Your Room Code:</p>
                <p className="text-lg font-bold">{roomCode}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Share this code with your friends so they can join your room.
                </p>
              </div>
            )}
          </form>
        )}

        {mode === "join" && (
          <form onSubmit={handleJoinRoom} className="space-y-4">
            {/* Player Name */}
            <div>
              <label className="block font-semibold mb-1">Player Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Character Color */}
            <div>
              <label className="block font-semibold mb-1">Character Color</label>
              <input
                type="color"
                value={characterColor}
                onChange={(e) => setCharacterColor(e.target.value)}
                className="w-16 h-10 p-0 border border-gray-300 rounded"
              />
              <p className="text-sm text-gray-600 mt-1">
                Pick a color for your character’s outfit or indicator.
              </p>
            </div>

            {/* Join Code */}
            <div>
              <label className="block font-semibold mb-1">Room Code</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Join Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Join Room
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


export default LobbyManager