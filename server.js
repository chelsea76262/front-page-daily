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
    category: "Global News",
    headlineTemplate: "HUMANITARIAN CRISIS DEEPENS IN ______ AS AID CONVOYS ENCOUNTER INTENSE RESISTANCE",
    targetWord: "YEMEN",
    scrambled: "NMYEE",
    definition: "A country in Western Asia, at the southern end of the Arabian Peninsula.",
    wireSnippet: "Distributing food and medical supplies has become highly dangerous. Local humanitarian networks reported blocked trade ports and highway security incidents.",
    wordBank: ["YEMEN", "SUDAN", "SOMALIA", "SYRIA", "LIBYA"]
  },
  {
    id: 3,
    category: "Global News",
    headlineTemplate: "UNITED NATIONS ASSEMBLES EMERGENCY CONVENTION ON TRANS-NATIONAL ______ POLICIES",
    targetWord: "BORDER",
    scrambled: "DRERBO",
    definition: "A line separating two political or geographical areas, especially countries.",
    wireSnippet: "Delegates from over forty nations will meet in Geneva next week. The agenda focuses on standardizing asylum request flows and reducing maritime friction.",
    wordBank: ["BORDER", "TARIFF", "DEFENSE", "TRAVEL", "SECURITY"]
  },
  {
    id: 4,
    category: "Global News",
    headlineTemplate: "DIPLOMATS ANNOUNCE COORDINATED ECONOMIC ______ AGAINST REBEL FORCES EXPORT ASSETS",
    targetWord: "SANCTIONS",
    scrambled: "NNSCSAOIT",
    definition: "A threatened penalty for disobeying a law or rule, especially trade restrictions.",
    wireSnippet: "The allied coalition has frozen overseas bank accounts linked to military procurement. New restrictions target regional steel production and raw fuel logistics.",
    wordBank: ["SANCTIONS", "COMMERCE", "EMBARGO", "TARIFFS", "PENALTIES"]
  },
  {
    id: 5,
    category: "Global News",
    headlineTemplate: "PRIME MINISTER CALLS FOR AN IMMEDIATE NATIONWIDE ______ AHEAD OF SCHEDULED TALKS",
    targetWord: "ELECTION",
    scrambled: "TEONCLIE",
    definition: "A formal and organized choice by vote of a person for a political office.",
    wireSnippet: "A snap parliamentary ballot has been projected for early autumn. Opposing coalitions have already launched candidate campaigns in key swing districts.",
    wordBank: ["ELECTION", "COALITION", "REFUND", "DISPUTE", "CAMPAIGN"]
  }
];

const FALLBACK_POPCULTURE = [
  {
    id: 1,
    category: "Pop Culture",
    headlineTemplate: "STEVEN SPIELBERG REVEALS PLANS FOR LATEST ______ EPIC AFTER DRAMATIC STUDIO BIDDING WAR",
    targetWord: "HOLLYWOOD",
    scrambled: "DOWYHOOLL",
    definition: "A neighborhood in Los Angeles, California, synonymous with the American film industry.",
    wireSnippet: "The visionary filmmaker Steven Spielberg announced his highly anticipated sci-fi project today in Los Angeles. Universal and Warner Bros. fought for the rights before a record-breaking deal was signed.",
    wordBank: ["HOLLYWOOD", "BROADWAY", "SUNDANCE", "FESTIVAL", "CANNES"]
  },
  {
    id: 2,
    category: "Pop Culture",
    headlineTemplate: "TAYLOR SWIFT DOMINATES THE ______ NOMINATIONS WITH SIX CATEGORY RECOGNITIONS",
    targetWord: "GRAMMYS",
    scrambled: "YSMGRMA",
    definition: "An award presented by the Recording Academy to recognize outstanding achievement in the music industry.",
    wireSnippet: "The Recording Academy released the list of nominees this morning in New York. The chart-topping singer Taylor Swift is poised to sweep the major Grammy awards next month after her massive stadium tour success.",
    wordBank: ["GRAMMYS", "OSCARS", "EMMYS", "TONYS", "BAFTAS"]
  },
  {
    id: 3,
    category: "Pop Culture",
    headlineTemplate: "MARVELS AVENGERS BLOCKBUSTER BREAKS ALL-TIME ______ OFFICE RECORDS IN OPENING WEEKEND",
    targetWord: "BOX",
    scrambled: "XO",
    definition: "A container or device, or a reference to theater ticket sales.",
    wireSnippet: "The latest Marvel comic book adaptation generated over $200 million domestically this weekend. Theater chains report unprecedented attendance and sold-out showings nationwide.",
    wordBank: ["BOX", "TICKET", "SCREEN", "STAGE", "PRESS"]
  },
  {
    id: 4,
    category: "Pop Culture",
    headlineTemplate: "FOO FIGHTERS ANNOUNCE GLOBAL CO-HEADLINING ______ TOUR DISMISSING RUMORS",
    targetWord: "STADIUM",
    scrambled: "MDIUTSA",
    definition: "A large closed area of land used for sports or musical performances.",
    wireSnippet: "Rock veterans Dave Grohl and the Foo Fighters surprised fans with a 40-city stadium route announcement today. Representatives confirmed that recent internal disputes have been fully resolved.",
    wordBank: ["STADIUM", "THEATER", "FESTIVAL", "REUNION", "RELEASE"]
  },
  {
    id: 5,
    category: "Pop Culture",
    headlineTemplate: "RIHANNA FENTY FASHION LINE COLLAPSES AFTER HIGH-PROFILE DESIGNS GO ______ ON SOCIALS",
    targetWord: "VIRAL",
    scrambled: "LRIVA",
    definition: "Image, video, piece of information, etc., that is circulated rapidly and widely from one internet user to another.",
    wireSnippet: "Rihanna's luxury Fenty collection received intense criticism for lack of original styling. Memes and parodies spread across TikTok and Instagram within hours of the Paris runway reveal.",
    wordBank: ["VIRAL", "TRENDY", "CLONE", "FAMOUS", "ONLINE"]
  }
];

const FALLBACK_SPORTS = [
  {
    id: 1,
    category: "Sports",
    headlineTemplate: "KANSAS CITY CHIEFS SECURE HISTORIC PLAYOFF WIN IN EXTRA ______ TIME",
    targetWord: "PLAYOFF",
    scrambled: "FYOPFAL",
    definition: "An additional game, match, or series played to determine a winner.",
    wireSnippet: "Patrick Mahomes threw a late touchdown pass in extra time today to seal the Chiefs' historic victory in Kansas City. The stadium erupted as the Chiefs lifted the Lamar Hunt trophy.",
    wordBank: ["PLAYOFF", "TIMEOUT", "HALFTIME", "QUARTER", "FINALS"]
  },
  {
    id: 2,
    category: "Sports",
    headlineTemplate: "SIMONE BILES PREPARES FOR PARIS ______ INDOOR GYMNASTIC HEATS AND FINALS",
    targetWord: "OLYMPICS",
    scrambled: "LPOIMSICY",
    definition: "A modern international sports event held every four years, with Summer and Winter games.",
    wireSnippet: "American gymnast Simone Biles checked into the athlete village in Paris this week. Team USA medical and coaching groups report full readiness for the opening ceremony heats.",
    wordBank: ["OLYMPICS", "ATHLETICS", "MARATHON", "TRIATHLON", "REGATTA"]
  },
  {
    id: 3,
    category: "Sports",
    headlineTemplate: "PATRICK MAHOMES SIGNS RECORD-BREAKING FIVE-YEAR CHIEFS ______ WORTH $250 MILLION",
    targetWord: "CONTRACT",
    scrambled: "TORTCNAC",
    definition: "A written or spoken agreement, especially one concerning employment, sales, or tenancy.",
    wireSnippet: "The Kansas City Chiefs franchise secured quarterback Patrick Mahomes long-term today. The blockbuster deal includes full guarantees and signing bonuses that reset the NFL market.",
    wordBank: ["CONTRACT", "EXTENSION", "TRANSFER", "SALARY", "RELEASE"]
  },
  {
    id: 4,
    category: "Sports",
    headlineTemplate: "LANCE ARMSTRONG STRIPPED OF MEDALS FOLLOWING DOPING ______ DISCLOSURES",
    targetWord: "DOPING",
    scrambled: "GPNODI",
    definition: "The administration of drugs to an athlete to improve their performance.",
    wireSnippet: "Cycling regulators stripped Lance Armstrong of his titles following revealing disclosures in anti-doping audits. Re-tested biological samples from previous races revealed trace amounts of banned steroids.",
    wordBank: ["DOPING", "TESTING", "MEDICAL", "ROSTER", "RECORD"]
  },
  {
    id: 5,
    category: "Sports",
    headlineTemplate: "LEWIS HAMILTON DOMINATES THE RAIN-SLICKED MONACO ______ START TO FINISH",
    targetWord: "GRAND",
    scrambled: "AGRND",
    definition: "Magnificent and imposing in appearance, size, or style; or part of a major race name.",
    wireSnippet: "Mercedes driver Lewis Hamilton executed a perfect tire strategy to win the Monaco Grand Prix today. The reigning champion led all 78 laps in challenging wet-weather conditions.",
    wordBank: ["GRAND", "CIRCUIT", "TROPHY", "PODIUM", "CHALLENGE"]
  }
];

const FALLBACK_TECHNOLOGY = [
  {
    id: 1,
    category: "AI Technology",
    headlineTemplate: "OPENAI DEVELOP BIO-COMPATIBLE CHIP SET THAT INTEGRATES WITH LIVING ______ TISSUE",
    targetWord: "SILICON",
    scrambled: "NILOSCI",
    definition: "A chemical element used widely in semiconductor devices and microchips.",
    wireSnippet: "OpenAI's San Francisco team announced a bio-hybrid neural chip interface today. Microscopic silicon electrodes successfully monitored brain signals without triggering immune responses.",
    wordBank: ["SILICON", "GRAPHENE", "POLYMER", "METALLIC", "CELLULAR"]
  },
  {
    id: 2,
    category: "AI Technology",
    headlineTemplate: "GOOGLE CEO SUNDAR PICHAI ANNOUNCES CHATBOT INTEGRATED WITH DYNAMIC ______ AGENTS",
    targetWord: "ARTIFICIAL",
    scrambled: "TAFCIARILI",
    definition: "Made or produced by human beings rather than occurring naturally, typically as a copy of something natural.",
    wireSnippet: "Google CEO Sundar Pichai announced new artificial conversational agents this week. The updated speech engine produces human-like inflection and conversational pauses.",
    wordBank: ["ARTIFICIAL", "SYNTHETIC", "VIRTUAL", "AUTOMATED", "ROBOTIC"]
  },
  {
    id: 3,
    category: "AI Technology",
    headlineTemplate: "IBM QUANTUM COMPUTER SHATTERS TRADITIONAL ______ ENCRYPTION PROTOCOLS IN SECONDS",
    targetWord: "SECURITY",
    scrambled: "TCYERUSI",
    definition: "The state of being free from danger or threat; or protection of digital assets.",
    wireSnippet: "IBM cybersecurity scientists issued warning reports today. Their new 1000-qubit quantum processor cracked the security protocols protecting global bank servers in under four seconds.",
    wordBank: ["SECURITY", "PASSWORD", "DATABASE", "FIREWALL", "NETWORK"]
  },
  {
    id: 4,
    category: "AI Technology",
    headlineTemplate: "NASA ASTRONOMERS INTERCEPT REPETITIVE FAST RADIO ______ ORIGINATING IN DEEP SPACE",
    targetWord: "BURSTS",
    scrambled: "SRTSUB",
    definition: "An instance of breaking open or flying apart suddenly; or short signals.",
    wireSnippet: "NASA astronomers intercepted repeating fast radio bursts originating in deep space this week. The signal repeats every 16 days, pointing to a highly magnetized star.",
    wordBank: ["BURSTS", "WAVES", "ECHOES", "PULSES", "BEAMS"]
  },
  {
    id: 5,
    category: "AI Technology",
    headlineTemplate: "TESLA MOTORS DEPLOYS SOLID-STATE ______ CHIPS WITH 800-MILE RANGE",
    targetWord: "BATTERY",
    scrambled: "TTEYBAM",
    definition: "A container consisting of one or more cells, in which chemical energy is converted into electricity and used as a source of power.",
    wireSnippet: "Elon Musk and Tesla Motors deployed a new solid-state battery chemistry for electric vehicles today. Mass production is set to break ground in Ohio to double the range of modern cars.",
    wordBank: ["BATTERY", "CHARGER", "MOTOR", "ENGINE", "TURBINE"]
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
    headline: "In 2007, a company of Swiss Swiss soldiers armed with assault rifles accidentally invaded the neighboring country of Liechtenstein during a midnight march in a rainstorm.",
    isFact: true,
    revealText: "FACT! A Swiss infantry unit got lost in the dark and marched 1.2 miles into Liechtenstein. The Swiss army apologized, and Liechtenstein officials joked they didn't notice the invasion.",
    tagline: "🇨🇭 Swiss Precision at Its Finest."
  },
  {
    category: "Science / Tech",
    headline: "Because of thermal expansion during hot summer months, the Eiffel Tower can grow up to 15 centimeters (6 inches) taller than its winter height.",
    isFact: true,
    revealText: "FACT! As iron absorbs heat, it expands. This thermal expansion causes the Eiffel Tower to grow taller in the summer and tilt slightly away from the sun.",
    tagline: "🗼 Eiffel Tower summer growth spurt!"
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
  },
  {
    category: "Animals / Politics",
    headline: "In 1997, a historic town in Alaska elected a cat named Stubbs as its honorary mayor, who successfully held office for 20 years.",
    isFact: true,
    revealText: "FACT! Stubbs the cat was the honorary mayor of Talkeetna, Alaska. He was a major tourist attraction and famously drank catnip-laced water out of wine glasses daily.",
    tagline: "🐱 Mayor Stubbs at your service!"
  },
  {
    category: "Geography / Fun",
    headline: "The country of Colombia has a themed amusement park built on a former drug lord's estate, where wild African hippos roam freely in the lakes.",
    isFact: true,
    revealText: "FACT! Hacienda Nápoles, formerly owned by Pablo Escobar, was converted into a theme park. The hippos he originally imported escaped, multiplied, and now live in the local waterways.",
    tagline: "🦛 Hippos on holiday!"
  },
  {
    category: "Nature / Travel",
    headline: "To reduce municipal tourist confusion, the city of Venice, Italy, trained a squad of service ducks to guide lost gondoliers through the canals at night.",
    isFact: false,
    revealText: "FICTION! Venice does not use service ducks for canal navigation. While Venice has plenty of waterfowl, gondoliers rely on their own stellar memory and GPS.",
    tagline: "🦆 A quack navigation myth."
  },
  {
    category: "Wildlife / Funny",
    headline: "Responding to emergency calls about a 'screaming woman' in the woods, New Hampshire police discovered a very loud goat protesting for its breakfast.",
    isFact: true,
    revealText: "FACT! Responding officers searched the woods and found a goat tied to a fence, screaming at the top of its lungs because its morning feed was running late.",
    tagline: "🐐 Yelling for pancakes."
  },
  {
    category: "Pop Culture / Records",
    headline: "A teenager legally changed his name to 'Captain Fantastic Faster Than A Speeding Bullet Colder Than Ice' to beat a record, causing his grandmother to refuse to speak to him.",
    isFact: true,
    revealText: "FACT! George Garratt, 19, changed his name to the 19-word superhero title in 2008. His grandmother found it so ridiculous she stopped talking to him.",
    tagline: "🦸‍♂️ Captain Grandson."
  },
  {
    category: "Animals / Science",
    headline: "A group of dairy farmers in Scotland successfully trained their cows to moo with a French accent after playing classical French music for a year.",
    isFact: false,
    revealText: "FICTION! Cows cannot be taught accents or foreign languages, though scientists joke that herds have slightly different vocal ranges depending on their regions.",
    tagline: "🐮 Le Moo."
  },
  {
    category: "Design / Pop Culture",
    headline: "An artist group in Sweden built a miniature shopping street designed exclusively for mice, complete with a tiny record shop, bakery, and cinema.",
    isFact: true,
    revealText: "FACT! An artist collective called AnonyMouse built highly detailed, street-level mouse installations in Malmö, Sweden, showcasing tiny menus and movie posters.",
    tagline: "🐭 Shopping for cheese!"
  },
  {
    category: "Safety / Community",
    headline: "The town of Churchill, Manitoba, enforces a rule requiring residents to leave their car doors unlocked to serve as emergency shelters for pedestrians escaping polar bears.",
    isFact: true,
    revealText: "FACT! Churchill is in polar bear country. Unlocked car doors are a community safety measure to ensure pedestrians always have a quick place to hide.",
    tagline: "🐻 Bear-proof backup plans."
  },
  {
    category: "Folklore / Tech",
    headline: "The government of Iceland employs a full-time 'Elf Whisperer' to negotiate road construction routes with hidden elf spirits.",
    isFact: false,
    revealText: "FICTION! While Iceland has a road construction policy that respects traditional elf heritage sites, they do not have a formal government role called 'Elf Whisperer'.",
    tagline: "🧝‍♂️ Spirit of construction."
  },
  {
    category: "Science / Music",
    headline: "A study confirmed that dairy cows produce 3% more milk when listening to relaxing classical music like Beethoven's 'Pastoral Symphony'.",
    isFact: true,
    revealText: "FACT! Research by the University of Leicester found that relaxing classical music reduces stress in cows, which physically triggers higher milk yields.",
    tagline: "🎼 Symphony of the cows."
  },
  {
    category: "Nature / Animals",
    headline: "Wombat feces are cube-shaped, which naturally prevents them from rolling away and allows wombats to stack them to mark territory.",
    isFact: true,
    revealText: "FACT! Wombats are the only known animals that produce cube-shaped feces. The flat sides of the cubes prevent the droppings from rolling off rocks and logs.",
    tagline: "💩 Architectural digestion."
  },
  {
    category: "Animals / Biology",
    headline: "Sea otters hold hands while sleeping to recharge their internal static electricity grids and stay warm.",
    isFact: false,
    revealText: "FICTION! Sea otters hold hands (a behavior called 'rafting') to keep from drifting apart in the water current while asleep, not for electrical recharging!",
    tagline: "🦦 Floating hand-in-hand."
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
function decodeHtmlEntities(text) {
  if (!text) return "";
  return text
    .replace(/&amp;#8217;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&amp;#8216;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&amp;amp;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');
}

function synthesizeArticle(title, description) {
  let decodedTitle = decodeHtmlEntities(title);
  let decodedDesc = decodeHtmlEntities(description);

  // 1. Strip publisher names (trademark safety)
  const newsOrgsRegex = /\b(BBC|AP|Reuters|Associated Press|CNN|Bloomberg|Fox|Guardian|New York Times|NYT|TMZ|US Weekly|Us Weekly|US Magazine|Yahoo|TechCrunch|Wired|People Magazine)\b/gi;
  
  let cleanTitle = decodedTitle.replace(newsOrgsRegex, "Global Agency");
  let cleanDesc = decodedDesc.replace(newsOrgsRegex, "reputable correspondents");

  // Replace standalone "Us" refers to the magazine
  cleanTitle = cleanTitle.replace(/\bUs\b/g, "reputable journalists");
  cleanDesc = cleanDesc.replace(/\bUs\b/g, "reputable journalists");

  // 2. Perform general entities replacement for common political/public names (copyright & brand safety)
  const entityReplacements = [
    { regex: /\bBiden\b/gi, replacement: "The President" },
    { regex: /\bHarris\b/gi, replacement: "The Vice President" },
    { regex: /\bTrump\b/gi, replacement: "President Trump" },
    { regex: /\bStarmer\b/gi, replacement: "The Prime Minister" },
    { regex: /\bSunak\b/gi, replacement: "The Leader" },
    { regex: /\bZelensky\b/gi, replacement: "The Foreign Leader" },
    { regex: /\bNetanyahu\b/gi, replacement: "The Representative" },
    { regex: /\bMacron\b/gi, replacement: "The Chief Executive" },
    { regex: /\bPutin\b/gi, replacement: "The Sovereign" }
  ];

  for (const item of entityReplacements) {
    cleanTitle = cleanTitle.replace(item.regex, item.replacement);
    cleanDesc = cleanDesc.replace(item.regex, item.replacement);
  }

  return {
    synthesizedTitle: cleanTitle,
    synthesizedDesc: cleanDesc
  };
}

function isDeathRelated(text) {
  const lowercase = text.toLowerCase();
  const deathKeywords = ['kill', 'die', 'dead', 'death', 'fatality', 'murder', 'casualty', 'drown', 'tragedy', 'mourn', 'suicide', 'fatal', 'homicide', 'massacre', 'stabbed', 'shooting', 'blast', 'collision', 'crash'];
  return deathKeywords.some(kw => lowercase.includes(kw));
}

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

function getDailyPhase2(pool, seenHeadlines = []) {
  const date = new Date();
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
  // Seeded selection
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = dateKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Filter pool to exclude already seen headlines
  let availablePool = pool.filter(item => !seenHeadlines.includes(item.headline));
  
  // Fallback if all are seen: reset pool
  if (availablePool.length < 3) {
    availablePool = pool;
  }
  
  const selected = [];
  
  // Pick 3 items using the hash
  for (let j = 0; j < 3; j++) {
    const index = Math.abs(hash + j * 7) % availablePool.length;
    selected.push(availablePool.splice(index, 1)[0]);
  }
  
  return selected.map((item, idx) => ({
    id: idx + 1,
    ...item
  }));
}

// ----------------------------------------------------
// 3. API ENDPOINT ROUTING
// ----------------------------------------------------
app.get('/api/daily-news', async (req, res) => {
  const categoryParam = req.query.category || 'world';
  let seenP2 = [];
  let seenP1 = [];
  
  try {
    if (req.query.seenP2) {
      seenP2 = JSON.parse(req.query.seenP2);
    }
  } catch (e) {
    console.warn('[API] Failed to parse seenP2 param:', e.message);
  }

  try {
    if (req.query.seenP1) {
      seenP1 = JSON.parse(req.query.seenP1);
    }
  } catch (e) {
    console.warn('[API] Failed to parse seenP1 param:', e.message);
  }
  
  let rssUrl = 'http://feeds.bbci.co.uk/news/world/rss.xml';
  let targetFallback = FALLBACK_PHASE1;
  let displayCategory = "Global News";
  
  if (categoryParam === 'popculture') {
    rssUrl = 'https://www.usmagazine.com/feed/';
    targetFallback = FALLBACK_POPCULTURE;
    displayCategory = "Pop Culture";
  } else if (categoryParam === 'sports') {
    rssUrl = 'https://sports.yahoo.com/top/rss.xml';
    targetFallback = FALLBACK_SPORTS;
    displayCategory = "Sports";
  } else if (categoryParam === 'technology') {
    rssUrl = 'https://techcrunch.com/category/artificial-intelligence/feed/';
    targetFallback = FALLBACK_TECHNOLOGY;
    displayCategory = "AI Technology";
  }

  try {
    console.log(`[API] Fetching live headlines from ${categoryParam} RSS Feed: ${rssUrl}`);
    
    // BBC News RSS converted to JSON via free public converter
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
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
    const itemsToProcess = feedData.items.slice(0, 15); // Look at top 15 items to get 5 clean ones
    let deathStoriesCount = 0;
    
    for (const article of itemsToProcess) {
      if (phase1.length >= 5) break;
      
      const title = article.title;
      const desc = article.description || article.content || "Details logged in the morning dispatch.";
      
      // Clean title from basic noise
      if (title.toLowerCase().includes('in pictures') || title.toLowerCase().includes('video:') || title.toLowerCase().includes('pictures:')) {
        continue; 
      }

      // Do not repeat stories from another category
      const targetCheck = extractTargetWord(title);
      if (seenP1.includes(title) || seenP1.includes(targetCheck) || seenP1.some(seen => title.toUpperCase().includes(seen.toUpperCase()))) {
        continue;
      }
      
      // Limit death-related stories to at most one per session
      const isDeath = isDeathRelated(title + " " + desc);
      if (isDeath && deathStoriesCount >= 1) {
        continue;
      }
      
      // Synthesize to be brand-safe & copyright-free (Option 2)
      const { synthesizedTitle, synthesizedDesc } = synthesizeArticle(title, desc);
      
      const target = extractTargetWord(synthesizedTitle);
      if (!target || target.length < 3) continue;
      
      // Create headline template by replacing the target word
      const regex = new RegExp(`\\b${target}\\b`, 'gi');
      const template = synthesizedTitle.toUpperCase().replace(regex, "______");
      
      // Double check that we actually replaced the word (so it was in the title)
      if (!template.includes("______")) continue;
      
      const scrambled = scrambleWord(target);
      const definition = await getDefinition(target);
      const wordBank = generateWordBank(target);
      
      if (isDeath) {
        deathStoriesCount++;
      }
      
      phase1.push({
        id: phase1.length + 1,
        category: displayCategory,
        headlineTemplate: template,
        targetWord: target,
        scrambled: scrambled,
        definition: definition,
        wireSnippet: synthesizedDesc,
        wordBank: wordBank
      });
    }
    
    // If we failed to get 5 live items, fill remaining items with fallback data
    if (phase1.length < 5) {
      console.log(`[API] Live items count below 5 (${phase1.length}). Filling with category fallback items.`);
      const diff = 5 - phase1.length;
      for (let i = 0; i < diff; i++) {
        const fbItem = { ...targetFallback[i] };
        fbItem.id = phase1.length + 1;
        phase1.push(fbItem);
      }
    }
    
    // Pick 3 Phase 2 Fact/Fiction items based on daily calendar seed, excluding seen ones
    const selectedPhase2 = getDailyPhase2(PHASE2_POOL, seenP2);
    
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
    console.error(`[API Error] Live API fetch failed for ${categoryParam}. Serving fallback news portfolio:`, error.message);
    
    const dateString = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    res.json({
      dateString,
      phase1: targetFallback,
      phase2: getDailyPhase2(PHASE2_POOL, seenP2)
    });
  }
});
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('[Server] Diagnostic - __dirname:', __dirname);
console.log('[Server] Diagnostic - Serving static from:', distPath);
console.log('[Server] Diagnostic - Does dist/index.html exist?', fs.existsSync(indexPath));

// Serve the static files from the Vite build directory
app.use(express.static(distPath));

// Fallback: send index.html for all other routes so React Router/PWA works
app.use((req, res) => {
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('[Server Error] Failed to send index.html:', err.message);
      res.status(500).send('System Error: Front Page Daily build files not found. Please verify the build step completed.');
    }
  });
});
app.listen(PORT, () => {
  console.log(`[Server] Front Page Daily API server running on http://localhost:${PORT}`);
});
