// app/admin/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { getParkingLots, updateParkingOccupancy, ParkingLot } from '../../services/parkingService'
import Link from 'next/link'

export default function AdminPage() {
  const [parkings, setParkings] = useState<ParkingLot[]>([])
  const [simulating, setSimulating] = useState(false)
  const [autoSimulation, setAutoSimulation] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadParkings = async () => {
    try {
      const data = await getParkingLots()
      setParkings(data)
    } catch (error) {
      console.error('Error loading parkings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadParkings()
  }, [])

  const simulateCarEvent = async (lotId: number, delta: number) => {
    setSimulating(true)
    try {
      await updateParkingOccupancy(lotId, delta)
      // Recharger après un court délai
      setTimeout(() => loadParkings(), 500)
    } catch (error) {
      console.error('Error simulating event:', error)
    } finally {
      setSimulating(false)
    }
  }

  // Simulation automatique
  useEffect(() => {
    if (!autoSimulation) return

    const interval = setInterval(async () => {
      if (parkings.length > 0) {
        const randomParking = parkings[Math.floor(Math.random() * parkings.length)]
        const delta = Math.random() > 0.5 ? 1 : -1
        
        if ((delta === 1 && randomParking.current_occupancy < randomParking.capacity) ||
            (delta === -1 && randomParking.current_occupancy > 0)) {
          try {
            await updateParkingOccupancy(randomParking.id, delta)
            await loadParkings()
          } catch (error) {
            console.error('Auto simulation error:', error)
          }
        }
      }
    }, 10000) // Toutes les 10 secondes

    return () => clearInterval(interval)
  }, [autoSimulation, parkings])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <style jsx>{`
          .spinner {
            border: 3px solid rgba(139, 92, 246, 0.3);
            border-top: 3px solid #8b5cf6;
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Chargement des données administrateur...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .nav-container {
          position: relative;
          z-index: 10;
          width: 100%;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(to right, #8b5cf6, #ec4899);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          color: white;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .logo-subtext {
          color: #8b5cf6;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
        }

        .nav-link {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.875rem;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-link.primary {
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }

        .nav-link.primary:hover {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
        }

        .content-container {
          position: relative;
          z-index: 10;
          max-width: 80rem;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .main-title {
          font-size: 3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.25rem;
          }
        }

        .subtitle {
          font-size: 1.25rem;
          color: #d1d5db;
        }

        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }

        .stat-blue { color: #60a5fa; }
        .stat-green { color: #34d399; }
        .stat-yellow { color: #fbbf24; }
        .stat-purple { color: #a78bfa; }

        .stat-label {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .automation-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-primary {
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(to right, #059669, #047857);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .btn-danger {
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: linear-gradient(to right, #dc2626, #b91c1c);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .automation-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .status-indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #ef4444;
        }

        .status-indicator.active {
          background: #10b981;
          animation: pulse 2s infinite;
        }

        .parkings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .parkings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .parkings-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .parking-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .parking-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }

        .parking-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .parking-name {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .parking-occupancy {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .progress-container {
          margin-bottom: 1.5rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          width: 100%;
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.5s ease;
          background: linear-gradient(to right, #10b981, #3b82f6);
        }

        .simulation-controls {
          display: flex;
          gap: 0.5rem;
        }

        .simulation-btn {
          flex: 1;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }

        .simulation-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-enter {
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
        }

        .btn-enter:hover:not(:disabled) {
          background: linear-gradient(to right, #059669, #047857);
          transform: translateY(-2px);
        }

        .btn-exit {
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
        }

        .btn-exit:hover:not(:disabled) {
          background: linear-gradient(to right, #dc2626, #b91c1c);
          transform: translateY(-2px);
        }

        .refresh-btn {
          background: linear-gradient(to right, #3b82f6, #2563eb);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .refresh-btn:hover {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .floating-elements div {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse 2s infinite;
        }

        .element-1 {
          top: 20%;
          left: 5%;
          width: 1rem;
          height: 1rem;
          background: #60a5fa;
          animation-delay: 0s;
        }

        .element-2 {
          top: 60%;
          right: 10%;
          width: 1.5rem;
          height: 1.5rem;
          background: #34d399;
          animation-delay: 0.75s;
        }

        .element-3 {
          bottom: 30%;
          left: 15%;
          width: 0.75rem;
          height: 0.75rem;
          background: #a78bfa;
          animation-delay: 1.5s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="admin-container">
        {/* Background Elements */}
        <div className="background-grid"></div>
        <div className="floating-elements">
          <div className="element-1"></div>
          <div className="element-2"></div>
          <div className="element-3"></div>
        </div>

        {/* Navigation Header */}
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>🔧</span>
            </div>
            <div>
              <div className="logo-text">CAN 2025</div>
              <div className="logo-subtext">Administration</div>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/supporter" className="nav-link primary">
              👨‍💼 Voir Supporters
            </Link>
            <Link href="/" className="nav-link">
              🏠 Accueil
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content-container">
          {/* Header */}
          <div className="header">
            <h1 className="main-title">🔧 Administration CAN</h1>
            <p className="subtitle">Interface de gestion du stade en temps réel</p>
          </div>

          {/* Statistics - MAINTENANT EN PREMIER */}
          <div className="card">
            <h2 className="card-title">📈 Statistiques Globales</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number stat-blue">{parkings.length}</div>
                <div className="stat-label">Parkings gérés</div>
              </div>
              <div className="stat-card">
                <div className="stat-number stat-green">
                  {parkings.reduce((total, p) => total + p.capacity, 0)}
                </div>
                <div className="stat-label">Capacité totale</div>
              </div>
              <div className="stat-card">
                <div className="stat-number stat-yellow">
                  {parkings.reduce((total, p) => total + p.current_occupancy, 0)}
                </div>
                <div className="stat-label">Véhicules actuels</div>
              </div>
              <div className="stat-card">
                <div className="stat-number stat-purple">
                  {parkings.length > 0 ? 
                    ((parkings.reduce((total, p) => total + p.current_occupancy, 0) / 
                      parkings.reduce((total, p) => total + p.capacity, 1)) * 100).toFixed(1) 
                    : '0'}%
                </div>
                <div className="stat-label">Occupation moyenne</div>
              </div>
            </div>
          </div>

          {/* Automation Section */}
          <div className="card">
            <h2 className="card-title">🤖 Automatisation</h2>
            <div className="automation-controls">
              <button
                onClick={() => setAutoSimulation(!autoSimulation)}
                className={`btn ${autoSimulation ? 'btn-danger' : 'btn-primary'}`}
              >
                {autoSimulation ? '⏹️ Arrêter Simulation' : '🚀 Démarrer Simulation Auto'}
              </button>
            </div>
            <div className="automation-status">
              <div className={`status-indicator ${autoSimulation ? 'active' : ''}`}></div>
              <span>Statut: {autoSimulation ? '🟢 ACTIF' : '🔴 INACTIF'}</span>
              <span style={{ marginLeft: 'auto' }}>• Événements simulés toutes les 10 sec</span>
            </div>
          </div>

          {/* Parking Simulation */}
          <div className="card">
            <h2 className="card-title">🎮 Simulation Temps Réel</h2>
            <div className="parkings-grid">
              {parkings.map((parking) => {
                const percentage = (parking.current_occupancy / parking.capacity) * 100
                
                return (
                  <div key={parking.id} className="parking-card">
                    <div className="parking-header">
                      <h3 className="parking-name">{parking.name}</h3>
                      <div className="parking-occupancy">
                        {parking.current_occupancy}/{parking.capacity}
                      </div>
                    </div>
                    
                    <div className="progress-container">
                      <div className="progress-info">
                        <span>Occupation</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="simulation-controls">
                      <button
                        onClick={() => simulateCarEvent(parking.id, 1)}
                        disabled={simulating || parking.current_occupancy >= parking.capacity}
                        className="simulation-btn btn-enter"
                      >
                        ➕ Entrée
                      </button>
                      <button
                        onClick={() => simulateCarEvent(parking.id, -1)}
                        disabled={simulating || parking.current_occupancy <= 0}
                        className="simulation-btn btn-exit"
                      >
                        ➖ Sortie
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={loadParkings}
              className="refresh-btn"
            >
              📊 Actualiser les Données
            </button>
          </div>
        </div>
      </div>
    </>
  )
}