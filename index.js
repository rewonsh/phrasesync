const axios = require('axios');

const API_URL = 'https://libretranslate.de';

/**
 * Translates text between specified languages.
 * @param {string} text - Text to be translated
 * @param {Object} options
 * @param {string} [options.from='auto'] - Source language code (or 'auto')
 * @param {string} [options.to='en'] - Target language code
 * @returns {Promise<string>} - Translated text
 */
async function translate(text, { from = 'auto', to = 'en' } = {}) {
  if (!text) throw new Error('Text to translate is required.');
  if (!to) throw new Error('Target language code is required.');
  const res = await axios.post(`${API_URL}/translate`, {
    q: text,
    source: from,
    target: to,
    format: 'text'
  });
  return res.data.translatedText;
}

/**
 * Returns the supported languages.
 * @returns {Promise<Array<{code: string, name: string}>>}
 */
async function getSupportedLanguages() {
  const res = await axios.get(`${API_URL}/languages`);
  return res.data;
}

const levenshtein = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
};

const _data = {};

const translatify = {
  add(lang, arr) {
    if (!Array.isArray(arr)) throw new Error('Second argument must be an array');
    _data[lang] = arr;
  },

  predict(inputArr, from, to, options = {}) {
    if (!Array.isArray(inputArr)) throw new Error('First argument must be an array');
    if (!_data[from] || !_data[to]) throw new Error('Both languages must be added first');
    const fromArr = _data[from];
    const toArr = _data[to];
    const similarity = options.similarity || 'output';
    return inputArr.map(input => {
      let idx;
      if (similarity === 'input') {
        let minDist = Infinity, bestIdx = -1;
        for (let i = 0; i < toArr.length; i++) {
          const dist = levenshtein(input, toArr[i]);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = i;
          }
        }
        idx = bestIdx;
        return fromArr[idx];
      } else {
        let minDist = Infinity, bestIdx = -1;
        for (let i = 0; i < fromArr.length; i++) {
          const dist = levenshtein(input, fromArr[i]);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = i;
          }
        }
        idx = bestIdx;
        return toArr[idx];
      }
    });
  }
};

module.exports = translatify;