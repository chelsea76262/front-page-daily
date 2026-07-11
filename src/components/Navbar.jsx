import React, { useState, useEffect } from 'react';
import { Sun, Moon, Compass, Shield, Users, Layers, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Default to dark theme for premium luxury aesthetic
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => setActiveTab('guest')}>
          <span className="logo-text">PIVOT</span>
          <span className="logo-sub">TRAVEL INTEL</span>
        </div>

        <nav className="navbar-nav">
          <button 
            className={`nav-link ${activeTab === 'guest' ? 'active' : ''}`}
            onClick={() => setActiveTab('guest')}
          >
            <Compass size={16} />
            Guest Optimizer
          </button>
          <button 
            className={`nav-link ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            <Layers size={16} />
            Planner SaaS
          </button>
        </nav>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#demo-calc" className="navbar-cta-btn" onClick={() => setActiveTab('guest')}>
            Try Demo
          </a>
        </div>
      </div>
      
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: all var(--transition-smooth);
          padding: 1.5rem 0;
        }
        
        .navbar-header.scrolled {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-light);
          padding: 1rem 0;
          box-shadow: var(--shadow-sm);
        }
        
        [data-theme="dark"] .navbar-header.scrolled {
          background: rgba(7, 13, 11, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(197, 168, 128, 0.15);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          line-height: 1;
          color: var(--text-primary);
        }

        .logo-sub {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--accent-gold);
          margin-top: 0.2rem;
        }

        .navbar-nav {
          display: flex;
          gap: 1.5rem;
          background: rgba(18, 31, 26, 0.05);
          padding: 0.35rem;
          border-radius: 50px;
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .navbar-nav {
          background: rgba(250, 248, 245, 0.03);
          border: 1px solid rgba(250, 248, 245, 0.08);
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          background-color: var(--text-primary);
          color: var(--bg-primary);
        }

        [data-theme="dark"] .nav-link.active {
          background-color: var(--accent-gold);
          color: #070D0B;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .theme-toggle {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .theme-toggle:hover {
          background-color: var(--border-light);
        }

        .navbar-cta-btn {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--bg-primary);
          background-color: var(--text-primary);
          padding: 0.65rem 1.4rem;
          border-radius: var(--border-radius-sm);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .navbar-cta-btn:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        [data-theme="dark"] .navbar-cta-btn {
          background-color: var(--accent-gold);
          color: #070D0B;
        }

        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
