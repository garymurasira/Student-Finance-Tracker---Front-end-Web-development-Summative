// Student Finance Tracker - State Management
// Main entry point - combines all modules

// AppState - Main unified interface
const AppState = {
  // Initialize the app
  async init() {
    return await AppStateData.init();
  },

  // Transaction methods
  addTransaction(data) {
    return AppStateTransactions.addTransaction(data);
  },
  updateTransaction(id, updates) {
    return AppStateTransactions.updateTransaction(id, updates);
  },
  deleteTransaction(id) {
    return AppStateTransactions.deleteTransaction(id);
  },
  getTransaction(id) {
    return AppStateTransactions.getTransaction(id);
  },
  getAllTransactions(sortBy, order) {
    return AppStateTransactions.getAllTransactions(sortBy, order);
  },
  searchTransactions(pattern) {
    return AppStateTransactions.searchTransactions(pattern);
  },

  // Statistics methods
  calculateStats() {
    return AppStateStats.calculateStats();
  },
  getStats() {
    return AppStateStats.getStats();
  },
  checkSpendingLimit() {
    return AppStateStats.checkSpendingLimit();
  },

  // Settings methods
  updateSettings(newSettings) {
    return AppStateSettings.updateSettings(newSettings);
  },
  getSettings() {
    return AppStateSettings.getSettings();
  },
  formatCurrency(amount) {
    return AppStateSettings.formatCurrency(amount);
  },
  formatDate(dateStr) {
    return AppStateSettings.formatDate(dateStr);
  },

  // Data methods
  exportData() {
    return AppStateData.exportData();
  },
  importData(data) {
    return AppStateData.importData(data);
  },
  resetData() {
    return AppStateData.resetData();
  },

  // UI methods
  announceChange(message) {
    return AppStateUI.announceChange(message);
  },
  applyTheme(theme) {
    return AppStateUI.applyTheme(theme);
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
  await AppState.init();
  AppStateUI.initNavbar();
  AppStateUI.applyGlobalSettings();
});

// Make available globally
window.AppState = AppState;
