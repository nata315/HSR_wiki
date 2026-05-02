const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

const inputFile = 'authorized/auth.js';
const outputFile = 'auth.min.js';  // сразу финальный файл

const result = JavaScriptObfuscator.obfuscate(fs.readFileSync(inputFile, 'utf8'), {
    compact: true,                   // Terser нам не нужен
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    debugProtection: true,
    disableConsoleOutput: false
});

fs.writeFileSync(outputFile, result.getObfuscatedCode());
console.log('✅ Готово! auth.min.js защищен и готов к использованию');