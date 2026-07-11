import React from 'react';
import ranchImg from '../assets/luxury_wedding_ranch.png';
import estateImg from '../assets/historic_wedding_estate.png';
import glampingImg from '../assets/glamping_wedding_site.png';
import { ShieldCheck, MapPin, Plane, Car, DollarSign } from 'lucide-react';

const VENUES = [
  {
    id: 'ranch',
    name: 'Summit Ranch Peak',
    location: 'Bozeman, Montana',
    type: 'Private Ranch',
    image: ranchImg,
    description: 'A breathtaking 800-acre private working ranch situated at the base of the Bridger Mountains. Perfect for couples seeking a majestic outdoor wilderness wedding with absolute privacy.',
    blankSlate: true,
    flights: 78,
    airfare: 450,
    transit: '65 min (Mountain Shuttle required)',
    finderFee: '12% venue-paid commission',
    insurance: 'PIVOT $10M Group Liability Protection'
  },
  {
    id: 'estate',
    name: 'The Gilded Manor & Gardens',
    location: 'Charlottesville, Virginia',
    type: 'Historic Estate',
    image: estateImg,
    description: 'An iconic 18th-century brick estate surrounded by formal English boxwood gardens and rolling vineyard vistas. Offers a timeless, elegant, and classic southern setting.',
    blankSlate: false,
    flights: 92,
    airfare: 310,
    transit: '35 min (Chauffeured Transit included)',
    finderFee: '10% venue-paid commission',
    insurance: 'PIVOT Historic Landmark Indemnity'
  },
  {
    id: 'glamping',
    name: 'Red Rock Dunes Glamping',
    location: 'Moab, Utah',
    type: 'Luxury Glamping',
    image: glampingImg,
    description: 'An ultra-exclusive desert sanctuary featuring safari-style canvas suites, custom cedar decks, and panoramic views of the red rocks. Designed for a magical, bohemian-luxe experience under the stars.',
    blankSlate: true,
    flights: 65,
    airfare: 520,
    transit: '90 min (Off-road Desert Escort required)',
    finderFee: '15% venue-paid commission',
    insurance: 'PIVOT Wilderness Operations Binder'
  }
];

export default function VenuesList() {
  return (
    <section className="venues-section">
      <div className="section-header">
        <span className="badge">Vetted Network</span>
        <h2>Curated B2B Partner Venues</h2>
        <p className="section-intro">
          We bypass the traditional marketing noise to partner directly with private ranches, historic estates, and luxury glamping sites. 
          By offering a full booking contract and insurance framework, we secure lower rates and exclusive bookings. 
          <strong> Couples pay $0 extra. We take a finder's fee directly from the venue.</strong>
        </p>
      </div>

      <div className="venues-grid">
        {VENUES.map(venue => (
          <div key={venue.id} className="venue-card glass-card">
            <div className="venue-image-container">
              <img src={venue.image} alt={venue.name} className="venue-image" />
              <div className="venue-type-tag">{venue.type}</div>
              {venue.blankSlate && (
                <div className="venue-alert-tag">Blank-Slate Venue</div>
              )}
            </div>
            
            <div className="venue-content">
              <div className="venue-meta">
                <span className="venue-location">
                  <MapPin size={14} />
                  {venue.location}
                </span>
                <span className="venue-fee">{venue.finderFee}</span>
              </div>

              <h3>{venue.name}</h3>
              <p className="venue-desc">{venue.description}</p>

              <div className="venue-travel-stats">
                <div className="travel-stat">
                  <Plane size={14} />
                  <span><strong>{venue.flights}%</strong> Direct Flights</span>
                </div>
                <div className="travel-stat">
                  <DollarSign size={14} />
                  <span><strong>${venue.airfare}</strong> Avg Airfare</span>
                </div>
                <div className="travel-stat">
                  <Car size={14} />
                  <span><strong>{venue.transit}</strong> Airport-to-Venue</span>
                </div>
              </div>

              <div className="venue-insurance-framework">
                <ShieldCheck size={16} className="insurance-icon" />
                <span>{venue.insurance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .venues-section {
          padding: 6rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .section-intro {
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        .venues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        .venue-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .venue-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .venue-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-smooth);
        }

        .venue-card:hover .venue-image {
          transform: scale(1.05);
        }

        .venue-type-tag {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(14, 41, 29, 0.85);
          color: white;
          padding: 0.35rem 0.8rem;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
        }

        .venue-alert-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(197, 168, 128, 0.95);
          color: #121F1A;
          padding: 0.35rem 0.8rem;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .venue-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 1rem;
        }

        .venue-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .venue-location {
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .venue-fee {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .venue-card h3 {
          font-size: 1.6rem;
          color: var(--text-primary);
        }

        .venue-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .venue-travel-stats {
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          padding: 1rem 0;
          margin: 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .travel-stat {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .travel-stat span strong {
          color: var(--text-primary);
        }

        .venue-insurance-framework {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--accent-green);
          background: rgba(14, 41, 29, 0.05);
          padding: 0.6rem 0.8rem;
          border-radius: var(--border-radius-sm);
          font-weight: 500;
        }

        [data-theme="dark"] .venue-insurance-framework {
          color: var(--accent-gold);
          background: rgba(197, 168, 128, 0.08);
        }

        .insurance-icon {
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .venues-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
