const deepCopy = (struct) =>

  !struct || typeof struct !== 'object'
    ? struct
    : Array.isArray(struct)
      ? struct.map(deepCopy)
      : Object.fromEntries(
          Object.entries(struct).map(([key, value]) => [key, deepCopy(value)])
        );



    const original = {
        a: 1,
        b: 'hallo',
        c: [2, 3, { d: 4 }],
        e: {
            f: 5,
            g: [6, 7]
        },
        h: null,
        i: undefined
    };

const copy = deepCopy(original);

console.assert(JSON.stringify(copy) === JSON.stringify(original), "Test 1a: JSON-String-Vergleich schlägt fehl."); 
console.assert(copy !== original, "Test 1b: Das Hauptobjekt sollte nicht identisch sein.");


copy.c[2].d = 99;
console.assert(copy.c[2].d === 99, "Test 2a: Änderung in der Kopie schlägt fehl.");
console.assert(original.c[2].d === 4, "Test 2b: Deep Copy für verschachteltes Array-Objekt schlägt fehl (Original wurde geändert).");
console.assert(copy.c[2] !== original.c[2], "Test 2c: Das verschachtelte Objekt sollte nicht identisch sein.");



copy.e.f = 100;
console.assert(copy.e.f === 100, "Test 3a: Änderung im verschachtelten Objekt der Kopie schlägt fehl.");
console.assert(original.e.f === 5, "Test 3b: Deep Copy für verschachteltes Objekt schlägt fehl (Original wurde geändert).");
console.assert(copy.e !== original.e, "Test 3c: Das verschachtelte Objekt sollte nicht identisch sein.");

console.assert(deepCopy(42) === 42, "Test 4a: Kopieren von Primitive (Zahl) schlägt fehl.");
console.assert(deepCopy(null) === null, "Test 4b: Kopieren von null schlägt fehl.");
console.assert(deepCopy(undefined) === undefined, "Test 4c: Kopieren von undefined schlägt fehl.");
