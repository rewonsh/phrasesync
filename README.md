# Meet with PhraseSync

A simple, online translation module for Node.js. Instantly translate text between languages using the LibreTranslate API.

## Features
- Translate text between 20+ languages
- Uses LibreTranslate API (no API key required for public instance)
- No need to add or manage your own data
- Simple async API

## Installation

```bash
npm install phrasesync
```

## Usage

```js
const phrasesync = require('phrasesync');

// Translate text from English to Turkish
phrasesync.translate('Hello, how are you?', 'en', 'tr').then(console.log); // "Merhaba, nasılsın?"

// Auto-detect source language
phrasesync.translate('Guten Morgen!', undefined, 'en').then(console.log); // "Good morning!"

// List supported languages
phrasesync.getSupportedLanguages().then(console.log);
```

## API

### `phrasesync.translate(text, from, to)`
- `text` _(string)_: Text to translate
- `from` _(string, optional)_: Source language code (e.g., 'en', 'tr', 'de', or 'auto')
- `to` _(string)_: Target language code (e.g., 'en', 'tr', 'de')
- **Returns:** `Promise<string>` translated text

### `phrasesync.getSupportedLanguages()`
- **Returns:** `Promise<Array<{code: string, name: string}>>` Supported languages

## License
MIT

---

> PhraseSync uses the LibreTranslate API (https://libretranslate.com/).