import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { PROFILE } from '../data'

type Position = { x: number; y: number }
type Building = { id: string; name: string; pos: Position; width: number; height: number; color: string; path: string }

const TILE_SIZE = 40
const MAP_WIDTH = 20
const MAP_HEIGHT = 15

const BUILDINGS: Building[] = [
  { id: 'b1', name: 'Lobby', pos: { x: 9, y: 2 }, width: 3, height: 2, color: '#38bdf8', path: '/' },
  { id: 'b2', name: 'Stats', pos: { x: 2, y: 5 }, width: 3, height: 3, color: '#f59e0b', path: '/stats' },
  { id: 'b3', name: 'About', pos: { x: 15, y: 5 }, width: 3, height: 3, color: '#a855f7', path: '/about' },
  { id: 'b4', name: 'Quests', pos: { x: 4, y: 11 }, width: 4, height: 2, color: '#10b981', path: '/experience' },
  { id: 'b5', name: 'Inventory', pos: { x: 12, y: 11 }, width: 4, height: 2, color: '#ec4899', path: '/projects' },
  { id: 'b6', name: 'Connect', pos: { x: 9, y: 7 }, width: 2, height: 2, color: '#6366f1', path: '/contact' },
]

export default function GameMode({ onClose }: { onClose: () => void }) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 9, y: 13 })
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null)
  const navigate = useNavigate()
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Collision detection
  const checkCollision = (newX: number, newY: number) => {
    // Map bounds
    if (newX < 0 || newX >= MAP_WIDTH || newY < 0 || newY >= MAP_HEIGHT) return true
    
    // Buildings
    for (const b of BUILDINGS) {
      if (newX >= b.pos.x && newX < b.pos.x + b.width && newY >= b.pos.y && newY < b.pos.y + b.height) {
        return true
      }
    }
    return false
  }

  const getNearbyBuilding = (x: number, y: number) => {
    for (const b of BUILDINGS) {
      // Check adjacent tiles (up, down, left, right)
      const isAdjacent = 
        (x >= b.pos.x - 1 && x <= b.pos.x + b.width && y >= b.pos.y - 1 && y <= b.pos.y + b.height)
      if (isAdjacent) return b
    }
    return null
  }

  const movePlayer = (dx: number, dy: number) => {
    setPlayerPos(prev => {
      const newX = prev.x + dx
      const newY = prev.y + dy
      if (!checkCollision(newX, newY)) {
        const nearby = getNearbyBuilding(newX, newY)
        setActiveBuilding(nearby)
        return { x: newX, y: newY }
      }
      return prev
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer(0, -1); break
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer(0, 1); break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer(-1, 0); break
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer(1, 0); break
        case 'Enter':
        case ' ':
          if (activeBuilding) {
            navigate(activeBuilding.path)
            onClose()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeBuilding, navigate, onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
        <button 
          onClick={onClose}
          className="p-3 bg-accent text-accent-foreground border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] hover:translate-y-1 hover:shadow-[0px_0px_0px_var(--foreground)] transition-all font-black uppercase text-sm flex items-center gap-2"
        >
          <X size={16} /> Exit Game Mode
        </button>
      </div>

      <div className="absolute top-6 left-6 z-10 liquid-glass p-4 bg-background">
        <h2 className="text-xl font-black uppercase text-foreground mb-1">Evid's World</h2>
        <p className="text-xs font-bold text-foreground/70 uppercase">Use W A S D or Arrows to move.</p>
        <p className="text-xs font-bold text-foreground/70 uppercase">Press SPACE near a building to enter.</p>
      </div>

      {/* Game Map Container */}
      <div 
        ref={containerRef}
        className="relative bg-primary/20 border-4 border-foreground shadow-[8px_8px_0px_var(--foreground)]"
        style={{ 
          width: MAP_WIDTH * TILE_SIZE, 
          height: MAP_HEIGHT * TILE_SIZE,
          backgroundImage: 'radial-gradient(var(--foreground) 2px, transparent 0)',
          backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
          backgroundPosition: '-2px -2px'
        }}
      >
        {/* Buildings */}
        {BUILDINGS.map(b => (
          <div
            key={b.id}
            className="absolute border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] flex items-center justify-center flex-col transition-all"
            style={{
              left: b.pos.x * TILE_SIZE,
              top: b.pos.y * TILE_SIZE,
              width: b.width * TILE_SIZE - 4,
              height: b.height * TILE_SIZE - 4,
              backgroundColor: b.color,
              filter: activeBuilding?.id === b.id ? 'brightness(1.2)' : 'none',
              transform: activeBuilding?.id === b.id ? 'scale(1.05)' : 'scale(1)',
              zIndex: 10
            }}
          >
            <span className="font-black uppercase text-[10px] sm:text-xs text-foreground bg-background px-1 border-2 border-foreground">{b.name}</span>
            {activeBuilding?.id === b.id && (
              <span className="absolute -top-6 bg-background text-foreground px-2 py-0.5 text-[8px] font-black uppercase border-2 border-foreground whitespace-nowrap animate-bounce">
                Press Space!
              </span>
            )}
          </div>
        ))}

        {/* Player */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center transition-all duration-150 ease-linear"
          style={{
            left: playerPos.x * TILE_SIZE,
            top: playerPos.y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }}
        >
          {/* RPG Pixel Art Hero SVG */}
          <div className="w-10 h-10 -mt-4 relative animate-bounce">
            <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {/* Hair / Hat */}
              <rect x="5" y="1" width="6" height="2" fill="var(--color-primary)" />
              <rect x="4" y="2" width="8" height="2" fill="var(--color-primary)" />
              {/* Face */}
              <rect x="5" y="4" width="6" height="4" fill="#fcd34d" />
              {/* Eyes */}
              <rect x="6" y="5" width="1" height="1" fill="#000" />
              <rect x="9" y="5" width="1" height="1" fill="#000" />
              {/* Body / Armor */}
              <rect x="4" y="8" width="8" height="5" fill="var(--color-accent)" />
              <rect x="7" y="8" width="2" height="5" fill="var(--color-secondary)" />
              {/* Arms */}
              <rect x="3" y="8" width="1" height="4" fill="#fcd34d" />
              <rect x="12" y="8" width="1" height="4" fill="#fcd34d" />
              {/* Legs */}
              <rect x="5" y="13" width="2" height="2" fill="var(--color-primary)" />
              <rect x="9" y="13" width="2" height="2" fill="var(--color-primary)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile D-Pad (Visible only on small screens) */}
      <div className="md:hidden absolute bottom-12 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2">
        <div />
        <button onTouchStart={() => movePlayer(0, -1)} className="p-4 bg-background border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] active:translate-y-1 active:shadow-none"><ArrowUp size={24} /></button>
        <div />
        <button onTouchStart={() => movePlayer(-1, 0)} className="p-4 bg-background border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] active:translate-y-1 active:shadow-none"><ArrowLeft size={24} /></button>
        <button onTouchStart={() => {
            if (activeBuilding) {
              navigate(activeBuilding.path)
              onClose()
            }
          }} 
          className="p-4 bg-accent text-accent-foreground border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] active:translate-y-1 active:shadow-none font-black text-xs uppercase"
        >
          A
        </button>
        <button onTouchStart={() => movePlayer(1, 0)} className="p-4 bg-background border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] active:translate-y-1 active:shadow-none"><ArrowRight size={24} /></button>
        <div />
        <button onTouchStart={() => movePlayer(0, 1)} className="p-4 bg-background border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)] active:translate-y-1 active:shadow-none"><ArrowDown size={24} /></button>
        <div />
      </div>

    </div>
  )
}
