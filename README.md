# Meet with PhraseSync

A smart, customizable phrase and translation matching module for Node.js. Add your own bilingual data and get instant predictions or translations between languages. Perfect for custom glossaries, parallel texts, and domain-specific vocabularies.

## Features
- Add your own sentence/word pairs for any language
- Predict/translate words or phrases between languages
- Fuzzy matching with Levenshtein distance
- Supports custom similarity options (input/output)
- No external API required, works fully offline

## Installation

```bash
npm install phrasesync
```

## Usage

```js
const phrasesync = require('phrasesync');

// Add parallel data for each language
phrasesync.add('en', [
  'In the beginning God created the heaven and the earth.',
  'God',
  // ...
]);
phrasesync.add('pt', [
  'No princípio criou Deus os céus e a terra.',
  'Deus',
  // ...
]);
phrasesync.add('ko', [
  '태초에 하나님이 천지를 창조하시니라',
  '하나님이',
  // ...
]);
phrasesync.add('ja', [
  'はじめに神は天と地とを創造された。',
  '神',
  // ...
]);

// Predict/translate single or multiple words/phrases
console.log(phrasesync.predict(['God'], 'en', 'pt')); // ['Deus']
console.log(phrasesync.predict(['God'], 'en', 'ko', { similarity: 'output' })); // ['하나님이']
console.log(phrasesync.predict(['God'], 'en', 'ja')); // ['神']
console.log(phrasesync.predict(['하나님이'], 'ko', 'en', { similarity: 'input' })); // ['God']
```

## API

### `phrasesync.add(lang, array)`
- `lang` _(string)_: Language code (e.g., 'en', 'pt', 'ko', 'ja')
- `array` _(string[])_: Array of sentences/words for that language. The order must match across languages.

### `phrasesync.predict(inputArray, from, to, options)`
- `inputArray` _(string[])_: Array of words/phrases to translate or match
- `from` _(string)_: Source language code
- `to` _(string)_: Target language code
- `options.similarity` _(string, optional)_: 'output' (default) or 'input'. Determines which language to use for fuzzy matching.
- **Returns:** Array of predicted/matched words or phrases in the target language

## License
MIT

---

> PhraseSync is not affiliated with LibreTranslate.
