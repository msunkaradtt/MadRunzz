import React, { useState } from "react";

/* ─ helpers ───────────────────────────────── */
const envs = [
  { name: "Fire", emoji: "🔥" },
  { name: "Water", emoji: "💧" },
  { name: "Earth", emoji: "🌱" },
  { name: "Air", emoji: "💨" },
];

const speeds = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const genCode = (len = 6) =>
  Array.from({ length: len }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
      Math.floor(Math.random() * 36)
    )
  ).join("");

/* ─ component ─────────────────────────────── */
export default function LobbyManager() {
  /* ui mode */
  const [mode, setMode] = useState("create");

  /* create‑room state */
  const [roomName, setRoomName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [speed, setSpeed] = useState(1);
  const [envPick, setEnvPick] = useState([]);
  const [roomCode, setRoomCode] = useState("");

  /* join‑room state */
  const [playerName, setPlayerName] = useState("");
  const [charColor, setCharColor] = useState("#ff0000");
  const [joinCode, setJoinCode] = useState("");

  /* ─ logic ─ */
  const toggleEnv = (env) =>
    setEnvPick((prev) =>
      prev.includes(env)
        ? prev.filter((e) => e !== env)
        : prev.length < 2
        ? [...prev, env]
        : prev
    );

  const create = (e) => {
    e.preventDefault();
    if (envPick.length !== 2) return;
    setRoomCode(genCode());
  };

  const join = (e) => {
    e.preventDefault();
    // integrate real join logic here
    alert(`Joining ${joinCode} as ${playerName}`);
  };

  /* ─ ui ─ */
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {/* ───────── title ───────── */}
      <h2 className="mt-6 mb-4 text-4xl font-extrabold tracking-widest select-none">
        MadRunzz
      </h2>

      {/* ───────── card ───────── */}
      <div className="w-full max-w-lg h-[calc(100%-7rem)] flex flex-col rounded-xl shadow-xl border overflow-hidden">
        {/* toggle */}
        <div className="flex justify-center gap-2 p-4 backdrop-blur-md">
          {["create", "join"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 rounded-full font-semibold transition
                ${
                  mode === m
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200/70 hover:bg-gray-300/70 dark:bg-slate-600/40 dark:hover:bg-slate-500/40 text-gray-800 dark:text-gray-100"
                }`}
            >
              {m === "create" ? "Create Room" : "Join Room"}
            </button>
          ))}
        </div>

        {/* scroll area */}
        <div className="grow overflow-y-auto p-6 space-y-8">
          {mode === "create" ? (
            <form onSubmit={create} className="space-y-6">
              {/* room name */}
              <label className="block">
                <span className="font-semibold">Room Name</span>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </label>

              {/* creator name */}
              <label className="block">
                <span className="font-semibold">Creator Name</span>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  required
                />
              </label>

              {/* pick 2 environments */}
              <div>
                <p className="font-semibold mb-2">
                  Pick <span>exactly two</span>{" "}
                  environments
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {envs.map(({ name, emoji }) => {
                    const checked = envPick.includes(name);
                    const disabled = !checked && envPick.length === 2;
                    return (
                      <label
                        key={name}
                        className={`relative flex items-center justify-center rounded-lg border py-3 cursor-pointer select-none transition
                          ${
                            checked
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white/60 dark:bg-slate-700/50 text-gray-800 dark:text-gray-100"
                          }
                          ${
                            disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-md"
                          }`}
                      >
                        <input
                          type="checkbox"
                          className="absolute opacity-0 pointer-events-none"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleEnv(name)}
                        />
                        <span className="text-xl mr-2">{emoji}</span> {name}
                      </label>
                    );
                  })}
                </div>
                {envPick.length !== 2 && (
                  <p className="text-xs text-red-500 mt-1">
                    Please select exactly two.
                  </p>
                )}
              </div>

              {/* players + speed */}
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-semibold">Max Players</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-semibold">Speed</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {speeds.map((s) => (
                      <option key={s} value={s}>
                        {s}x
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* create button */}
              <button
                type="submit"
                disabled={envPick.length !== 2}
                className={`w-full py-3 rounded-lg font-bold tracking-wide transition
                  ${
                    envPick.length === 2
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Let The MadRunzz Begin
              </button>

              {/* output */}
              {roomCode && (
                <div className="text-center p-4 bg-blue-100/70 rounded-lg border border-blue-300 shadow-inner">
                  <p className="text-sm text-blue-700">Room Code</p>
                  <p className="text-3xl font-extrabold tracking-[0.25em] text-blue-900">
                    {roomCode}
                  </p>
                  <p className="text-xs mt-2 text-gray-600">
                    Share this code with friends!
                  </p>
                </div>
              )}
            </form>
          ) : (
            /* ───────── JOIN ───────── */
            <form onSubmit={join} className="space-y-6">
              <label className="block">
                <span className="font-semibold">Player Name</span>
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="font-semibold">Character Color</span>
                <input
                  type="color"
                  value={charColor}
                  onChange={(e) => setCharColor(e.target.value)}
                  className="mt-1 h-12 w-full rounded-lg border cursor-pointer"
                />
              </label>

              <label className="block">
                <span className="font-semibold">Room Code</span>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  required
                  className="mt-1 w-full uppercase tracking-widest rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold tracking-wide bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
              >
                Join The MadRunzz
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
