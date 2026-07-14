import React, { useState, useEffect } from 'react';
import { DAILY_GAME_DATA } from './data/DailyGameData';
import './FrontPageDaily.css';

// ----------------------------------------------------
// 1. HEADER COMPONENT
// ----------------------------------------------------
function NewspaperHeader({ isDarkMode, setIsDarkMode, dateString }) {
  return (
    <header className="fp-header">
      <h1>FRONT PAGE DAILY</h1>
      <div className="fp-subtitle-row">
        <div className="fp-subtitle">
          {dateString || "Loading Morning Edition..."} • Production Draft
        </div>
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fp-theme-toggle"
        >
          {isDarkMode ? '☀️ LIGHT PRINT' : '🌙 INK MODE'}
        </button>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// 2. SCREEN A: THE LAUNCH HUB
// ----------------------------------------------------
function HubScreen({ difficulty, setDifficulty, onStart, onInstall, showInstallBtn, stats, selectedCategory, setSelectedCategory }) {
  const [showHowTo, setShowHowTo] = React.useState(false);

  return (
    <div className="fp-card fp-form">
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h2 className="fp-title-serif" style={{ marginBottom: '0.5rem' }}>Start your Daily News Puzzle</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Audit the wire feed, unscramble daily files, and fact-check trending narratives to print today's edition.
        </p>
      </div>

      {/* Stats Dashboard */}
      {stats && stats.gamesPlayed > 0 && (
        <div className="fp-stats-grid">
          <div className="fp-stat-box">
            <div className="fp-stat-val">{stats.gamesPlayed}</div>
            <div className="fp-stat-lbl">Played</div>
          </div>
          <div className="fp-stat-box">
            <div className="fp-stat-val">🔥 {stats.currentStreak}</div>
            <div className="fp-stat-lbl">Streak</div>
          </div>
          <div className="fp-stat-box">
            <div className="fp-stat-val">⭐ {stats.maxStreak}</div>
            <div className="fp-stat-lbl">Max</div>
          </div>
          <div className="fp-stat-box">
            <div className="fp-stat-val">{Math.round(stats.totalScore / stats.gamesPlayed)}</div>
            <div className="fp-stat-lbl">Avg Pts</div>
          </div>
        </div>
      )}

      {/* Category Grid */}
      <div style={{ borderTop: '1px dashed var(--border-dashed)', paddingTop: '0.85rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>
          Select News Edition
        </span>
        <div className="fp-category-grid">
          <div
            className={`fp-category-card ${selectedCategory === 'world' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('world')}
          >
            <span className="fp-category-icon">🌍</span>
            <span className="fp-category-label">Headline News</span>
          </div>
          <div
            className={`fp-category-card ${selectedCategory === 'popculture' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('popculture')}
          >
            <span className="fp-category-icon">🎬</span>
            <span className="fp-category-label">Pop Culture</span>
          </div>
          <div
            className={`fp-category-card ${selectedCategory === 'sports' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('sports')}
          >
            <span className="fp-category-icon">🏆</span>
            <span className="fp-category-label">Sports</span>
          </div>
          <div
            className={`fp-category-card ${selectedCategory === 'technology' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('technology')}
          >
            <span className="fp-category-icon">💻</span>
            <span className="fp-category-label">Tech & Science</span>
          </div>
        </div>
      </div>

      <div className="fp-toggle-container">
        <button
          type="button"
          className={`fp-toggle-btn ${difficulty === 'EASY' ? 'active' : ''}`}
          onClick={() => setDifficulty('EASY')}
        >
          EASY
        </button>
        <button
          type="button"
          className={`fp-toggle-btn ${difficulty === 'HARD' ? 'active' : ''}`}
          onClick={() => setDifficulty('HARD')}
        >
          HARD
        </button>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="fp-btn fp-btn-primary"
        style={{ padding: '1.1rem', fontSize: '0.95rem' }}
      >
        Enter the Wire Feed
      </button>

      {/* How to Play Collapsible */}
      <div className="fp-howtoplay-container">
        <button
          type="button"
          className="fp-howtoplay-trigger"
          onClick={() => setShowHowTo(!showHowTo)}
        >
          {showHowTo ? '📖 Hide Instructions' : '📖 How to Play'}
        </button>
        {showHowTo && (
          <div className="fp-howtoplay-panel">
            <div className="fp-howtoplay-step">
              <span className="fp-howtoplay-badge">1</span>
              <div className="fp-howtoplay-text">
                <strong>Phase 1: Wire Keyword Feed</strong>. Fill in missing report keywords using word banks or switch to anagram letters.
              </div>
            </div>
            <div className="fp-howtoplay-step">
              <span className="fp-howtoplay-badge">2</span>
              <div className="fp-howtoplay-text">
                <strong>Phase 2: Fact or Fiction</strong>. Read urgent headlines and swipe or click to verify them: Fact (Right) or Fiction (Left).
              </div>
            </div>
            <div className="fp-howtoplay-step">
              <span className="fp-howtoplay-badge">3</span>
              <div className="fp-howtoplay-text">
                <strong>Rank & Publish</strong>. Earn points based on accuracy and speed. Rank up and share your daily scorecard!
              </div>
            </div>
          </div>
        )}
      </div>

      {showInstallBtn && (
        <button
          type="button"
          onClick={onInstall}
          className="fp-install-promo"
        >
          📲 Install Front Page Daily App
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. SCREEN B: PHASE 1 – THE WIRE FEED
// ----------------------------------------------------
function WireFeedScreen({ difficulty, phase1Data, onStoryComplete }) {
  const [p1Index, setP1Index] = useState(0);
  const [p1Guess, setP1Guess] = useState('');
  const [p1HintUsed, setP1HintUsed] = useState(false);
  const [easyHintStage, setEasyHintStage] = useState(0); // 0 = none, 1 = first letter, 2 = definition
  const [hasRevealed, setHasRevealed] = useState(false);
  const [p1CardState, setP1CardState] = useState('PLAYING'); // 'PLAYING', 'VERIFIED'
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedWords, setFailedWords] = useState(new Set());
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [resolutionStatus, setResolutionStatus] = useState('HARD_NO_HINT');

  const currentStory = phase1Data[p1Index];

  // Reset local States when story index changes
  useEffect(() => {
    setErrorMsg('');
    setShake(false);
    setFailedWords(new Set());
    setP1Guess('');
    setP1HintUsed(false);
    setEasyHintStage(0);
    setHasRevealed(false);
    setP1CardState('PLAYING');
    setPointsAwarded(0);
  }, [p1Index]);

  const handleIncorrect = (msg) => {
    setShake(true);
    setErrorMsg(msg);
    setTimeout(() => setShake(false), 500);
  };

  const handleP1Submit = (guess) => {
    if (!guess) return;
    const normalizedGuess = guess.trim().toUpperCase();
    
    if (normalizedGuess === currentStory.targetWord) {
      const isHardWithNoHint = difficulty === 'HARD' && !p1HintUsed && easyHintStage === 0;
      let pts = 25; // Easy mode base score (half of 50)
      let status = 'HINT_OR_EASY';

      if (hasRevealed) {
        pts = 0;
        status = 'REVEALED';
      } else {
        if (isHardWithNoHint) {
          pts = 50; // Hard mode perfect solve (half of 100)
          status = 'HARD_NO_HINT';
        } else {
          if (difficulty === 'HARD') {
            if (easyHintStage === 1) pts = 40;     // half of 80
            else if (easyHintStage === 2) pts = 35; // half of 70
            else if (p1HintUsed) pts = 25;          // half of 50
          }
          status = 'HINT_OR_EASY';
        }
      }
      
      setPointsAwarded(pts);
      setResolutionStatus(status);
      setP1CardState('VERIFIED');
      setErrorMsg('');
    } else {
      handleIncorrect("⚠️ Editorial mismatch! Verify your facts and try again.");
    }
  };

  const handleWordSelect = (word) => {
    const normalizedWord = word.trim().toUpperCase();
    if (normalizedWord === currentStory.targetWord) {
      const pts = 25; // half of 50
      const status = 'HINT_OR_EASY';
      
      setPointsAwarded(pts);
      setResolutionStatus(status);
      setP1CardState('VERIFIED');
      setErrorMsg('');
    } else {
      setFailedWords(prev => new Set([...prev, word]));
      handleIncorrect(`⚠️ "${word}" is not the correct fit for this report.`);
    }
  };

  const handleReveal = () => {
    setHasRevealed(true);
    setP1Guess(currentStory.targetWord);
    setErrorMsg('');
  };

  const advanceP1 = () => {
    // Log the current story results to the global parent state
    const isLast = p1Index === phase1Data.length - 1;
    onStoryComplete(pointsAwarded, resolutionStatus, isLast);
    
    if (!isLast) {
      setP1Index(prev => prev + 1);
    }
  };

  const showMultipleChoiceLayout = difficulty === 'EASY' || p1HintUsed;

  return (
    <div className={`fp-card ${shake ? 'shake-card' : ''}`}>
      <div className="fp-queue">
        <span>File Queue (Phase 1)</span>
        <span>{p1Index + 1} / {phase1Data.length}</span>
      </div>

      <span className="fp-badge fp-badge-primary">
        {currentStory.category}
      </span>

      <h3 className="fp-title-serif" style={{ minHeight: '64px', marginBottom: '1.25rem' }}>
        {p1CardState === 'VERIFIED'
          ? currentStory.headlineTemplate.replace("______", currentStory.targetWord)
          : currentStory.headlineTemplate}
      </h3>

      {errorMsg && (
        <div className="fp-alert" style={{ marginBottom: '1.25rem' }}>
          <span>{errorMsg}</span>
        </div>
      )}

      {p1CardState === 'PLAYING' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {showMultipleChoiceLayout ? (
            // Easy Mode: Multiple Choice (Word Bank) Layout
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="fp-word-bank">
                {currentStory.wordBank.map((word) => {
                  const isFailed = failedWords.has(word);
                  return (
                    <button
                      key={word}
                      type="button"
                      disabled={isFailed}
                      onClick={() => handleWordSelect(word)}
                      className="fp-btn fp-btn-action"
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
              <div className="fp-action-row">
                {difficulty === 'HARD' && p1HintUsed && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    💡 Multiple Choice active (-10 pts swap penalty)
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleReveal}
                  className="fp-hint-link"
                  style={{ color: 'var(--accent-red)' }}
                >
                  🔓 Reveal Answer (0 pts)
                </button>
              </div>
            </div>
          ) : (
            // Hard Mode: Anagram (Scrambled Letters) Layout
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleP1Submit(p1Guess);
              }}
              className="fp-form"
            >
              <div className="fp-anagram-reveal">
                <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-green)', display: 'block', marginBottom: '0.2rem' }}>
                  Scrambled Letters
                </span>
                <span className="fp-anagram-scrambled">{currentStory.scrambled}</span>
              </div>

              {easyHintStage >= 1 && (
                <div className="fp-anagram-reveal" style={{ backgroundColor: 'var(--accent-blue-light)', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.2rem' }}>
                    Hint #1: First Letter
                  </span>
                  <span className="fp-anagram-scrambled" style={{ color: 'var(--accent-blue)', fontSize: '1.25rem' }}>
                    {currentStory.targetWord[0] + " _".repeat(currentStory.targetWord.length - 1)}
                  </span>
                </div>
              )}

              {easyHintStage >= 2 && (
                <div className="fp-wire-snippet" style={{ marginTop: '0.25rem', padding: '0.75rem' }}>
                  <strong>Definition:</strong> {currentStory.definition}
                </div>
              )}

              <div className="fp-input-group">
                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={p1Guess}
                  onChange={(e) => setP1Guess(e.target.value)}
                  className="fp-input"
                  readOnly={hasRevealed}
                  style={hasRevealed ? { opacity: 0.8, backgroundColor: 'var(--border-subtle)' } : {}}
                  autoFocus={!hasRevealed}
                />
                <button
                  type="submit"
                  className="fp-btn fp-btn-emerald"
                >
                  File
                </button>
              </div>
              
              <div className="fp-action-row" style={{ marginTop: '0rem' }}>
                {!hasRevealed && (
                  <>
                    {easyHintStage === 0 && (
                      <button
                        type="button"
                        onClick={() => setEasyHintStage(1)}
                        className="fp-hint-link"
                      >
                        💡 Get letter hint (-5 pts)
                      </button>
                    )}
                    {easyHintStage === 1 && (
                      <button
                        type="button"
                        onClick={() => setEasyHintStage(2)}
                        className="fp-hint-link"
                      >
                        💡 Get definition (-10 pts)
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setP1HintUsed(true)}
                      className="fp-hint-link"
                    >
                      💡 Swap to Multiple Choice (-10 pts)
                    </button>
                    <button
                      type="button"
                      onClick={handleReveal}
                      className="fp-hint-link"
                      style={{ color: 'var(--accent-red)' }}
                    >
                      🔓 Reveal (0 pts)
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      ) : (
        // Verified Micro State
        <div className="fp-verified-box">
          <div className="fp-verified-checkmark">
            {resolutionStatus === 'REVEALED' ? '✕' : '✓'}
          </div>
          <p style={{
            fontWeight: 800,
            color: resolutionStatus === 'REVEALED' ? 'var(--accent-red)' : 'var(--accent-green)',
            margin: '0 0 0.75rem 0',
            fontSize: '0.95rem'
          }}>
            {resolutionStatus === 'REVEALED' ? 'Headline Logged with Failures.' : 'Headline Logged Successfully.'}
          </p>
          
          <div className="fp-wire-snippet" style={{ marginBottom: '1.25rem', textAlign: 'left', fontStyle: 'italic' }}>
            "{currentStory.wireSnippet}"
          </div>

          <button
            type="button"
            onClick={advanceP1}
            className="fp-btn fp-btn-primary"
            style={{ width: '100%' }}
          >
            {p1Index === phase1Data.length - 1 ? 'Proceed to next stage →' : 'Next Assignment →'}
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. SCREEN C: PHASE 2 – FACT OR FICTION (SWIPE PHYSICS)
// ----------------------------------------------------
function AuditScreen({ phase2Data, onChoiceComplete, onPhaseComplete }) {
  const [p2Index, setP2Index] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'LEFT', 'RIGHT', or null
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [choiceCorrect, setChoiceCorrect] = useState(null);

  // Drag Gesture States
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const currentStory = phase2Data[p2Index];

  // Reset choice correctness state on card changes
  useEffect(() => {
    setChoiceCorrect(null);
  }, [p2Index]);

  const handleP2Choice = (chosenTrue) => {
    if (isFlipped || isTransitioning) return;
    
    setIsTransitioning(true);
    const isCorrect = chosenTrue === currentStory.isFact;
    setChoiceCorrect(isCorrect);
    setSwipeDirection(chosenTrue ? 'RIGHT' : 'LEFT');

    setTimeout(() => {
      setIsFlipped(true);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 250);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    // Call choice completion to parent log but do not change screen yet
    onChoiceComplete(isCorrect ? 25 : 0, isCorrect ? 'CORRECT' : 'INCORRECT');
  };

  // Drag Event Handlers
  const handleDragStart = (clientX, clientY) => {
    if (isFlipped || isTransitioning) return;
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
 
    // Threshold check (120px)
    if (dragOffset.x > 120) {
      handleP2Choice(true); // Swiped Right: Fact
    } else if (dragOffset.x < -120) {
      handleP2Choice(false); // Swiped Left: Fiction
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const advanceP2 = () => {
    setIsFlipped(false);
    setDragOffset({ x: 0, y: 0 });
    setChoiceCorrect(null);

    const isLast = p2Index === phase2Data.length - 1;
    if (isLast) {
      onPhaseComplete();
    } else {
      setP2Index(prev => prev + 1);
    }
  };

  // Build inline styles driven by dragging/flipping state
  let transformStyle = {};

  if (isDragging) {
    transformStyle = {
      transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x * 0.04}deg)`
    };
  } else if (swipeDirection === 'LEFT') {
    transformStyle = {
      transform: `translate3d(-350px, 15px, -100px) rotate(-15deg)`,
      opacity: 0
    };
  } else if (swipeDirection === 'RIGHT') {
    transformStyle = {
      transform: `translate3d(350px, 15px, -100px) rotate(15deg)`,
      opacity: 0
    };
  } else if (isFlipped) {
    transformStyle = {
      transform: `rotateY(180deg)`
    };
  }

  // Swipe overlay indicator opacity logic
  const factOverlayOpacity = isDragging && dragOffset.x > 30 ? Math.min(dragOffset.x / 120, 0.9) : 0;
  const fictionOverlayOpacity = isDragging && dragOffset.x < -30 ? Math.min(Math.abs(dragOffset.x) / 120, 0.9) : 0;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="fp-queue" style={{ width: '100%', maxWidth: '480px' }}>
        <span>Phase 2: Narrative Audit</span>
        <span>{p2Index + 1} / {phase2Data.length}</span>
      </div>

      <div className="fp-perspective">
        <div
          className={`fp-flipcard ${isDragging ? 'is-dragging' : ''}`}
          style={transformStyle}
          
          // Mouse Handlers
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          
          // Touch Handlers for mobile
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          {/* FACE FRONT: The Question */}
          <div className="fp-face backface-hidden">
            <div>
              <span className="fp-badge fp-badge-purple">
                {currentStory.category}
              </span>
              <h3 className="fp-title-serif" style={{ fontSize: '1.3rem', fontWeight: 700, fontStyle: 'italic', lineHeight: '1.4' }}>
                "{currentStory.headline}"
              </h3>
            </div>
            
            {/* Visual indicators for swipe helpers */}
            <div className="fp-swipe-overlay fact" style={{ opacity: factOverlayOpacity }}>
              FACT
            </div>
            <div className="fp-swipe-overlay fiction" style={{ opacity: fictionOverlayOpacity }}>
              FICTION
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 0' }}>
              Swipe card <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>Right for FACT</span> or <span style={{ color: 'var(--accent-red)', fontWeight: 800 }}>Left for FICTION</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                disabled={isTransitioning}
                onClick={() => handleP2Choice(false)}
                className="fp-btn"
                style={{
                  backgroundColor: '#FFF2F2',
                  border: '1.5px solid #FFD5D5',
                  color: 'var(--accent-red)',
                  fontWeight: 800,
                  fontSize: '0.8rem'
                }}
              >
                Fiction (Swipe Left)
              </button>
              <button
                type="button"
                disabled={isTransitioning}
                onClick={() => handleP2Choice(true)}
                className="fp-btn"
                style={{
                  backgroundColor: 'var(--accent-green-light)',
                  border: '1.5px solid #C2DBD0',
                  color: 'var(--accent-green)',
                  fontWeight: 800,
                  fontSize: '0.8rem'
                }}
              >
                Fact (Swipe Right)
              </button>
            </div>
          </div>

          {/* FACE BACK: The Reveal narrative */}
          <div className="fp-face face-back backface-hidden" style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', textAlign: 'center' }}>
              {choiceCorrect !== null && (
                <div className={`fp-audit-badge ${choiceCorrect ? 'correct' : 'incorrect'}`}>
                  {choiceCorrect ? 'CORRECT ✅' : 'INCORRECT ❌'}
                </div>
              )}
              <span style={{ fontSize: '1.4rem', display: 'block', fontWeight: 'bold' }}>{currentStory.tagline}</span>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                color: '#E2E8F0',
                margin: 0
              }}>
                {currentStory.revealText}
              </p>
            </div>
            <button
              type="button"
              onClick={advanceP2}
              className="fp-btn"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                width: '100%',
                fontWeight: 800,
                marginTop: '1rem'
              }}
            >
              {p2Index === phase2Data.length - 1 ? "Finish Edition" : "Next Audit Wire →"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. SCREEN D: UNIFIED SCORE SUMMARY
// ----------------------------------------------------
function SummaryScreen({ dateString, globalScore, performanceLog, onReset, stats, setSelectedCategory, playedCategories, onLaunchLexicon }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = globalScore;
    if (end === 0) return;
    
    const step = Math.max(1, Math.ceil(end / 12));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedScore(start);
    }, 15);

    return () => clearInterval(timer);
  }, [globalScore]);

  // Determine Rank based on score thresholds
  const getRank = (score) => {
    if (score >= 250) return "Executive Editor 🏆";
    if (score >= 175) return "Managing Editor ✍️";
    if (score >= 100) return "Senior Reporter 🕵️";
    if (score >= 50) return "Cub Reporter 📝";
    return "Editorial Intern ☕";
  };

  // Share scoreboard to clipboard
  const handleShare = () => {
    // Map performanceLog to emojis
    const p1Emojis = performanceLog.phase1.map(status => {
      if (status === 'HARD_NO_HINT') return '⭐️';
      if (status === 'HINT_OR_EASY') return '⚡';
      return '❌';
    }).join(' ');

    const p2Emojis = performanceLog.phase2.map(status => {
      return status === 'CORRECT' ? '🟩' : '🟥';
    }).join(' ');

    const shareText = `Front Page Daily 📰 ${dateString}
Score: ${globalScore} PTS
Rank: ${getRank(globalScore)}

Phase 1 (Wires): ${p1Emojis}
Phase 2 (Audits): ${p2Emojis}

Play at Front Page Daily!`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }).catch(err => {
      console.error('Could not copy scorecard: ', err);
    });
  };

  return (
    <div className="fp-card fp-form" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '2.5rem', display: 'block', margin: '0.5rem 0' }}>🖨️</span>
        <h2 className="fp-title-serif" style={{ marginBottom: '0.25rem' }}>The Chronicle is Live!</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Your layout balanced with internal validation mechanics is printing.
        </p>
      </div>

      <div className="fp-summary-score-box">
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem' }}>
          Performance Metric
        </span>
        <div className="fp-summary-score-large">
          {animatedScore} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>PTS</span>
        </div>
      </div>

      {/* Stats Dashboard */}
      {stats && stats.gamesPlayed > 0 && (
        <div className="fp-stats-grid" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <div className="fp-stat-box" style={{ padding: '0.4rem 0.2rem' }}>
            <div className="fp-stat-val" style={{ fontSize: '1.1rem' }}>{stats.gamesPlayed}</div>
            <div className="fp-stat-lbl" style={{ fontSize: '0.55rem' }}>Played</div>
          </div>
          <div className="fp-stat-box" style={{ padding: '0.4rem 0.2rem' }}>
            <div className="fp-stat-val" style={{ fontSize: '1.1rem' }}>🔥 {stats.currentStreak}</div>
            <div className="fp-stat-lbl" style={{ fontSize: '0.55rem' }}>Streak</div>
          </div>
          <div className="fp-stat-box" style={{ padding: '0.4rem 0.2rem' }}>
            <div className="fp-stat-val" style={{ fontSize: '1.1rem' }}>⭐ {stats.maxStreak}</div>
            <div className="fp-stat-lbl" style={{ fontSize: '0.55rem' }}>Max</div>
          </div>
          <div className="fp-stat-box" style={{ padding: '0.4rem 0.2rem' }}>
            <div className="fp-stat-val" style={{ fontSize: '1.1rem' }}>{Math.round(stats.totalScore / stats.gamesPlayed)}</div>
            <div className="fp-stat-lbl" style={{ fontSize: '0.55rem' }}>Avg Pts</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', textAlign: 'left', marginBottom: '0.5rem' }}>
        <div className="fp-summary-row">
          <span className="fp-summary-label">Layout Status</span>
          <span className="fp-summary-value" style={{ color: 'var(--accent-green)' }}>Authenticated</span>
        </div>
        <div className="fp-summary-row">
          <span className="fp-summary-label">Rank Profile</span>
          <span className="fp-summary-value" style={{ color: 'var(--accent-blue)' }}>{getRank(globalScore)}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <button
          type="button"
          onClick={handleShare}
          className="fp-btn"
          style={{
            backgroundColor: 'var(--accent-blue-light)',
            color: 'var(--accent-blue)',
            fontWeight: 800
          }}
        >
          Share Edition 📤
        </button>
        
        <button
          type="button"
          onClick={onReset}
          className="fp-btn fp-btn-primary"
        >
          Reset Board
        </button>
      </div>

      {/* Play Another Edition */}
      <div style={{ borderTop: '1px dashed var(--border-dashed)', paddingTop: '1rem', marginTop: '1rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
          Play Another Edition
        </span>
        <div className="fp-category-grid" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <div
            className="fp-category-card"
            style={{ padding: '0.6rem 0.3rem' }}
            onClick={() => {
              setSelectedCategory('world');
              onReset();
            }}
          >
            <span className="fp-category-icon" style={{ fontSize: '1.2rem' }}>🌍</span>
            <span className="fp-category-label" style={{ fontSize: '0.65rem' }}>Headline News</span>
          </div>
          <div
            className="fp-category-card"
            style={{ padding: '0.6rem 0.3rem' }}
            onClick={() => {
              setSelectedCategory('popculture');
              onReset();
            }}
          >
            <span className="fp-category-icon" style={{ fontSize: '1.2rem' }}>🎬</span>
            <span className="fp-category-label" style={{ fontSize: '0.65rem' }}>Pop Culture</span>
          </div>
          <div
            className="fp-category-card"
            style={{ padding: '0.6rem 0.3rem' }}
            onClick={() => {
              setSelectedCategory('sports');
              onReset();
            }}
          >
            <span className="fp-category-icon" style={{ fontSize: '1.2rem' }}>🏆</span>
            <span className="fp-category-label" style={{ fontSize: '0.65rem' }}>Sports</span>
          </div>
          <div
            className="fp-category-card"
            style={{ padding: '0.6rem 0.3rem' }}
            onClick={() => {
              setSelectedCategory('technology');
              onReset();
            }}
          >
            <span className="fp-category-icon" style={{ fontSize: '1.2rem' }}>💻</span>
            <span className="fp-category-label" style={{ fontSize: '0.65rem' }}>Tech & Science</span>
          </div>
        </div>
      </div>

      {/* Editor's Lexicon (Permanent Overtime Option) */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onLaunchLexicon}
          className="fp-btn"
          style={{ width: '100%', backgroundColor: 'var(--accent-gold)', color: 'var(--text-dark)', fontWeight: 800, padding: '0.75rem' }}
        >
          🎓 Play Endless Editor's Lexicon
        </button>
      </div>

      {showToast && (
        <div className="fp-toast">
          Scorecard copied to clipboard! 📋
        </div>
      )}
    </div>
  );
}

const VOCABULARY_WORDS = [
  {
    word: "Obfuscate",
    definition: "To make unclear or confusing.",
    distractors: [
      "To reveal a hidden truth.",
      "To organize news chronologically.",
      "To write a short summary."
    ]
  },
  {
    word: "Synecdoche",
    definition: "A part representing the whole.",
    distractors: [
      "A false damaging statement.",
      "A technical printing error.",
      "An anonymous source tip."
    ]
  },
  {
    word: "Demagogue",
    definition: "Leader appealing to prejudices.",
    distractors: [
      "A neutral war reporter.",
      "An editorial design tool.",
      "A copy editor assistant."
    ]
  },
  {
    word: "Mercurial",
    definition: "Unpredictable mood changes.",
    distractors: [
      "Slow and research-focused.",
      "A lead-based printing texture.",
      "An equal spacing column layout."
    ]
  },
  {
    word: "Gerrymander",
    definition: "Manipulating voting boundaries.",
    distractors: [
      "Approving draft publications.",
      "Writing dramatic clickbait.",
      "A quick official interview."
    ]
  },
  {
    word: "Hegemony",
    definition: "Dominance of one group.",
    distractors: [
      "A cooperative union.",
      "Newsroom roles division.",
      "A classic serif typography font."
    ]
  },
  {
    word: "Spurious",
    definition: "False or fake.",
    distractors: [
      "Highly creative narrative style.",
      "An urgent breaking alert.",
      "Pertaining to chemical ink check."
    ]
  },
  {
    word: "Obsequious",
    definition: "Excessively obedient or attentive.",
    distractors: [
      "Rude to editorial feedback.",
      "Outdated layout mechanism.",
      "Highly analytical and objective."
    ]
  },
  {
    word: "Paucity",
    definition: "Scarcity or small quantity.",
    distractors: [
      "Abundance of news sources.",
      "Fast layout machine speed.",
      "A source protection decree."
    ]
  },
  {
    word: "Sycophant",
    definition: "Flatterer seeking self-advantage.",
    distractors: [
      "Editor fighting censorship.",
      "Printing press repair technician.",
      "A generic satirical alias."
    ]
  },
  {
    word: "Cacophony",
    definition: "Harsh, discordant sounds.",
    distractors: [
      "Melodic harmony of voices.",
      "Typewriter typing sound.",
      "Paragraph outline technique."
    ]
  },
  {
    word: "Recalcitrant",
    definition: "Uncooperative toward authority.",
    distractors: [
      "Eager to follow style guides.",
      "Recycled paper pulp texture.",
      "Easily torn layout sheets."
    ]
  },
  {
    word: "Capricious",
    definition: "Sudden changes of mood.",
    distractors: [
      "Reliable and deadline-focused.",
      "Traditional printing fonts.",
      "Systematic investigative audit."
    ]
  },
  {
    word: "Anachronism",
    definition: "Belonging to another time period.",
    distractors: [
      "Modern digital editing tool.",
      "News transmission speed meter.",
      "Secret political reporter deal."
    ]
  },
  {
    word: "Superfluous",
    definition: "Unnecessary or excessive.",
    distractors: [
      "Critical front page layout.",
      "Short and concise headline.",
      "Written in a neutral tone."
    ]
  },
  {
    word: "Pernicious",
    definition: "Gradually harmful or destructive.",
    distractors: [
      "Highly beneficial to public.",
      "Exciting for morning commuters.",
      "Classic bold heading design."
    ]
  },
  {
    word: "Quixotic",
    definition: "Idealistic and impractical.",
    distractors: [
      "Pragmatic and results-focused.",
      "Quick breaking news response.",
      "Fast-drying typographic ink."
    ]
  },
  {
    word: "Taciturn",
    definition: "Silent and uncommunicative.",
    distractors: [
      "Loud and talkative in newsrooms.",
      "Highly emotional opinion columns.",
      "A mechanical sorting machine."
    ]
  },
  {
    word: "Pugnacious",
    definition: "Eager or quick to fight.",
    distractors: [
      "Gentle and team-cooperative.",
      "Funny cartoon illustrations.",
      "Sharp fresh printing ink smell."
    ]
  },
  {
    word: "Surreptitious",
    definition: "Secret and unauthorized.",
    distractors: [
      "Publicly broadcast worldwide.",
      "Official government decree.",
      "Fast graphic layout creation."
    ]
  }
];

function VocabularyGameScreen({ onExit, onAwardPoints }) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  const [wordData, setWordData] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameState, setGameState] = useState('PLAYING'); // 'PLAYING', 'ANSWERED', 'ROUND_OVER'

  const [wordsPlayedCount, setWordsPlayedCount] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [removalsLeft, setRemovalsLeft] = useState(2);
  const [removedOptions, setRemovedOptions] = useState(new Set());
  const [isEndless, setIsEndless] = useState(false);

  const loadNextWord = () => {
    if (!isEndless && wordsPlayedCount >= 3) {
      setGameState('ROUND_OVER');
      return;
    }

    const randomWord = VOCABULARY_WORDS[Math.floor(Math.random() * VOCABULARY_WORDS.length)];
    const shuffleArray = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    const allOptions = shuffleArray([randomWord.definition, ...randomWord.distractors]);
    setWordData(randomWord);
    setOptions(allOptions);
    setSelectedOption(null);
    setGameState('PLAYING');
    setRemovalsLeft(2);
    setRemovedOptions(new Set());
  };

  useEffect(() => {
    loadNextWord();
  }, [isEndless]);

  const handleOptionClick = (option) => {
    if (gameState !== 'PLAYING') return;
    setSelectedOption(option);
    setGameState('ANSWERED');
    setWordsPlayedCount(prev => prev + 1);
    
    if (option === wordData.definition) {
      setScore(prev => prev + 50);
      setRoundScore(prev => prev + 50);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      if (onAwardPoints) {
        onAwardPoints(25); // Award +25 bonus points
      }
    } else {
      setStreak(0);
    }
  };

  const handleRemoveChoice = () => {
    if (removalsLeft <= 0 || gameState !== 'PLAYING') return;
    
    const incorrectOptions = options.filter(opt => opt !== wordData.definition && !removedOptions.has(opt));
    
    if (incorrectOptions.length > 0) {
      const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      setRemovedOptions(prev => {
        const updated = new Set(prev);
        updated.add(randomIncorrect);
        return updated;
      });
      setRemovalsLeft(prev => prev - 1);
    }
  };

  const handleStartNextRound = () => {
    setWordsPlayedCount(0);
    setRoundScore(0);
    setIsEndless(false);
    setTimeout(() => {
      const randomWord = VOCABULARY_WORDS[Math.floor(Math.random() * VOCABULARY_WORDS.length)];
      const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      const allOptions = shuffleArray([randomWord.definition, ...randomWord.distractors]);
      setWordData(randomWord);
      setOptions(allOptions);
      setSelectedOption(null);
      setGameState('PLAYING');
      setRemovalsLeft(2);
      setRemovedOptions(new Set());
    }, 50);
  };

  const handleStartEndless = () => {
    setIsEndless(true);
    setWordsPlayedCount(0);
    setRoundScore(0);
    setTimeout(() => {
      const randomWord = VOCABULARY_WORDS[Math.floor(Math.random() * VOCABULARY_WORDS.length)];
      const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      const allOptions = shuffleArray([randomWord.definition, ...randomWord.distractors]);
      setWordData(randomWord);
      setOptions(allOptions);
      setSelectedOption(null);
      setGameState('PLAYING');
      setRemovalsLeft(2);
      setRemovedOptions(new Set());
    }, 50);
  };

  if (gameState === 'ROUND_OVER') {
    return (
      <div className="fp-card fp-form animate-fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎓</span>
        <h2 className="fp-title-serif" style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>
          Round Completed!
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          You solved the 3-word challenge. Any correct answers earned you **+25 PTS** bonus directly to your daily global score!
        </p>

        <div style={{ backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Round Score</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-gold)' }}>+{roundScore} PTS</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Streak: 🔥 {streak}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleStartNextRound}
            className="fp-btn fp-btn-primary"
            style={{ width: '100%' }}
          >
            Play Another Round (3 Words) 🔄
          </button>
          <button
            type="button"
            onClick={handleStartEndless}
            className="fp-btn"
            style={{ width: '100%', backgroundColor: 'var(--accent-blue-light)', color: 'var(--accent-blue)', fontWeight: 800 }}
          >
            Continue Endless Play 🚀
          </button>
          <button
            type="button"
            onClick={onExit}
            className="fp-btn fp-btn-action"
            style={{ width: '100%' }}
          >
            Return to Summary Screen
          </button>
        </div>
      </div>
    );
  }

  if (!wordData) return null;

  const isCorrect = selectedOption === wordData.definition;

  return (
    <div className="fp-card fp-form animate-fade-in" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <button 
          onClick={onExit} 
          className="fp-hint-link" 
          style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
        >
          ← Exit Lexicon
        </button>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 800 }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {!isEndless ? `WORD: ${wordsPlayedCount + (gameState === 'PLAYING' ? 1 : 0)}/3` : 'ENDLESS MODE'}
          </span>
          <span style={{ color: 'var(--accent-gold)' }}>SCORE: {score}</span>
          <span style={{ color: 'var(--accent-blue)' }}>STREAK: 🔥 {streak}</span>
        </div>
      </div>

      <div style={{ margin: '1.5rem 0' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
          EDITOR'S LEXICON
        </span>
        <h2 className="fp-title-serif" style={{ fontSize: '2.2rem', letterSpacing: '0.02em', margin: '0.5rem 0' }}>
          {wordData.word}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Identify the correct definition:
        </p>
      </div>

      {/* Remove Choice Lifeline Button */}
      {gameState === 'PLAYING' && (
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={handleRemoveChoice}
            disabled={removalsLeft <= 0}
            className="fp-btn"
            style={{ 
              fontSize: '0.75rem', 
              padding: '0.4rem 0.8rem', 
              backgroundColor: removalsLeft > 0 ? 'var(--accent-red-light)' : 'var(--bg-page)', 
              color: removalsLeft > 0 ? 'var(--accent-red)' : 'var(--text-muted)', 
              border: `1px solid ${removalsLeft > 0 ? 'var(--accent-red)' : 'var(--border-subtle)'}`,
              borderRadius: '20px',
              fontWeight: 800
            }}
          >
            ✂️ Remove a Choice ({removalsLeft} left)
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0', textAlign: 'left' }}>
        {options.map((opt) => {
          if (removedOptions.has(opt)) return null;

          let btnClass = "fp-btn fp-btn-action";
          let style = { width: '100%', whiteSpace: 'normal', textAlign: 'left', lineHeight: '1.4', padding: '0.8rem 1rem' };
          
          if (gameState === 'ANSWERED') {
            if (opt === wordData.definition) {
              btnClass = "fp-btn fp-btn-emerald";
            } else if (opt === selectedOption) {
              btnClass = "fp-btn fp-btn-red";
            } else {
              style.opacity = 0.4;
            }
          }

          return (
            <button
              key={opt}
              type="button"
              className={btnClass}
              style={style}
              disabled={gameState === 'ANSWERED'}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {gameState === 'ANSWERED' && (
        <div 
          className="animate-fade-in"
          style={{ 
            padding: '1rem', 
            borderRadius: 'var(--border-radius)', 
            backgroundColor: isCorrect ? 'var(--accent-green-light)' : 'var(--accent-red-light)', 
            color: isCorrect ? 'var(--accent-green)' : 'var(--accent-red)',
            marginBottom: '1.5rem',
            textAlign: 'left',
            fontSize: '0.8rem',
            lineHeight: '1.4',
            border: `1px solid ${isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}`
          }}
        >
          <strong>{isCorrect ? "Correct! 🎉 (+25 Bonus PTS)" : "Incorrect. ❌"}</strong> {wordData.word} means: <em>"{wordData.definition}"</em>
        </div>
      )}

      {gameState === 'ANSWERED' && (
        <button
          type="button"
          onClick={loadNextWord}
          className="fp-btn fp-btn-primary"
          style={{ width: '100%', padding: '0.9rem' }}
        >
          Next Word →
        </button>
      )}
    </div>
  );
}

function CategoryTransitionScreen({ playedCategories, globalScore, onSelectCategory, onProceed }) {
  const categoriesList = [
    { key: 'world', label: 'Headline News', icon: '🌍' },
    { key: 'popculture', label: 'Pop Culture', icon: '🎬' },
    { key: 'sports', label: 'Sports', icon: '🏆' },
    { key: 'technology', label: 'Tech & Science', icon: '💻' }
  ];

  const remainingCategories = categoriesList.filter(c => !playedCategories.includes(c.key));

  return (
    <div className="fp-card fp-form" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '2.5rem', display: 'block', margin: '0.5rem 0' }}>📰</span>
        <h2 className="fp-title-serif" style={{ marginBottom: '0.25rem' }}>Section Compiled!</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          You've successfully compiled this edition's wire reports.
        </p>
      </div>

      <div className="fp-summary-score-box" style={{ margin: '1.5rem 0' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem' }}>
          Current Score
        </span>
        <div className="fp-summary-score-large" style={{ fontSize: '2rem' }}>
          {globalScore} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>PTS</span>
        </div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
          Compiled Sections ({playedCategories.length} / 4)
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {categoriesList.map(c => {
            const played = playedCategories.includes(c.key);
            return (
              <span
                key={c.key}
                className={`fp-badge ${played ? 'fp-badge-primary' : ''}`}
                style={{ opacity: played ? 1 : 0.4 }}
              >
                {c.icon} {c.label} {played ? '✓' : ''}
              </span>
            );
          })}
        </div>
      </div>

      {remainingCategories.length > 0 ? (
        <div style={{ borderTop: '1px dashed var(--border-dashed)', paddingTop: '1.25rem', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
            Boost your Score! Add another section:
          </span>
          <div className="fp-category-grid" style={{ marginBottom: '1.25rem' }}>
            {remainingCategories.map(c => (
              <div
                key={c.key}
                className="fp-category-card"
                onClick={() => onSelectCategory(c.key)}
              >
                <span className="fp-category-icon">{c.icon}</span>
                <span className="fp-category-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600, marginBottom: '1rem' }}>
          🎉 Outstanding! You have completed every section for today's newspaper!
        </p>
      )}

      <button
        type="button"
        onClick={onProceed}
        className="fp-btn fp-btn-primary"
        style={{ width: '100%', padding: '0.9rem' }}
      >
        Send to Fact-Check Audit →
      </button>
    </div>
  );
}

// ----------------------------------------------------
// MAIN CONTROLLER
// ----------------------------------------------------
export default function FrontPageDaily() {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('world');
  const [playedCategories, setPlayedCategories] = useState([]);
  
  const [currentScreen, setCurrentScreen] = useState('HUB'); // 'HUB', 'PHASE_1', 'PHASE_2', 'SUMMARY'
  const [difficulty, setDifficulty] = useState('HARD'); // 'EASY', 'HARD'
  const [globalScore, setGlobalScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Performance Log State
  const [performanceLog, setPerformanceLog] = useState({
    phase1: [],
    phase2: []
  });

  // Local Storage Stats State
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayedDate: null,
    scoreHistory: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('fpd_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStats({
          gamesPlayed: parsed.gamesPlayed || 0,
          totalScore: parsed.totalScore || 0,
          currentStreak: parsed.currentStreak || 0,
          maxStreak: parsed.maxStreak || 0,
          lastPlayedDate: parsed.lastPlayedDate || null,
          scoreHistory: parsed.scoreHistory || []
        });
      } catch (e) {
        console.error('Failed to parse stats:', e);
      }
    }
  }, []);

  const getLocalDateString = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateStatsAfterCompletion = (finalScore) => {
    const today = getLocalDateString(0);
    const yesterday = getLocalDateString(-1);
    
    let newStreak = stats.currentStreak || 0;
    
    if (stats.lastPlayedDate === yesterday) {
      newStreak += 1;
    } else if (stats.lastPlayedDate === today) {
      // Played today already, keep streak at current value (do not double-increment)
    } else {
      newStreak = 1;
    }
    
    const newMaxStreak = Math.max(stats.maxStreak || 0, newStreak);
    const updated = {
      gamesPlayed: (stats.gamesPlayed || 0) + 1,
      totalScore: (stats.totalScore || 0) + finalScore,
      currentStreak: newStreak,
      maxStreak: newMaxStreak,
      lastPlayedDate: today,
      scoreHistory: [...(stats.scoreHistory || []), finalScore]
    };
    
    setStats(updated);
    localStorage.setItem('fpd_stats', JSON.stringify(updated));
  };

  // Listen to PWA installation events
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Fetch live daily news when selectedCategory changes
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setApiError(false);
    
    const seenP2 = localStorage.getItem('fpd_seen_p2') || '[]';
    
    fetch(`/api/daily-news?category=${selectedCategory}&seenP2=${encodeURIComponent(seenP2)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (active) {
          setGameData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`[PWA] Live daily-news API offline or unreachable for category: ${selectedCategory}. Loading local draft:`, err);
        if (active) {
          setGameData(DAILY_GAME_DATA);
          setApiError(true);
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedCategory]);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the installation');
      }
      setDeferredPrompt(null);
    });
  };

  const resetGame = () => {
    setGlobalScore(0);
    setPerformanceLog({ phase1: [], phase2: [] });
    setPlayedCategories([]);
    setCurrentScreen('HUB');
  };

  const handlePhase1StoryComplete = (scoreAwarded, status, isLast) => {
    setGlobalScore(prev => prev + scoreAwarded);
    setPerformanceLog(prev => ({
      ...prev,
      phase1: [...prev.phase1, status]
    }));

    if (isLast) {
      setCurrentScreen('CATEGORY_TRANSITION');
    }
  };

  const handlePhase2ChoiceComplete = (scoreAwarded, status) => {
    setGlobalScore(prev => prev + scoreAwarded);
    setPerformanceLog(prev => ({
      ...prev,
      phase2: [...prev.phase2, status]
    }));
  };

  const handleAwardLexiconPoints = (pts) => {
    setGlobalScore(prev => {
      const newScore = prev + pts;
      setStats(old => {
        const updated = {
          ...old,
          totalScore: (old.totalScore || 0) + pts
        };
        localStorage.setItem('fpd_stats', JSON.stringify(updated));
        return updated;
      });
      return newScore;
    });
  };

  const handlePhase2Complete = () => {
    updateStatsAfterCompletion(globalScore);
    try {
      const seenP2 = JSON.parse(localStorage.getItem('fpd_seen_p2') || '[]');
      const currentHeadlines = phase2Data.map(item => item.headline);
      const updatedSeen = Array.from(new Set([...seenP2, ...currentHeadlines]));
      localStorage.setItem('fpd_seen_p2', JSON.stringify(updatedSeen));
    } catch (e) {
      console.warn('Failed to save seen Fact/Fiction stories:', e);
    }
    setCurrentScreen('SUMMARY');
  };

  // Render Loader if data is not yet fetched
  if (isLoading) {
    return (
      <div className={`fp-container ${isDarkMode ? 'fp-dark-mode' : ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="fp-press-loader"></div>
          <h2 className="fp-title-serif" style={{ marginTop: '1.5rem', letterSpacing: '0.05em' }}>
            PRINTERS ACTIVE...
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Compiling yesterday's wire updates and auditing files.
          </p>
        </div>
      </div>
    );
  }

  const dateString = gameData?.dateString || "Daily Draft";
  const phase1Data = gameData?.phase1 || [];
  const phase2Data = gameData?.phase2 || [];

  return (
    <div className={`fp-container ${isDarkMode ? 'fp-dark-mode' : ''}`}>
      <NewspaperHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} dateString={dateString} />

      {apiError && (
        <div className="fp-offline-banner">
          📡 Offline Mode: Displaying cached/draft edition.
        </div>
      )}

      {currentScreen === 'HUB' && (
        <HubScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={() => {
            setPlayedCategories([selectedCategory]);
            setCurrentScreen('PHASE_1');
          }}
          onInstall={handleInstallClick}
          showInstallBtn={!!deferredPrompt}
          stats={stats}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {currentScreen === 'PHASE_1' && (
        <WireFeedScreen
          difficulty={difficulty}
          phase1Data={phase1Data}
          onStoryComplete={handlePhase1StoryComplete}
        />
      )}

      {currentScreen === 'CATEGORY_TRANSITION' && (
        <CategoryTransitionScreen
          playedCategories={playedCategories}
          globalScore={globalScore}
          onSelectCategory={(cat) => {
            setPlayedCategories(prev => [...prev, cat]);
            setSelectedCategory(cat);
            setCurrentScreen('PHASE_1');
          }}
          onProceed={() => setCurrentScreen('PHASE_2')}
        />
      )}

      {currentScreen === 'PHASE_2' && (
        <AuditScreen
          phase2Data={phase2Data}
          onChoiceComplete={handlePhase2ChoiceComplete}
          onPhaseComplete={handlePhase2Complete}
        />
      )}

      {currentScreen === 'SUMMARY' && (
        <SummaryScreen
          dateString={dateString}
          globalScore={globalScore}
          performanceLog={performanceLog}
          onReset={resetGame}
          stats={stats}
          setSelectedCategory={setSelectedCategory}
          playedCategories={playedCategories}
          onLaunchLexicon={() => setCurrentScreen('VOCABULARY_GAME')}
        />
      )}

      {currentScreen === 'VOCABULARY_GAME' && (
        <VocabularyGameScreen
          onExit={() => setCurrentScreen('SUMMARY')}
          onAwardPoints={handleAwardLexiconPoints}
        />
      )}
    </div>
  );
}
