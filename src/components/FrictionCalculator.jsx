import React, { useState, useEffect } from 'react';
import { Plus, X, PlaneTakeoff, Info, Award, ShieldAlert, Sparkles } from 'lucide-react';

const SUGGESTED_HUBS = [
  { city: 'New York', code: 'JFK' },
  { city: 'San Francisco', code: 'SFO' },
  { city: 'Chicago', code: 'ORD' },
  { city: 'London', code: 'LHR' },
  { city: 'Miami', code: 'MIA' },
  { city: 'Los Angeles', code: 'LAX' },
  { city: 'Houston', code: 'IAH' },
];

export default function FrictionCalculator() {
  const [vips, setVips] = useState([
    { id: '1', city: 'San Francisco', code: 'SFO', count: 12 },
    { id: '2', city: 'New York', code: 'JFK', count: 18 },
    { id: '3', city: 'Chicago', code: 'ORD', count: 8 }
  ]);
  
  const [customCity, setCustomCity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [customCount, setCustomCount] = useState(5);
  const [results, setResults] = useState([]);
  const [calculating, setCalculating] = useState(false);

  const addVip = (city, code, count) => {
    if (!city || !code) return;
    const newVip = {
      id: Date.now().toString(),
      city,
      code: code.toUpperCase(),
      count: parseInt(count) || 1
    };
    setVips([...vips, newVip]);
    setCustomCity('');
    setCustomCode('');
  };

  const removeVip = (id) => {
    setVips(vips.filter(vip => vip.id !== id));
  };

  const calculateFriction = () => {
    setCalculating(true);
    setTimeout(() => {
      // Realistic simulation logic based on VIP locations
      const hasInternational = vips.some(v => v.code === 'LHR' || v.city.toLowerCase().includes('london') || v.city.toLowerCase().includes('paris') || v.city.toLowerCase().includes('tokyo'));
      const totalGuests = vips.reduce((acc, v) => acc + v.count, 0);
      const isWestCoastDominant = vips.reduce((acc, v) => acc + (['SFO', 'LAX', 'SEA', 'PDX'].includes(v.code) ? v.count : 0), 0) > (totalGuests / 2);
      const isEastCoastDominant = vips.reduce((acc, v) => acc + (['JFK', 'MIA', 'BOS', 'PHL'].includes(v.code) ? v.count : 0), 0) > (totalGuests / 2);

      // 1. Bozeman, Montana (BZN)
      let mtFriction = 42;
      let mtDirects = 70;
      let mtAirfare = 450;
      if (hasInternational) { mtFriction += 18; mtDirects -= 30; mtAirfare += 300; }
      if (isWestCoastDominant) { mtFriction -= 8; mtDirects += 10; mtAirfare -= 80; }
      if (isEastCoastDominant) { mtFriction += 5; mtAirfare += 50; }

      // 2. Charlottesville, Virginia (CHO)
      let vaFriction = 32;
      let vaDirects = 85;
      let vaAirfare = 320;
      if (hasInternational) { vaFriction += 12; vaDirects -= 20; vaAirfare += 250; }
      if (isEastCoastDominant) { vaFriction -= 10; vaDirects += 10; vaAirfare -= 60; }
      if (isWestCoastDominant) { vaFriction += 12; vaAirfare += 90; }

      // 3. Moab, Utah (CNY)
      let utFriction = 58;
      let utDirects = 40;
      let utAirfare = 540;
      if (hasInternational) { utFriction += 22; utDirects -= 25; utAirfare += 350; }
      if (isWestCoastDominant) { utFriction -= 6; utDirects += 15; utAirfare -= 90; }
      if (isEastCoastDominant) { utFriction += 8; utAirfare += 60; }

      // Bound values
      const destinations = [
        {
          name: 'Charlottesville, Virginia (CHO)',
          type: 'Historic Estates & Vineyards',
          score: Math.min(98, Math.max(12, vaFriction)),
          directs: Math.min(100, Math.max(10, vaDirects)),
          airfare: vaAirfare,
          transit: '35 min average ground transit',
          status: 'Optimal',
          description: 'Best overall choice. Short airport-to-venue transit and high availability of regional connection flights make it easy for guests.'
        },
        {
          name: 'Bozeman, Montana (BZN)',
          type: 'Mountain Ranches & Lodges',
          score: Math.min(98, Math.max(12, mtFriction)),
          directs: Math.min(100, Math.max(10, mtDirects)),
          airfare: mtAirfare,
          transit: '65 min mountain transit',
          status: 'Moderate Friction',
          description: 'Great for West Coast guests, but East Coast and International arrivals face a connection flight and longer ground transit.'
        },
        {
          name: 'Moab, Utah (CNY)',
          type: 'Red Rock Glamping & Canyons',
          score: Math.min(98, Math.max(12, utFriction)),
          directs: Math.min(100, Math.max(10, utDirects)),
          airfare: utAirfare,
          transit: '90 min off-road desert transit',
          status: 'High Friction',
          description: 'High logistics. Most guests will require connections through Salt Lake City or Denver, followed by a long off-road shuttle.'
        }
      ].sort((a, b) => a.score - b.score); // Lower score is better friction!

      setResults(destinations);
      setCalculating(false);
    }, 1200);
  };

  // Run calculation on mount and when VIPs change
  useEffect(() => {
    calculateFriction();
  }, [vips.length]);

  return (
    <section id="demo-calc" className="calculator-section container animate-fade-in">
      <div className="section-header">
        <span className="badge">Travel Intelligence</span>
        <h2>VIP Travel Friction Optimizer</h2>
        <p>
          Don't guess where your guests should fly. Our algorithm calculates the <strong>Travel Friction Score</strong> based on real-time flight availability, direct routes, average airfare, and airport-to-venue ground transit.
        </p>
      </div>

      <div className="calculator-grid">
        {/* Left Side: Input Panel */}
        <div className="calc-panel glass-card">
          <h3>1. Guest Distribution</h3>
          <p className="panel-subtitle">Add the primary cities/airports where your VIP guests reside.</p>
          
          <div className="vip-list">
            {vips.map(vip => (
              <div key={vip.id} className="vip-item">
                <div className="vip-info">
                  <span className="vip-code">{vip.code}</span>
                  <span className="vip-city">{vip.city}</span>
                  <span className="vip-count">({vip.count} Guests)</span>
                </div>
                <button className="remove-btn" onClick={() => removeVip(vip.id)} aria-label="Remove VIP">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="add-vip-form">
            <h4>Add Departure City</h4>
            <div className="input-row">
              <div className="form-group flex-2">
                <label className="form-label">City Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Miami"
                  value={customCity}
                  onChange={e => setCustomCity(e.target.value)}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Code</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="MIA" 
                  maxLength={3}
                  value={customCode}
                  onChange={e => setCustomCode(e.target.value)}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Guests</label>
                <input 
                  type="number" 
                  className="form-input" 
                  min={1}
                  value={customCount}
                  onChange={e => setCustomCount(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            
            <button 
              className="btn btn-secondary add-btn"
              onClick={() => addVip(customCity, customCode, customCount)}
              disabled={!customCity || !customCode}
            >
              <Plus size={16} /> Add Location
            </button>
          </div>

          <div className="quick-hubs">
            <span className="quick-hubs-label">Quick Add Hubs:</span>
            <div className="hubs-row">
              {SUGGESTED_HUBS.map(hub => {
                const alreadyExists = vips.some(v => v.code === hub.code);
                return (
                  <button 
                    key={hub.code}
                    className="hub-pill"
                    onClick={() => addVip(hub.city, hub.code, 10)}
                    disabled={alreadyExists}
                  >
                    +{hub.code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Results Panel */}
        <div className="results-panel glass-card">
          <div className="results-header">
            <h3>2. Optimized Destinations</h3>
            <button className="btn btn-primary recalculate-btn" onClick={calculateFriction} disabled={calculating}>
              {calculating ? 'Optimizing...' : 'Re-calculate'}
            </button>
          </div>

          {calculating ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Analyzing direct flights, airfare matrix, and airport transit delays...</p>
            </div>
          ) : (
            <div className="results-list">
              {results.map((dest, index) => {
                const isOptimal = index === 0;
                return (
                  <div key={dest.name} className={`dest-card ${isOptimal ? 'optimal-card' : ''}`}>
                    {isOptimal && (
                      <div className="optimal-badge">
                        <Sparkles size={12} />
                        Highest Efficiency Choice
                      </div>
                    )}
                    
                    <div className="dest-meta">
                      <div>
                        <h4>{dest.name}</h4>
                        <span className="dest-type">{dest.type}</span>
                      </div>
                      <div className="score-container">
                        <span className="score-value">{dest.score}</span>
                        <span className="score-label">Friction Score</span>
                      </div>
                    </div>

                    <p className="dest-description">{dest.description}</p>

                    <div className="dest-stats-row">
                      <div className="dest-stat-box">
                        <span className="stat-label">Direct Routes</span>
                        <span className="stat-num">{dest.directs}%</span>
                      </div>
                      <div className="dest-stat-box">
                        <span className="stat-label">Avg Flight Cost</span>
                        <span className="stat-num">${dest.airfare}</span>
                      </div>
                      <div className="dest-stat-box">
                        <span className="stat-label">Venue Ground Transit</span>
                        <span className="stat-num">{dest.transit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="friction-legend">
            <Info size={14} />
            <span>Friction Score measures guest travel complexity (10-100). Lower scores indicate shorter transit, lower flight costs, and more direct flights.</span>
          </div>
        </div>
      </div>

      <style>{`
        .calculator-section {
          padding: 6rem 0;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        .calc-panel, .results-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panel-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: -1rem;
        }

        .vip-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .vip-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(18, 31, 26, 0.03);
          border: 1px solid var(--border-light);
          padding: 0.8rem 1.2rem;
          border-radius: var(--border-radius-sm);
        }

        [data-theme="dark"] .vip-item {
          background: rgba(250, 248, 245, 0.02);
        }

        .vip-info {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.95rem;
        }

        .vip-code {
          font-weight: 700;
          color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .vip-city {
          font-weight: 500;
          color: var(--text-primary);
        }

        .vip-count {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .remove-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .remove-btn:hover {
          color: #E06C75;
          background-color: rgba(224, 108, 117, 0.1);
        }

        .add-vip-form {
          border-top: 1px solid var(--border-light);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .add-vip-form h4 {
          font-size: 1rem;
          font-family: var(--font-sans);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-row {
          display: flex;
          gap: 1rem;
        }

        .flex-2 { flex: 2; }
        .flex-1 { flex: 1; }

        .add-btn {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.85rem;
        }

        .quick-hubs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-hubs-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hubs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hub-pill {
          background: none;
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.3rem 0.6rem;
          border-radius: 50px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .hub-pill:hover:not(:disabled) {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }

        .hub-pill:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recalculate-btn {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          gap: 1.5rem;
          min-height: 350px;
          text-align: center;
          color: var(--text-secondary);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-light);
          border-top: 3px solid var(--accent-gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dest-card {
          border: 1px solid var(--border-light);
          background: rgba(18, 31, 26, 0.02);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          transition: all var(--transition-smooth);
        }

        [data-theme="dark"] .dest-card {
          background: rgba(250, 248, 245, 0.01);
        }

        .optimal-card {
          border-color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.03);
          box-shadow: 0 4px 20px rgba(197, 168, 128, 0.05);
        }

        .optimal-badge {
          position: absolute;
          top: -0.75rem;
          left: 1.5rem;
          background: var(--accent-gold);
          color: #070D0B;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .dest-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dest-meta h4 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dest-type {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .score-container {
          text-align: right;
          display: flex;
          flex-direction: column;
        }

        .score-value {
          font-size: 1.8rem;
          font-family: var(--font-serif);
          font-weight: 600;
          color: var(--accent-gold);
          line-height: 1;
        }

        .score-label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dest-description {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .dest-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          border-top: 1px solid var(--border-light);
          padding-top: 1rem;
          margin-top: 0.5rem;
        }

        .dest-stat-box {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .stat-num {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .friction-legend {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(18, 31, 26, 0.02);
          border: 1px dashed var(--border-light);
          padding: 0.8rem 1rem;
          border-radius: var(--border-radius-sm);
        }

        [data-theme="dark"] .friction-legend {
          background: rgba(250, 248, 245, 0.01);
        }

        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .input-row {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .dest-stats-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
