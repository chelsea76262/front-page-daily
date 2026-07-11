import React, { useState } from 'react';
import { Layers, Globe, Palette, Check, Users, Plane, CreditCard, Sparkles, Sliders } from 'lucide-react';

const CLIENTS = [
  { id: 1, name: 'The Henderson Wedding', destination: 'Bozeman, MT', guests: 85, bookings: '62/85', friction: 42, status: 'Active' },
  { id: 2, name: 'The Reynolds Gala', destination: 'Charlottesville, VA', guests: 120, bookings: '110/120', friction: 32, status: 'Active' },
  { id: 3, name: 'The Patel Nuptials', destination: 'Moab, UT', guests: 54, bookings: '18/54', friction: 68, status: 'Setup' },
];

export default function PlannerPortal() {
  const [domain, setDomain] = useState('travel.vanguardweddings.com');
  const [accentColor, setAccentColor] = useState('#C5A880');
  const [savedSettings, setSavedSettings] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const savePortalSettings = (e) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  return (
    <section className="planner-portal container animate-fade-in">
      <div className="section-header">
        <span className="badge">Planner SaaS</span>
        <h2>VIP Travel Optimizer Portal</h2>
        <p>
          White-label our travel-intelligence engine. Charge clients a premium under your own brand, let them self-manage departures, and keep client flight bookings organized in one centralized dashboard.
        </p>
      </div>

      <div className="portal-layout">
        {/* Left Side: SaaS Controls & Styling Customizer */}
        <div className="portal-left glass-card">
          <div className="panel-title-row">
            <Globe size={18} className="gold-icon" />
            <h3>White-Label Customizer</h3>
          </div>
          <p className="panel-subtitle">Configure your client-facing travel optimizer sub-domain and branding details.</p>

          <form onSubmit={savePortalSettings} className="portal-settings-form">
            <div className="form-group">
              <label className="form-label">Your Custom Portal Domain</label>
              <input 
                type="text" 
                className="form-input font-mono" 
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="e.g. travel.myplanningfirm.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Client Portal Accent Color</label>
              <div className="color-picker-row">
                <input 
                  type="color" 
                  className="color-picker-input" 
                  value={accentColor}
                  onChange={e => setAccentColor(e.target.value)}
                />
                <input 
                  type="text" 
                  className="form-input color-text-input font-mono" 
                  value={accentColor}
                  onChange={e => setAccentColor(e.target.value)}
                  maxLength={7}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">White-Label Upload Logo</label>
              <div className="file-upload-mock">
                <span>Vanguard_Weddings_Logo.svg</span>
                <button type="button" className="btn-text">Replace</button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Client Portal Feature Flags</label>
              <div className="checkbox-list">
                <label className="checkbox-item">
                  <input type="checkbox" defaultChecked />
                  <span>Show Interactive Budget Matrix</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" defaultChecked />
                  <span>Show Airport Ground Transit Times</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" defaultChecked />
                  <span>Enable Direct Hotel Booking Integration</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary save-settings-btn">
              {savedSettings ? (
                <>
                  <Check size={16} /> Saved Successfully
                </>
              ) : (
                'Save Portal Configurations'
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Active Client Portfolios & Statistics */}
        <div className="portal-right glass-card">
          <div className="panel-title-row">
            <Users size={18} className="gold-icon" />
            <h3>Active Client Weddings</h3>
          </div>
          <p className="panel-subtitle">Planners monitor guest flight arrivals, average friction, and bookings in real-time.</p>

          <div className="client-table-container">
            <table className="client-table">
              <thead>
                <tr>
                  <th>Client Event</th>
                  <th>Destination</th>
                  <th>VIPs</th>
                  <th>Friction</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {CLIENTS.map(client => (
                  <tr key={client.id}>
                    <td>
                      <div className="client-event-name">{client.name}</div>
                      <span className="client-status-badge">{client.status}</span>
                    </td>
                    <td>{client.destination}</td>
                    <td>{client.guests}</td>
                    <td>
                      <span className={`friction-cell-badge friction-${client.friction < 40 ? 'low' : client.friction < 50 ? 'med' : 'high'}`}>
                        {client.friction}
                      </span>
                    </td>
                    <td>
                      <div className="bookings-progress-group">
                        <span className="bookings-count">{client.bookings}</span>
                        <div className="small-progress-bg">
                          <div 
                            className="small-progress-bar" 
                            style={{ width: `${(parseInt(client.bookings.split('/')[0]) / client.guests) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pricing-mini-widget">
            <div className="panel-title-row">
              <CreditCard size={16} className="gold-icon" />
              <h4>SaaS Subscription Tier</h4>
            </div>
            
            <div className="plan-toggle-grid">
              <div 
                className={`plan-box ${selectedPlan === 'pro' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="plan-name-row">
                  <strong>PRO TIER</strong>
                  <span className="plan-badge">Active</span>
                </div>
                <div className="plan-price">$149<span>/mo</span></div>
                <div className="plan-desc">Up to 10 active client portals. Custom domains included.</div>
              </div>
              <div 
                className={`plan-box ${selectedPlan === 'agency' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('agency')}
              >
                <div className="plan-name-row">
                  <strong>AGENCY TIER</strong>
                  <span className="plan-badge-unactive">Upgrade</span>
                </div>
                <div className="plan-price">$399<span>/mo</span></div>
                <div className="plan-desc">Unlimited portals, API routes, custom SSO, multi-planner seats.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .planner-portal {
          padding: 6rem 0;
          border-top: 1px solid var(--border-light);
        }

        .portal-layout {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        .portal-left, .portal-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panel-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .gold-icon {
          color: var(--accent-gold);
        }

        .portal-settings-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .color-picker-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .color-picker-input {
          -webkit-appearance: none;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          background: none;
        }

        .color-picker-input::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        .color-picker-input::-webkit-color-swatch {
          border: 1px solid var(--border-light);
          border-radius: var(--border-radius-sm);
        }

        .color-text-input {
          text-transform: uppercase;
        }

        .file-upload-mock {
          border: 1px solid var(--border-light);
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(18, 31, 26, 0.02);
          border: 1px solid var(--border-light);
          padding: 1rem;
          border-radius: var(--border-radius-sm);
        }

        [data-theme="dark"] .checkbox-list {
          background: rgba(250, 248, 245, 0.01);
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .checkbox-item input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent-gold);
          cursor: pointer;
        }

        .save-settings-btn {
          width: 100%;
          padding: 0.8rem;
          margin-top: 0.5rem;
        }

        /* Client Table */
        .client-table-container {
          width: 100%;
          overflow-x: auto;
          border: 1px solid var(--border-light);
          border-radius: var(--border-radius-md);
        }

        .client-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }

        .client-table th, .client-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .client-table th {
          background-color: rgba(18, 31, 26, 0.03);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        [data-theme="dark"] .client-table th {
          background-color: rgba(250, 248, 245, 0.02);
        }

        .client-event-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .client-status-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-sage);
          margin-top: 0.2rem;
        }

        .friction-cell-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .friction-low {
          background: rgba(143, 168, 155, 0.15);
          color: var(--accent-sage);
        }

        .friction-med {
          background: rgba(197, 168, 128, 0.15);
          color: var(--accent-gold);
        }

        .friction-high {
          background: rgba(224, 108, 117, 0.15);
          color: #E06C75;
        }

        .bookings-progress-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          width: 90px;
        }

        .bookings-count {
          font-weight: 600;
          font-size: 0.8rem;
        }

        .small-progress-bg {
          height: 4px;
          background: var(--border-light);
          border-radius: 2px;
          overflow: hidden;
        }

        .small-progress-bar {
          height: 100%;
          background-color: var(--accent-sage);
          border-radius: 2px;
        }

        /* Pricing Widget */
        .pricing-mini-widget {
          border-top: 1px solid var(--border-light);
          padding-top: 1.5rem;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .plan-toggle-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .plan-box {
          border: 1px solid var(--border-light);
          background: rgba(18, 31, 26, 0.02);
          padding: 1.2rem;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: all var(--transition-fast);
        }

        [data-theme="dark"] .plan-box {
          background: rgba(250, 248, 245, 0.01);
        }

        .plan-box.active {
          border-color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.05);
        }

        .plan-name-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .plan-badge {
          background-color: var(--accent-sage);
          color: var(--bg-primary);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.65rem;
          text-transform: uppercase;
        }

        .plan-badge-unactive {
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.65rem;
          text-transform: uppercase;
        }

        .plan-price {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .plan-price span {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .plan-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .portal-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .plan-toggle-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
