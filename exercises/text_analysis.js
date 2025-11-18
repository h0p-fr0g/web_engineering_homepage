
const stop_words = [
    "aber", "als", "am", "an", "auch", "auf", "aus", "bei", "bin", "bis", "bist", "da", "dadurch", "daher", "darum", "das", "daß", "dass", "dein", "deine", "dem", "den", "der", "des", "dessen", "deshalb", "die", "dies", "dieser", "dieses", "doch", "dort", "du", "durch", "ein", "eine", "einem", "einen", "einer", "eines", "er", "es", "euer", "eure", "für", "hatte", "hatten", "hattest", "hattet", "hier", "hinter", "ich", "ihr", "ihre", "im", "in", "ist", "ja", "jede", "jedem", "jeden", "jeder", "jedes", "jener", "jenes", "jetzt", "kann", "kannst", "können", "könnt", "machen", "mein", "meine", "mit", "muß", "mußt", "musst", "müssen", "müßt", "nach", "nachdem", "nein", "nicht", "nun", "oder", "seid", "sein", "seine", "sich", "sie", "sind", "soll", "sollen", "sollst", "sollt", "sonst", "soweit", "sowie", "und", "unser", "unsere", "unter", "vom", "von", "vor", "wann", "warum", "was", "weiter", "weitere", "wenn", "wer", "werde", "werden", "werdet", "weshalb", "wie", "wieder", "wieso", "wir", "wird", "wirst", "wo", "woher", "wohin", "zu", "zum", "zur", "über"
];

const response = await fetch("https://kaul.inf.h-brs.de/ccm/we/ws25/resources/assets/Plagiatsresolution.html");

const text = await response.text();


const words = text
    .replace(/<[^>]*>/g, '')  // filter HTML-Tags
    .toLowerCase()            // lowercase
    .split(/\s+/)             // split after spaces


const filteredWords = words.filter(word => !stop_words.includes(word));


const wordCount = filteredWords.reduce((accumulator, word) => {
    accumulator[word] = (accumulator[word] || 0) + 1;
    return accumulator;
}, {});


const topTerms = Object.entries(wordCount) 
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([word, count]) => ({ term: word, count: count }));


console.log("Result(Top 3 Words):");
console.log(topTerms);