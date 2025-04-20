import { create } from 'zustand'

const useStore = create((set) => ({
    players: [],
    start: false,
    addPlayer: (player) => set((state) => {
        const exists = state.players.some(p => p.id === player.id);
        return exists ? {} : { players: [...state.players, player] };
    }),
    setStart: () => set({ start: true }),
    updateDistance: (id, dist) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, distance: dist } : p)
    })),
    updatePosition: (id, pos) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, position: pos } : p)
    })),
    collectCoin: (id, score) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, coins: p.coins + score } : p)
    })),
    markDead: (id) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, alive: false } : p)
    })),
}))

export default useStore