import React, { useState, useEffect } from 'react';
import { DollarSign, AlertTriangle, HelpCircle, Check, Info } from 'lucide-react';

export default function BudgetMatrix() {
  const [budget, setBudget] = useState(100000);
  const [venueType, setVenueType] = useState('blank-slate'); // 'blank-slate' or 'all-inclusive'
  const [allocation, setAllocation] = useState({});

  useEffect(() => {
    // Allocation logic based on budget and venue type
    let venueCateringPct = 0.40;
    let photoVideoPct = 0.15;
    let designFloralsPct = 0.15;
    let entertainmentPct = 0.10;
    let plannerPct = 0.10;
    let attireBeautyPct = 0.10;
    
    let utilityCost = 0;
    let adjustedBudget = budget;

    if (venueType === 'blank-slate') {
      utilityCost = 8000;
      adjustedBudget = Math.max(0, budget - utilityCost);
      // Recalibrate percentages slightly to fit the utility cost
      venueCateringPct = 0.38;
      designFloralsPct = 0.13;
      photoVideoPct = 0.14;
    }

    setAllocation({
      venueCatering: Math.round(adjustedBudget * venueCateringPct),
      photoVideo: Math.round(adjustedBudget * photoVideoPct),
      designFlorals: Math.round(adjustedBudget * designFloralsPct),
      entertainment: Math.round(adjustedBudget * entertainmentPct),
      planner: Math.round(adjustedBudget * plannerPct),
      attireBeauty: Math.round(adjustedBudget * attireBeautyPct),
      utilities: utilityCost
    });

  }, [budget, venueType]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="budget-section container animate-fade-in">
      <div className="section-header">
        <span className="badge">Budget Optimizer</span>
        <h2>Dynamic Budget Matrix</h2>
        <p>
          Enter your total budget, and our software will instantly allocate funds based on real-time vendor rates. Choose a venue type to see how local requirements impact your true purchasing power.
        </p>
      </div>

      <div className="budget-grid">
        {/* Left Side: Controls */}
        <div className="budget-controls glass-card">
          <h3>Budget Variables</h3>
          
          <div className="form-group">
            <div className="budget-label-row">
              <label className="form-label">Total Target Budget</label>
              <span className="budget-display-amount">{formatCurrency(budget)}</span>
            </div>
            <input 
              type="range" 
              className="budget-slider"
              min={30000}
              max={400000}
              step={5000}
              value={budget}
              onChange={e => setBudget(parseInt(e.target.value))}
            />
            <div className="slider-limits">
              <span>$30k</span>
              <span>$150k</span>
              <span>$300k</span>
              <span>$400k+</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Venue Category</label>
            <div className="venue-selector-grid">
              <button 
                className={`venue-type-btn ${venueType === 'blank-slate' ? 'active' : ''}`}
                onClick={() => setVenueType('blank-slate')}
              >
                <div className="btn-title">Blank-Slate Ranch</div>
                <div className="btn-desc">Private land, glamping, historic barns</div>
              </button>
              <button 
                className={`venue-type-btn ${venueType === 'all-inclusive' ? 'active' : ''}`}
                onClick={() => setVenueType('all-inclusive')}
              >
                <div className="btn-title">All-Inclusive Estate</div>
                <div className="btn-desc">Luxury hotels, estates with infrastructure</div>
              </button>
            </div>
          </div>

          {venueType === 'blank-slate' && (
            <div className="warning-alert glass-card">
              <div className="warning-header">
                <AlertTriangle size={20} className="warning-icon" />
                <h4>Blank-Slate Infrastructure Warning</h4>
              </div>
              <p>
                <strong>Warning:</strong> This venue has no structural utilities. You are required to truck in portable restrooms, power generators, and water catering, which will eat <strong>$8,000</strong> of your target budget.
              </p>
              <div className="warning-breakdown">
                <div className="breakdown-item">
                  <span>Luxury Restroom Trailers</span>
                  <strong>$3,500</strong>
                </div>
                <div className="breakdown-item">
                  <span>Silent Power Generators</span>
                  <strong>$2,500</strong>
                </div>
                <div className="breakdown-item">
                  <span>Water Ingestion & Catering Setup</span>
                  <strong>$2,000</strong>
                </div>
              </div>
            </div>
          )}

          {venueType === 'all-inclusive' && (
            <div className="success-alert glass-card">
              <div className="success-header">
                <Check size={18} className="success-icon" />
                <h4>Utility Infrastructure Included</h4>
              </div>
              <p>
                This venue includes built-in restrooms, full catering kitchens, and standard power connections. 100% of your venue budget goes directly to rental space.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Matrix Outputs */}
        <div className="budget-matrix glass-card">
          <div className="matrix-header">
            <h3>Auto-Allocation Matrix</h3>
            <span className="allocation-subtitle">Real-time local vendor estimates</span>
          </div>

          <div className="allocation-list">
            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color venue-catering-color"></span>
                <span className="category-name">Venue & Catering</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar venue-catering-bar" 
                    style={{ width: `${(allocation.venueCatering / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.venueCatering)}</span>
              </div>
            </div>

            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color photo-video-color"></span>
                <span className="category-name">Photography & Video</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar photo-video-bar" 
                    style={{ width: `${(allocation.photoVideo / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.photoVideo)}</span>
              </div>
            </div>

            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color florals-color"></span>
                <span className="category-name">Florals & Design</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar florals-bar" 
                    style={{ width: `${(allocation.designFlorals / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.designFlorals)}</span>
              </div>
            </div>

            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color music-color"></span>
                <span className="category-name">Entertainment & Music</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar music-bar" 
                    style={{ width: `${(allocation.entertainment / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.entertainment)}</span>
              </div>
            </div>

            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color planner-color"></span>
                <span className="category-name">Wedding Planner Fee</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar planner-bar" 
                    style={{ width: `${(allocation.planner / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.planner)}</span>
              </div>
            </div>

            <div className="allocation-row">
              <div className="category-meta">
                <span className="category-color attire-color"></span>
                <span className="category-name">Attire, Paper & Beauty</span>
              </div>
              <div className="category-value-group">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar attire-bar" 
                    style={{ width: `${(allocation.attireBeauty / budget) * 100}%` }}
                  ></div>
                </div>
                <span className="category-cost">{formatCurrency(allocation.attireBeauty)}</span>
              </div>
            </div>

            {venueType === 'blank-slate' && (
              <div className="allocation-row utility-row">
                <div className="category-meta">
                  <span className="category-color utility-color"></span>
                  <span className="category-name font-bold">Utility Truck-In (Restrooms/Power)</span>
                </div>
                <div className="category-value-group">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar utility-bar animate-pulse" 
                      style={{ width: `${(allocation.utilities / budget) * 100}%` }}
                    ></div>
                  </div>
                  <span className="category-cost font-bold text-warn">{formatCurrency(allocation.utilities)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="budget-matrix-footer">
            <Info size={14} />
            <span>Our algorithm recalibrates categories dynamically. Notice how selecting a blank-slate venue automatically compresses allocations in other creative categories to safeguard structural requirements.</span>
          </div>
        </div>
      </div>

      <style>{`
        .budget-section {
          padding: 6rem 0;
          border-top: 1px solid var(--border-light);
        }

        .budget-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        .budget-controls, .budget-matrix {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .budget-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .budget-display-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--accent-gold);
        }

        .budget-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: var(--border-light);
          outline: none;
        }

        .budget-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-gold);
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .budget-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .venue-selector-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .venue-type-btn {
          border: 1px solid var(--border-light);
          background: rgba(18, 31, 26, 0.02);
          padding: 1rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          text-align: left;
          font-family: var(--font-sans);
          transition: all var(--transition-fast);
        }

        [data-theme="dark"] .venue-type-btn {
          background: rgba(250, 248, 245, 0.01);
        }

        .venue-type-btn.active {
          border-color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.08);
        }

        .btn-title {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .btn-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }

        .warning-alert {
          border: 1px solid rgba(224, 108, 117, 0.25);
          background: rgba(224, 108, 117, 0.03);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem;
        }

        .warning-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #E06C75;
        }

        .warning-header h4 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .warning-alert p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .warning-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-top: 1px solid rgba(224, 108, 117, 0.15);
          padding-top: 0.75rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .breakdown-item strong {
          color: var(--text-primary);
        }

        .success-alert {
          border: 1px solid rgba(143, 168, 155, 0.25);
          background: rgba(143, 168, 155, 0.03);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
        }

        .success-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-sage);
        }

        .success-header h4 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
        }

        .success-alert p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .matrix-header {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .allocation-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .allocation-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .allocation-row {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .category-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .category-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .category-value-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .progress-bar-container {
          flex-grow: 1;
          height: 6px;
          background: var(--border-light);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-smooth);
        }

        .category-cost {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          min-width: 80px;
          text-align: right;
        }

        /* Color classes */
        .venue-catering-color { background-color: var(--accent-green); }
        .venue-catering-bar { background-color: var(--accent-green); }
        [data-theme="dark"] .venue-catering-color { background-color: var(--accent-gold); }
        [data-theme="dark"] .venue-catering-bar { background-color: var(--accent-gold); }

        .photo-video-color { background-color: #A9B7B1; }
        .photo-video-bar { background-color: #A9B7B1; }
        
        .florals-color { background-color: var(--accent-sage); }
        .florals-bar { background-color: var(--accent-sage); }

        .music-color { background-color: #5C7A6E; }
        .music-bar { background-color: #5C7A6E; }

        .planner-color { background-color: #C5A880; }
        .planner-bar { background-color: #C5A880; }

        .attire-color { background-color: #D3CDC5; }
        .attire-bar { background-color: #D3CDC5; }

        .utility-color { background-color: #E06C75; }
        .utility-bar { background-color: #E06C75; }

        .utility-row {
          background: rgba(224, 108, 117, 0.05);
          padding: 0.5rem 0.8rem;
          border-radius: var(--border-radius-sm);
          border: 1px dashed rgba(224, 108, 117, 0.25);
        }

        .font-bold { font-weight: 600; }
        .text-warn { color: #E06C75; }

        .budget-matrix-footer {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          border-top: 1px solid var(--border-light);
          padding-top: 1.2rem;
          margin-top: 0.5rem;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        @media (max-width: 1024px) {
          .budget-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .venue-selector-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
