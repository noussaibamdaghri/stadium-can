// app/supporter/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { getParkingLots, ParkingLot } from '../../services/parkingService'
import { getTrafficHistory, TrafficData } from '../../services/trafficService'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function SupporterPage() {
  const [parkings, setParkings] = useState<ParkingLot[]>([])
  const [trafficData, setTrafficData] = useState<TrafficData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [parkingData, trafficData] = await Promise.all([
        getParkingLots(),
        getTrafficHistory()
      ])
      setParkings(parkingData)
      setTrafficData(trafficData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Actualisation toutes les 10 secondes
    const interval = setInterval(fetchData, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const getRecommendation = () => {
    if (parkings.length === 0) return null
    
    const bestParking = parkings.reduce((best, current) => {
      const bestPercentage = (best.current_occupancy / best.capacity) * 100
      const currentPercentage = (current.current_occupancy / current.capacity) * 100
      return currentPercentage < bestPercentage ? current : best
    })

    const occupancyPercentage = (bestParking.current_occupancy / bestParking.capacity) * 100
    
    let recommendation = ''
    if (occupancyPercentage < 30) recommendation = '💚 Excellent choix'
    else if (occupancyPercentage < 60) recommendation = '💙 Bon choix'
    else recommendation = '💛 Choix acceptable'

    return {
      parking: bestParking.name,
      freeSpaces: bestParking.capacity - bestParking.current_occupancy,
      percentage: occupancyPercentage,
      message: recommendation
    }
  }

  const recommendation = getRecommendation()

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
            border: 3px solid rgba(59, 130, 246, 0.3);
            border-top: 3px solid #3b82f6;
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
          <p>Chargement des données en temps réel...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .supporter-container {
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
          background: linear-gradient(to right, #10b981, #3b82f6);
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
          color: #10b981;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .nav-link {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
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

        .recommendation-card {
          border-left: 4px solid #10b981;
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

        .recommendation-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .recommendation-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .recommendation-item {
          text-align: center;
          padding: 1rem;
        }

        .recommendation-label {
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .recommendation-value {
          color: white;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .recommendation-value.free {
          color: #10b981;
        }

        .recommendation-message {
          text-align: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: white;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
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

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
        }

        .status-free { background: #10b981; }
        .status-moderate { background: #f59e0b; }
        .status-busy { background: #ef4444; }

        .progress-container {
          margin-bottom: 1rem;
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
        }

        .progress-free { background: #10b981; }
        .progress-moderate { background: #f59e0b; }
        .progress-busy { background: #ef4444; }

        .parking-stats {
          display: flex;
          justify-content: space-between;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .free-spaces {
          color: #10b981;
          font-weight: 500;
        }

        .table-container {
          overflow-x: auto;
          border-radius: 0.75rem;
        }

        .traffic-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .traffic-table th {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 600;
          padding: 1rem;
          text-align: left;
          font-size: 0.875rem;
        }

        .traffic-table td {
          padding: 1rem;
          color: #d1d5db;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .traffic-level {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .level-free { background: rgba(34, 197, 94, 0.2); color: #86efac; }
        .level-moderate { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
        .level-busy { background: rgba(249, 115, 22, 0.2); color: #fdba74; }
        .level-heavy { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }

        .last-update {
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
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

        .no-data {
          text-align: center;
          color: #9ca3af;
          padding: 2rem;
        }
      `}</style>

      <div className="supporter-container">
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
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>🏟️</span>
            </div>
            <div>
              <div className="logo-text">CAN 2025</div>
              <div className="logo-subtext">Guide Supporters</div>
            </div>
          </div>
          <Link href="/" className="nav-link">
            ← Retour à l'accueil
          </Link>
        </nav>

        {/* Main Content */}
        <div className="content-container">
          {/* Header */}
          <div className="header">
            <h1 className="main-title">🏟️ Guide Intelligent Supporters</h1>
            <p className="subtitle">Données mises à jour en temps réel</p>
          </div>

          {/* Recommendation Card */}
          {recommendation && (
            <div className="card recommendation-card">
              <h2 className="card-title">🎯 Recommandation Optimale</h2>
              <div className="recommendation-grid">
                <div className="recommendation-item">
                  <div className="recommendation-label">Parking conseillé</div>
                  <div className="recommendation-value">{recommendation.parking}</div>
                </div>
                <div className="recommendation-item">
                  <div className="recommendation-label">Places disponibles</div>
                  <div className="recommendation-value free">{recommendation.freeSpaces} places</div>
                </div>
                <div className="recommendation-item">
                  <div className="recommendation-label">Niveau d'occupation</div>
                  <div className="recommendation-value">{recommendation.percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="recommendation-message">{recommendation.message}</div>
            </div>
          )}

          {/* Parking Status */}
          <div className="card">
            <h2 className="card-title">🅿️ État des Parkings</h2>
            <div className="parkings-grid">
              {parkings.map((parking) => {
                const percentage = (parking.current_occupancy / parking.capacity) * 100
                let statusClass = 'status-free'
                let progressClass = 'progress-free'
                let statusText = 'Fluide'
                
                if (percentage > 80) {
                  statusClass = 'status-busy'
                  progressClass = 'progress-busy'
                  statusText = 'Saturé'
                } else if (percentage > 60) {
                  statusClass = 'status-moderate'
                  progressClass = 'progress-moderate'
                  statusText = 'Modéré'
                }

                return (
                  <div key={parking.id} className="parking-card">
                    <div className="parking-header">
                      <h3 className="parking-name">{parking.name}</h3>
                      <span className={`status-badge ${statusClass}`}>
                        {statusText}
                      </span>
                    </div>
                    
                    <div className="progress-container">
                      <div className="progress-info">
                        <span>Occupation</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${progressClass}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="parking-stats">
                      <span>Capacité: {parking.capacity}</span>
                      <span className="free-spaces">
                        Libre: {parking.capacity - parking.current_occupancy}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Traffic Information */}
          <div className="card">
            <h2 className="card-title">🚦 Analyse du Trafic</h2>
            <div className="table-container">
              <table className="traffic-table">
                <thead>
                  <tr>
                    <th>Segment</th>
                    <th>Véhicules/h</th>
                    <th>Vitesse moy.</th>
                    <th>Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficData.slice(0, 5).map((traffic) => {
                    let levelClass = 'level-free'
                    let levelText = 'Fluide'
                    
                    if (traffic.vehicles_in >= 100) {
                      levelClass = 'level-heavy'
                      levelText = 'Saturé'
                    } else if (traffic.vehicles_in >= 60) {
                      levelClass = 'level-busy'
                      levelText = 'Dense'
                    } else if (traffic.vehicles_in >= 30) {
                      levelClass = 'level-moderate'
                      levelText = 'Modéré'
                    }

                    return (
                      <tr key={traffic.id}>
                        <td>{traffic.gate}</td>
                        <td>{traffic.vehicles_in}</td>
                        <td>{traffic.avg_speed_kmh} km/h</td>
                        <td>
                          <span className={`traffic-level ${levelClass}`}>
                            {levelText}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {trafficData.length === 0 && (
              <div className="no-data">
                Aucune donnée de trafic disponible
              </div>
            )}
          </div>

          {/* Last Update */}
          <div className="last-update">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </>
  )

}
