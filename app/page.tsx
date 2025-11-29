// app/page.tsx
'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <style jsx>{`
        .hero-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
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
        }

        .logo {
          width: 3rem;
          height: 3rem;
          background: linear-gradient(to right, #10b981, #3b82f6);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.3);
        }

        .status-badge {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .hero-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          text-align: center;
          max-width: 64rem;
        }

        .main-icon {
          width: 7rem;
          height: 7rem;
          background: linear-gradient(to right, #10b981, #3b82f6);
          border-radius: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          animation: pulse 2s infinite;
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.3);
          position: relative;
        }

        .floating-dot {
          position: absolute;
          top: -0.75rem;
          right: -0.75rem;
          width: 2rem;
          height: 2rem;
          background: #fbbf24;
          border-radius: 50%;
          animation: bounce 2s infinite;
          box-shadow: 0 10px 25px -5px rgba(251, 191, 36, 0.5);
        }

        .main-heading {
          font-size: 3.75rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.25;
        }

        @media (min-width: 768px) {
          .main-heading {
            font-size: 4.5rem;
          }
        }

        .gradient-text {
          background: linear-gradient(to right, #86efac, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-top: 0.5rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #d1d5db;
          margin-bottom: 3rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.75;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
          max-width: 64rem;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: rgba(16, 185, 129, 0.5);
          transform: scale(1.05);
        }

        .feature-icon {
          width: 3.5rem;
          height: 3.5rem;
          background: rgba(16, 185, 129, 0.2);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .feature-icon.blue {
          background: rgba(59, 130, 246, 0.2);
        }

        .feature-icon.purple {
          background: rgba(139, 92, 246, 0.2);
        }

        .feature-title {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
        }

        .feature-desc {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 4rem;
        }

        @media (min-width: 640px) {
          .buttons-container {
            flex-direction: row;
          }
        }

        .btn {
          position: relative;
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 200px;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.3);
        }

        .btn-supporter {
          background: linear-gradient(to right, #10b981, #059669);
        }

        .btn-supporter:hover {
          background: linear-gradient(to right, #059669, #047857);
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.5);
        }

        .btn-admin {
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }

        .btn-admin:hover {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.5);
        }

        .stats-bar {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .stat-label {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .footer {
          width: 100%;
          padding: 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-text {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .online-status {
          color: #10b981;
          margin-left: 0.25rem;
        }

        .floating-elements div {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse 2s infinite;
        }

        .element-1 {
          top: 25%;
          left: 10%;
          width: 1rem;
          height: 1rem;
          background: #60a5fa;
          animation-delay: 0s;
        }

        .element-2 {
          top: 33%;
          right: 20%;
          width: 1.5rem;
          height: 1.5rem;
          background: #34d399;
          animation-delay: 0.75s;
        }

        .element-3 {
          bottom: 25%;
          left: 20%;
          width: 0.75rem;
          height: 0.75rem;
          background: #a78bfa;
          animation-delay: 1.5s;
        }

        .element-4 {
          bottom: 33%;
          right: 10%;
          width: 1.25rem;
          height: 1.25rem;
          background: #fbbf24;
          animation-delay: 2.25s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="hero-container">
        {/* Background Elements */}
        <div className="background-grid"></div>
        <div className="floating-elements">
          <div className="element-1"></div>
          <div className="element-2"></div>
          <div className="element-3"></div>
          <div className="element-4"></div>
        </div>

        {/* Navigation Header */}
        <nav className="nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo">
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>🏟️</span>
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>CAN 2025</h1>
              <p style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '500' }}>Système Intelligent</p>
            </div>
          </div>
          <div className="status-badge">
            🟢 En ligne
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            {/* Animated Icon */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div className="main-icon">
                  <span style={{ fontSize: '3rem' }}>⚽</span>
                </div>
                <div className="floating-dot"></div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="main-heading">
              Guide
              <span className="gradient-text">Intelligent</span>
            </h1>

            {/* Subtitle */}
            <p className="subtitle">
              Système de gestion du trafic et des parkings en temps réel pour la CAN 2025. 
              Optimisez votre expérience grâce à l'analyse intelligente des données.
            </p>

            {/* Features Grid */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <span style={{ fontSize: '1.5rem' }}>🚗</span>
                </div>
                <h3 className="feature-title">Parkings Temps Réel</h3>
                <p className="feature-desc">Occupation en direct et recommandations</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon blue">
                  <span style={{ fontSize: '1.5rem' }}>🚦</span>
                </div>
                <h3 className="feature-title">Analyse Trafic</h3>
                <p className="feature-desc">Données trafic et prédictions intelligentes</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon purple">
                  <span style={{ fontSize: '1.5rem' }}>⚡</span>
                </div>
                <h3 className="feature-title">Multi-Cloud</h3>
                <p className="feature-desc">Architecture cloud moderne et scalable</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="buttons-container">
              <Link href="/supporter" className="btn btn-supporter">
                <span style={{ fontSize: '1.25rem' }}>👨‍💼</span>
                <span>Espace Supporters</span>
              </Link>

              <Link href="/admin" className="btn btn-admin">
                <span style={{ fontSize: '1.25rem' }}>🔧</span>
                <span>Espace Administrateur</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              <div className="stats-grid">
                <div>
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Parkings</div>
                </div>
                <div>
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Surveillance</div>
                </div>
                <div>
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Précision</div>
                </div>
                <div>
                  <div className="stat-number">⚡</div>
                  <div className="stat-label">Temps Réel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            Système CAN 2025 • Architecture Multi-Cloud • 
            <span className="online-status">🟢 En ligne</span>
          </p>
        </footer>
      </div>
    </>
  )
}
