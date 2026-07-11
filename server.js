import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// 1. DATA STORES & FALLBACK DATABASE
// ----------------------------------------------------
const FALLBACK_PHASE1 = [
  {
    id: 1,
    category: "Global News",
    headlineTemplate: "U.S. LAUNCHES RETALIATORY AIR STRIKES AGAINST ______ AS CEASEFIRE COLLAPSES",
    targetWord: "IRAN",
    scrambled: "ANRI",
    definition: "A sovereign country in Western Asia, bordered by Iraq and Turkey.",
    wireSnippet: "Hostilities have resumed in the Middle East. High-level commands confirmed that the recent maritime ceasefire is now over following repeated drone attacks on commercial vessels by Tehran's proxy forces.",
    wordBank: ["JORDAN", "IRAN", "UNITED STATES", "UKRAINE", "BAHRAIN"]
  },
  {
    id: 2,
    category: "Science & Tech",
    headlineTemplate: "SCIENTISTS USE AI TO MAP NEW ______ WITH ZERO COGNITIVE RESISTANCE PARADIGM",
    targetWord: "MATERIALS",
    scrambled: "LMAETIRAS",
    definition: "Substances or components used to build or manufacture products.",
    wireSnippet: "Materials research reached a historic milestone this morning. Computational neural networks successfully projected two structural configurations optimized for lossless electrical grids.",
    wordBank: ["MATERIALS", "BATTERIES", "ALGORITHMS", "SATELLITES", "POLYMERS"]
  },
  {
    id: 3,
    category: "Finance & Business",
    headlineTemplate: "GLOBAL CHIP SUPPLY SURGES BY 40% AS NEW ______ FACTORIES REACH PEAK OUTPUT",
    targetWord: "SEMICONDUCTOR",
    scrambled: "CMITRSDNEUCOO",
    definition: "A solid substance that has a conductivity between that of an insulator and that of most metals.",
    wireSnippet: "Tech manufacturers are reporting record-high inventories this quarter. The massive semiconductor fabrication complexes in Phoenix and Hsinchu have exceeded projections.",
    wordBank: ["SEMICONDUCTOR", "AUTOMOTIVE", "LITHOGRAPH", "TELECOM", "AEROSPACE"]
  },
  {
    id: 4,
    category: "Climate & Enviro",
    headlineTemplate: "AMAZON RAINFOREST SEEKS LEGAL PERSONHOOD STATUS TO BLANKET STATE FROM ______",
    targetWord: "DEFORESTATION",
    scrambled: "FROTSITADENEO",
    definition: "The action of clearing a wide area of trees.",
    wireSnippet: "Environmental advocates filed a landmark petition in Brazil's high courts. They argue that declaring the forest a legal entity will automatically criminalize illegal logging and land clearing.",
    wordBank: ["DEFORESTATION", "AGRICULTURE", "DEVELOPMENT", "URBANIZATION", "POLLUTION"]
  },
  {
    id: 5,
    category: "Health & Biotech",
    headlineTemplate: "NEW LAB-GROWN INTERFERON INJECTIONS REVERSE AGE-RELATED ______ IN CLINICAL TRIALS",
    targetWord: "BLINDNESS",
    scrambled: "LNESBNDIS",
    definition: "The state or condition of being unable to see due to physiological or neurological factors.",
    wireSnippet: "A breakthrough cellular therapy has restored vision in aging canines. The treatment targets macular degeneration by regenerating photoreceptor cells directly in the retina.",
    wordBank: ["BLINDNESS", "DEAFNESS", "DEMENTIA", "ARTHRITIS", "DIABETES"]
  }
];

const PHASE2_POOL = [
  {
    category: "Culture / Art",
    headline: "A museum in the Netherlands honors a late artist by completely covering its main gallery floor in enough peanut butter to make 15,000 sandwiches.",
    isFact: true,
    revealText: "FACT! The Museum Boijmans Van Beuningen in Rotterdam faithfully recreated Wim T. Schippers' 1962 installation 'Pindakaasvloer' using 800 pounds of smooth peanut butter.",
    tagline: "🥜 Spread the news!"
  },
  {
    category: "Science / Space",
    headline: "NASA's Voyager 1 probe accidentally intercepts an active automated data stream originating from an unmapped alien satellite orbiting Saturn's moon, Titan.",
    isFact: false,
    revealText: "FICTION! While Voyager 1 has experienced real telemetry anomalies recently, it hasn't intercepted any extraterrestrial broadcasts over Saturn. Yet.",
    tagline: "🛸 Pure Science Fiction."
  },
  {
    category: "Wildlife / Sports",
    headline: "Australian officials ask tourists to respect the privacy of 'Neil'—a local, one-ton wild elephant seal who respects absolutely nothing and keeps crushing parking lot bollards.",
    isFact: true,
    revealText: "FACT! Neil the Seal is a 2,200-pound southern elephant seal in Tasmania who routinely wanders into coastal towns, blocks traffic, and fights parking lot barriers.",
    tagline: "🦭 Heavyweight Champion of Tasmania."
  },
  {
    category: "History / Military",
    headline: "In 2007, a company of Swiss soldiers armed with assault rifles accidentally invaded the neighboring country of Liechtenstein during a midnight march in a rainstorm.",
    isFact: true,
    revealText: "FACT! A Swiss infantry unit got lost in the dark and marched 1.2 miles into Liechtenstein. The Swiss army apologized, and Liechtenstein officials joked they didn't notice the invasion.",
    tagline: "🇨🇭 Swiss Precision at Its Finest."
  },
  {
    category: "Science / Tech",
    headline: "Because of thermal expansion during hot summer months, the Eiffel Tower can grow up to 15 centimeters (6 inches) taller than its winter height.",
    isFact: true,
    revealText: "FACT! As iron absorbs heat, it expands. This thermal expansion causes the Eiffel Tower to grow taller in the summer and tilt slightly away from the sun.",
    tagline: "🗼 Summer growth spurt!"
  },
  {
    category: "Conspiracy / Satire",
    headline: "An activist group files a lawsuit revealing that the U.S. government replaced all birds with advanced surveillance drones in 1959.",
    isFact: false,
    revealText: "FICTION! The 'Birds Aren't Real' movement is a satirical parody created by Peter McIndoe in 2017 to mock misinformation, though some online believers took it seriously.",
    tagline: "🐦 Feathered Surveillance Satire."
  },
  {
    category: "Space / Archaeology",
    headline: "NASA engineers locate a lost Soviet lunar lander on Mars using historical radio coordinates from 1973.",
    isFact: false,
    revealText: "FICTION! The Soviet Union's lunar landers were sent to the Moon, not Mars. While NASA has imaged old Mars landers, none were found using lunar telemetry.",
    tagline: "🛰️ Telemetry Translation Error."
  },
  {
    category: "Nature / Forestry",
    headline: "Scientists in Sweden discover a Norway Spruce tree whose root system has been continuously growing for over 9,500 years.",
    isFact: true,
    revealText: "FACT! 'Old Tjikko' in Sweden is a clonal tree that has kept itself alive by growing new trunks from the same root system for 9,550 years, making it the oldest clone tree.",
    tagline: "🌲 Rooted in prehistory."
  }
];

const STOPWORDS = new Set([
  'THE', 'AND', 'FOR', 'THAT', 'WITH', 'THIS', 'FROM', 'THEY', 'YOUR', 'THEIR', 'ABOUT',
  'AFTER', 'UNDER', 'ABOVE', 'BEFORE', 'DURING', 'WILL', 'HAVE', 'BEEN', 'WERE', 'ALSO',
  'INTO', 'OVER', 'MORE', 'SOME', 'WHAT', 'WHEN', 'WHERE', 'WHO', 'WHICH', 'WHY', 'HOW',
  'COULD', 'WOULD', 'SHOULD', 'THEM', 'DONT', 'SAYS', 'SAID', 'HERE', 'THEIRS', 'THESE',
  'THOSE', 'EACH', 'SOME', 'MANY', 'OVER', 'DOWN', 'BACK', 'THROUGH', 'AGAINST'
]);

const WORDBANK_POOL = [
  "MILITARY", "CONGRESS", "SECURITY", "CONFLICT", "ALLIANCE", "INDUSTRY", "ECONOMY",
  "CRISIS", "JUSTICE", "ELECTION", "PRESIDENT", "REPORTER", "PROTEST", "OFFICIAL",
  "BORDER", "CLIMATE", "SANCTION", "FACTORY", "NETWORK", "PLATFORM", "SCIENCE"
];

// ----------------------------------------------------
// 2. HELPER UTILITIES
// ----------------------------------------------------
function extractTargetWord(title) {
  // Strip punctuation and split
  const words = title.toUpperCase().replace(/[^A-Z\s-]/g, '').split(/\s+/);
  
  // Find suitable candidates (4 to 12 characters, not in stopword list)
  const candidates = words.filter(w => w.length >= 4 && w.length <= 11 && !STOPWORDS.has(w));
  
  if (candidates.length > 0) {
    // Return candidate that is closest to the middle of the title for contextual puzzle flow
    return candidates[Math.floor(candidates.length / 2)];
  }
  
  // Fallback to the longest word in the title
  return words.reduce((longest, current) => current.length > longest.length ? current : longest, "NEWS");
}

function scrambleWord(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join('');
  if (scrambled === word && word.length > 1) {
    return word[1] + word[0] + word.slice(2);
  }
  return scrambled;
}

async function getDefinition(word) {
  const fallbacks = {
    'IRAN': "A sovereign country in Western Asia, bordered by Iraq and Turkey.",
    'YEMEN': "A country in Western Asia, at the southern end of the Arabian Peninsula.",
    'RUSSIA': "A transcontinental country spanning Eastern Europe and Northern Asia.",
    'CHINA': "A country in East Asia, the world's second-most populous country.",
    'UKRAINE': "A country in Eastern Europe, bordered by Russia to the east.",
    'TAIWAN': "A democratic island state in East Asia.",
    'LONDON': "The capital and largest city of England and the United Kingdom.",
    'ISRAEL': "A country in Western Asia, on the southeastern shore of the Mediterranean Sea.",
    'GAZA': "A self-governing Palestinian territory on the eastern coast of the Mediterranean Sea.",
    'USA': "The United States of America, a transcontinental country in North America."
  };
  
  if (fallbacks[word]) return fallbacks[word];
  
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    if (res.ok) {
      const data = await res.json();
      const def = data[0]?.meanings[0]?.definitions[0]?.definition;
      if (def) return def;
    }
  } catch (err) {
    // Ignore and fallback silently
  }
  return "A key keyword/entity highlighted in the daily global press wire.";
}

function generateWordBank(target) {
  const choices = new Set([target]);
  // Fill up choices with random words of similar lengths from the pool
  const filteredPool = WORDBANK_POOL.filter(w => w !== target);
  
  while (choices.size < 5 && filteredPool.length > 0) {
    const randomIdx = Math.floor(Math.random() * filteredPool.length);
    choices.add(filteredPool[randomIdx]);
  }
  
  // Convert back to array and shuffle
  const arr = Array.from(choices);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Fisher-Yates array shuffler
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ----------------------------------------------------
// 3. API ENDPOINT ROUTING
// ----------------------------------------------------
app.get('/api/daily-news', async (req, res) => {
  try {
    console.log('[API] Fetching live headlines from BBC RSS Feed');
    
    // BBC World News RSS converted to JSON via free public converter
    const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/world/rss.xml';
    const feedRes = await fetch(feedUrl);
    
    if (!feedRes.ok) {
      throw new Error(`Feed fetch returned status ${feedRes.status}`);
    }
    
    const feedData = await feedRes.json();
    
    if (!feedData.items || feedData.items.length < 5) {
      throw new Error('Insufficient articles in the live feed.');
    }
    
    console.log('[API] Extracting wire templates and compiling definitions');
    const phase1 = [];
    const itemsToProcess = feedData.items.slice(0, 8); // look at top 8 to get 5 clean ones
    
    for (const article of itemsToProcess) {
      if (phase1.length >= 5) break;
      
      const title = article.title;
      const desc = article.description || article.content || "Details logged in the morning dispatch.";
      
      // Clean title from basic noise
      if (title.toLowerCase().includes('in pictures') || title.toLowerCase().includes('video:')) {
        continue; 
      }
      
      const target = extractTargetWord(title);
      if (!target || target.length < 3) continue;
      
      // Create headline template by replacing the target word
      const regex = new RegExp(`\\b${target}\\b`, 'gi');
      const template = title.toUpperCase().replace(regex, "______");
      
      // Double check that we actually replaced the word (so it was in the title)
      if (!template.includes("______")) continue;
      
      const scrambled = scrambleWord(target);
      const definition = await getDefinition(target);
      const wordBank = generateWordBank(target);
      
      phase1.push({
        id: phase1.length + 1,
        category: article.categories?.[0] || "Global News",
        headlineTemplate: template,
        targetWord: target,
        scrambled: scrambled,
        definition: definition,
        wireSnippet: desc,
        wordBank: wordBank
      });
    }
    
    // If we failed to get 5 live items, fill remaining items with fallback data
    if (phase1.length < 5) {
      console.log('[API] Live items count below 5. Filling with fallback items.');
      const diff = 5 - phase1.length;
      for (let i = 0; i < diff; i++) {
        const fbItem = { ...FALLBACK_PHASE1[i] };
        fbItem.id = phase1.length + 1;
        phase1.push(fbItem);
      }
    }
    
    // Shuffle and pick 3 Phase 2 Fact/Fiction items from the pool
    const selectedPhase2 = shuffleArray(PHASE2_POOL).slice(0, 3).map((item, idx) => ({
      id: idx + 1,
      ...item
    }));
    
    const dateString = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    res.json({
      dateString,
      phase1,
      phase2: selectedPhase2
    });
    
  } catch (error) {
    console.error('[API Error] Live API fetch failed. Serving fallback news portfolio:', error.message);
    
    // Complete local fallback payload
    const dateString = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    res.json({
      dateString,
      phase1: FALLBACK_PHASE1,
      phase2: shuffleArray(PHASE2_POOL).slice(0, 3).map((item, idx) => ({
        id: idx + 1,
        ...item
      }))
    });
  }
});
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback: send index.html for all other routes so React Router/PWA works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`[Server] Front Page Daily API server running on http://localhost:${PORT}`);
});
