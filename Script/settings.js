// Settings Management
// Handles settings and formatting methods

const AppStateSettings = {
  // Update settings
  updateSettings(newSettings) {
    AppStateData.settings = { ...AppStateData.settings, ...newSettings };
    AppStateData.saveToStorage();

    // Apply theme immediately if changed, then announce
    if (newSettings.theme && window.AppStateUI) {
      window.AppStateUI.applyTheme(newSettings.theme);
      window.AppStateUI.announceChange('Settings updated');
    } else if (window.AppStateUI) {
      window.AppStateUI.announceChange('Settings updated');
    }

    return AppStateData.settings;
  },

  // Get settings
  getSettings() {
    return AppStateData.settings;
  },

  // Format currency
  formatCurrency(amount) {
    const currency = AppStateData.settings.currency || 'USD';
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  },

  // Format date
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Make available globally
window.AppStateSettings = AppStateSettings;
