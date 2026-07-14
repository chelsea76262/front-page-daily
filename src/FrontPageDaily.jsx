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
    
    const step = Math.max(1, Math.ceil(end / 30));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedScore(start);
    }, 25);

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
    definition: "To deliberately make something obscure, unclear, or unintelligible.",
    distractors: [
      "To reveal a hidden truth or expose a political scandal.",
      "To organize news stories in a logical, chronological order.",
      "To summarize a long article into a brief, easy-to-read headline."
    ]
  },
  {
    word: "Synecdoche",
    definition: "A figure of speech in which a part is made to represent the whole.",
    distractors: [
      "A false statement published to damage a competitor's reputation.",
      "A technical term for a printer jam in historic printing presses.",
      "An anonymous tip received by an investigative journalist."
    ]
  },
  {
    word: "Demagogue",
    definition: "A political leader who seeks support by appealing to popular desires rather than using rational argument.",
    distractors: [
      "A neutral reporter who covers international conflict zones.",
      "A specialized device used to measure editorial page layouts.",
      "An editor who reviews articles exclusively for spelling mistakes."
    ]
  },
  {
    word: "Mercurial",
    definition: "Subject to sudden or unpredictable changes of mood or mind.",
    distractors: [
      "Slow, calculated, and extremely thorough in research.",
      "Having a metallic texture typical of lead-based printing plates.",
      "A type of column layout with equal spacing between columns."
    ]
  },
  {
    word: "Gerrymander",
    definition: "Manipulating boundaries to favor one party or class.",
    distractors: [
      "Approving articles for printing without checking for facts.",
      "Writing dramatic headlines that misrepresent the news content.",
      "A fast-paced type of interview conducted with public officials."
    ]
  },
  {
    word: "Hegemony",
    definition: "Leadership or dominance, especially by one country or social group over others.",
    distractors: [
      "A collaborative union formed by competing news organizations.",
      "A system for dividing editorial roles in a digital newsroom.",
      "A type of printer font popular in late 19th-century tabloids."
    ]
  },
  {
    word: "Spurious",
    definition: "Not being what it purports to be; false or fake.",
    distractors: [
      "Highly creative and engaging in narrative style.",
      "Urgent or requiring immediate publication in the evening edition.",
      "Relating to chemical analysis of printing ink quality."
    ]
  },
  {
    word: "Obsequious",
    definition: "Obedient or attentive to an excessive or servile degree.",
    distractors: [
      "Rude and dismissive toward editorial feedback.",
      "Difficult to read due to outdated printing mechanics.",
      "Highly analytical and objective in investigative reports."
    ]
  },
  {
    word: "Paucity",
    definition: "The presence of something only in small or insufficient quantities; scarcity.",
    distractors: [
      "An abundance of sources confirming a news story.",
      "The fast processing of print files on a layout machine.",
      "A legal document protecting a journalist's source identity."
    ]
  },
  {
    word: "Sycophant",
    definition: "A person who acts obsequiously toward someone important in order to gain advantage; a flatterer.",
    distractors: [
      "An editor who challenges the official government narrative.",
      "A print technician who repairs large newspaper press rollers.",
      "A fictional character created to write satirical reviews."
    ]
  },
  {
    word: "Cacophony",
    definition: "A harsh, discordant mixture of sounds.",
    distractors: [
      "A pleasant and melodic harmony of voices.",
      "The fast click-clack sound of a mechanical typewriter.",
      "A technique for organizing paragraphs in news stories."
    ]
  },
  {
    word: "Recalcitrant",
    definition: "Having an obstinately uncooperative attitude toward authority or discipline.",
    distractors: [
      "Very eager to help and follow editorial style guides.",
      "Relating to old, recycled paper pulp used in newsprint.",
      "Easily broken or torn under minor mechanical stress."
    ]
  },
  {
    word: "Capricious",
    definition: "Given to sudden and unaccountable changes of mood or behavior.",
    distractors: [
      "Steady, reliable, and strictly adhering to deadlines.",
      "Belonging to a traditional style of typography.",
      "Highly logical and systematic in investigative audits."
    ]
  },
  {
    word: "Anachronism",
    definition: "A thing belonging or appropriate to a period other than that in which it exists.",
    distractors: [
      "A modern digital editing tool used on old articles.",
      "A system for measuring the speed of news transmission.",
      "A secret agreement made between reporters and politicians."
    ]
  },
  {
    word: "Superfluous",
    definition: "Unnecessary, especially through being more than enough.",
    distractors: [
      "Extremely important and critical for the front page layout.",
      "Short and concise, fitting perfectly in narrow columns.",
      "Written in an objective, neutral tone without adjectives."
    ]
  },
  {
    word: "Pernicious",
    definition: "Having a harmful effect, especially in a gradual or subtle way.",
    distractors: [
      "Extremely helpful and beneficial to public understanding.",
      "Fast-paced and exciting to read for early morning commuters.",
      "Relating to a style of bold headers in classic papers."
    ]
  },
  {
    word: "Quixotic",
    definition: "Exceedingly idealistic, unrealistic, and impractical.",
    distractors: [
      "Pragmatic, sensible, and focused on immediate results.",
      "Pertaining to a quick response to breaking news alerts.",
      "A type of ink that dries instantly upon printing."
    ]
  },
  {
    word: "Taciturn",
    definition: "Reserved or uncommunicative in speech; saying little.",
    distractors: [
      "Very loud and chatty in busy newsrooms.",
      "Expressing extreme emotion in personal editorial columns.",
      "Pertaining to a type of mechanical typesetting machine."
    ]
  },
  {
    word: "Pugnacious",
    definition: "Eager or quick to argue, quarrel, or fight.",
    distractors: [
      "Gentle, peaceful, and cooperative in team projects.",
      "Relating to the design of funny cartoon illustrations.",
      "Having a sharp, pleasant smell of freshly printed ink."
    ]
  },
  {
    word: "Surreptitious",
    definition: "Kept secret, especially because it would not be approved of.",
    distractors: [
      "Widely broadcast and advertised across public media.",
      "Relating to a official legal decree by the government.",
      "Extremely fast and efficient at generating layout designs."
    ]
  }
];

function VocabularyGameScreen({ onExit }) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  const [wordData, setWordData] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameState, setGameState] = useState('PLAYING');
  
  const loadNextWord = () => {
    const randomWord = VOCABULARY_WORDS[Math.floor(Math.random() * VOCABULARY_WORDS.length)];
    // Fisher-Yates shuffle array
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
  };

  useEffect(() => {
    loadNextWord();
  }, []);

  const handleOptionClick = (option) => {
    if (gameState !== 'PLAYING') return;
    setSelectedOption(option);
    setGameState('ANSWERED');
    
    if (option === wordData.definition) {
      setScore(prev => prev + 50);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

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
          <span style={{ color: 'var(--accent-gold)' }}>SCORE: {score}</span>
          <span style={{ color: 'var(--accent-blue)' }}>STREAK: 🔥 {streak} (Max: {maxStreak})</span>
        </div>
      </div>

      <div style={{ margin: '1.5rem 0' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
          EDITOR'S LEXICON (ENDLESS)
        </span>
        <h2 className="fp-title-serif" style={{ fontSize: '2.2rem', letterSpacing: '0.02em', margin: '0.5rem 0' }}>
          {wordData.word}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Identify the correct journalistic or literary definition below:
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0', textAlign: 'left' }}>
        {options.map((opt) => {
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
          <strong>{isCorrect ? "Correct! 🎉" : "Incorrect. ❌"}</strong> {wordData.word} means: <em>"{wordData.definition}"</em>
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
        />
      )}
    </div>
  );
}
