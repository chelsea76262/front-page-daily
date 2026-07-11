import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FrictionCalculator from './components/FrictionCalculator';
import BudgetMatrix from './components/BudgetMatrix';
import VenuesList from './components/VenuesList';
import PlannerPortal from './components/PlannerPortal';
import './App.css';
import { Compass, Layers, ShieldCheck, DollarSign, Award, Users, ArrowRight, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('guest'); // 'guest' or 'planner'

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content animate-fade-in">
          {activeTab === 'guest' ? (
            <>
              <span className="badge animate-fade-in delay-1">Travel Intelligence for High-End Weddings</span>
              <h1 className="animate-fade-in delay-2">
                Unlocking remote luxury. <br />
                <em>Zero flight friction.</em>
              </h1>
              <p className="hero-description animate-fade-in delay-3">
                Pivot coordinates group travel logistics, auto-allocates dynamic budgets, and unlocks vetted off-grid venues. 
                We handle the booking contract and liability framework, taking commissions from the venue—<strong>saving you thousands.</strong>
              </p>
              <div className="hero-actions animate-fade-in delay-3">
                <a href="#demo-calc" className="btn btn-primary">Try Travel Optimizer</a>
                <a href="#vetted-network" className="btn btn-secondary">Explore Vetted Venues</a>
              </div>
            </>
          ) : (
            <>
              <span className="badge animate-fade-in delay-1">Luxury Planners Client Portal SaaS</span>
              <h1 className="animate-fade-in delay-2">
                Elevate client logistics. <br />
                <em>Collect recurring subscription fees.</em>
              </h1>
              <p className="hero-description animate-fade-in delay-3">
                Provide your high-end clients with a custom-branded travel intelligence portal. 
                Acquire couples easily with automated friction scoreboards and budget matrix tools, while sitting back and generating monthly SaaS subscription revenues.
              </p>
              <div className="hero-actions animate-fade-in delay-3">
                <button className="btn btn-primary" onClick={() => document.getElementById('planner-portal-section').scrollIntoView()}>
                  Configure Your Portal
                </button>
                <button className="btn btn-secondary" onClick={() => setActiveTab('guest')}>
                  View Guest Demo
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Dynamic backdrop graphic */}
        <div className="hero-graphic-bg">
          <div className="blur-circle circle-1"></div>
          <div className="blur-circle circle-2"></div>
        </div>
      </section>

      {/* Tab Contents */}
      {activeTab === 'guest' ? (
        <main className="main-content">
          {/* Strategy Value Propositions Section */}
          <section className="value-props-section container">
            <div className="section-header">
              <span className="badge">Why Pivot?</span>
              <h2>A Disruptive B2B Wedding Model</h2>
              <p>We are rewriting the rules of luxury wedding planning by putting transparency, technology, and contract security first.</p>
            </div>
            
            <div className="props-grid">
              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <Award size={24} />
                </div>
                <h3>Vetted Off-Grid Venues</h3>
                <p>We partner with private ranches and historic estates that want weddings but lack marketing capabilities. We secure exclusive pricing and full B2B contracts.</p>
              </div>

              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <ShieldCheck size={24} />
                </div>
                <h3>Full Insurance Protection</h3>
                <p>Pivot provides a custom-tailored booking framework with a $10M liability insurance binder. The couple is fully protected, and the venue pays for it.</p>
              </div>

              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <DollarSign size={24} />
                </div>
                <h3>100% Free For Couples</h3>
                <p>We don't charge couples or planners. Instead, we take a 10% to 15% finder's fee directly from the venue on the booking, establishing a massive commission stream.</p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Section */}
          <div id="demo-calc">
            <FrictionCalculator />
          </div>

          {/* Interactive Budget Matrix Section */}
          <BudgetMatrix />

          {/* Vetted Venues Section */}
          <div id="vetted-network">
            <VenuesList />
          </div>
        </main>
      ) : (
        <main className="main-content">
          {/* SaaS Core Features */}
          <section className="value-props-section container">
            <div className="section-header">
              <span className="badge">VIP Optimizer SaaS</span>
              <h2>Acquire Couples. Scale Revenue.</h2>
              <p>White-label our travel optimization software to offer client-facing portals, flight tracking, and budget safety tools.</p>
            </div>

            <div className="props-grid">
              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <Layers size={24} />
                </div>
                <h3>Custom White-Label Branding</h3>
                <p>Planners configure custom subdomains, upload brand logos, and select color palettes to match their luxury firm's identity perfectly.</p>
              </div>

              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <Compass size={24} />
                </div>
                <h3>Friction-Free Guest Coordination</h3>
                <p>Let couples input guest cities and see optimized destination recommendations, flights availability, and ground transport logistics instantly.</p>
              </div>

              <div className="prop-card glass-card">
                <div className="prop-icon-wrapper">
                  <Users size={24} />
                </div>
                <h3>Passive Planner Commissions</h3>
                <p>While you charge monthly subscriptions to couples for portal access, you also collect venue finder's commissions from every reservation booked on our B2B network.</p>
              </div>
            </div>
          </section>

          {/* Planner Portal Configuration Simulator */}
          <div id="planner-portal-section">
            <PlannerPortal />
          </div>
        </main>
      )}

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo">PIVOT</span>
              <span className="footer-logo-sub">TRAVEL INTEL</span>
              <p>Redefining luxury destination logistics for the modern wedding industry.</p>
            </div>
            
            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>Solutions</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('guest'); }}>Guest Experience</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('planner'); }}>Planner Portal SaaS</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('guest'); }}>B2B Venue Network</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Security & Insurance</a>
                <a href="#">Careers</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <a href="mailto:partners@pivot.travel">partners@pivot.travel</a>
                <a href="tel:+18005550199">1 (800) 555-0199</a>
                <span className="footer-address">Bozeman, MT & New York, NY</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Pivot Travel Intelligence. All rights reserved. Vetted B2B Network, LLC.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Insurance Disclosures</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* Hero Section CSS */
        .hero-section {
          position: relative;
          padding: 10rem 0 7rem;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          overflow: hidden;
          text-align: center;
          border-bottom: 1px solid var(--border-light);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 800px;
        }

        .hero-section em {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--accent-gold);
          font-weight: 300;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 680px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .hero-graphic-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }

        .blur-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .circle-1 {
          top: -20%;
          left: 10%;
          width: 500px;
          height: 500px;
          background-color: var(--accent-sage);
        }

        .circle-2 {
          bottom: -10%;
          right: 15%;
          width: 450px;
          height: 450px;
          background-color: var(--accent-gold);
        }

        /* Value Props Section CSS */
        .value-props-section {
          padding: 6rem 0 3rem;
        }

        .props-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 2rem;
        }

        .prop-card {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: left;
        }

        .prop-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: var(--border-radius-sm);
          background-color: rgba(197, 168, 128, 0.15);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prop-card h3 {
          font-size: 1.4rem;
          font-weight: 500;
        }

        .prop-card p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* Footer Section CSS */
        .footer-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
          padding: 5rem 0 2.5rem;
          font-family: var(--font-sans);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 3rem;
        }

        .footer-brand {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-logo {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          line-height: 1;
        }

        .footer-logo-sub {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--accent-gold);
        }

        .footer-brand p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 1rem;
          max-width: 300px;
        }

        .footer-links-grid {
          flex: 2;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-col h4 {
          font-family: var(--font-sans);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .footer-col a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .footer-col a:hover {
          color: var(--accent-gold);
        }

        .footer-address {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-light);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-bottom-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .footer-bottom-links a:hover {
          color: var(--accent-gold);
        }

        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }
          
          .hero-actions .btn {
            width: 100%;
          }

          .footer-top {
            flex-direction: column;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
