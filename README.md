# Meet with Translatify

A free and easy-to-use Node.js translation module that supports many languages. It works with the LibreTranslate infrastructure and does not require an API key.

## Features
- Translation between many popular languages
- Automatic language detection
- List supported languages
- Fast and easy to use
- No extra dependencies, only `axios`

## Installation

```bash
npm install translatify
```

## Usage

```js
const { translate, getSupportedLanguages } = require('translatify');

(async () => {
  // Get supported languages
  const langs = await getSupportedLanguages();
  console.log(langs);
  // [ { code: 'en', name: 'English' }, ... ]

  // Translate from Turkish to English
  const result = await translate('Merhaba dünya', { from: 'tr', to: 'en' });
  console.log(result); // "Hello world"

  // Translate with automatic language detection
  const autoResult = await translate('Bonjour tout le monde', { to: 'tr' });
  console.log(autoResult); // "Herkese merhaba"
})();
```

## API

### `translate(text, { from = 'auto', to = 'en' })`
- `text` _(string)_: The text to translate
- `from` _(string)_: Source language code (or 'auto')
- `to` _(string)_: Target language code
- **Returns:** Translated text (Promise<string>)

### `getSupportedLanguages()`
- **Returns:** List of supported languages (Promise<Array<{code, name}>>)

## License
MIT

---

> Translatify is not affiliated with LibreTranslate.