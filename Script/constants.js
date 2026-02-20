// Constants & Configuration
// Currency symbols mapping
const CURRENCY_SYMBOLS = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'RWF': 'RWF',
  'JPY': '¥'
};

// Default settings
const DEFAULT_SETTINGS = {
  currency: 'RWF',
  spendingCap: 1000,
  theme: 'dark'
};

// Make available globally
window.CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
