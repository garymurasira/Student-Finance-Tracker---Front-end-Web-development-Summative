// Data & Storage Layer
// Handles transactions, settings, stats objects and persistence

const AppStateData = {
  // In-memory state array
  transactions: [],

  // Settings
  settings: {
    currency: 'RWF',
    spendingCap: 1000,
    theme: 'dark'
  },

  // Statistics cache
  stats: {
    totalSpending: 0,
    transactionCount: 0,
    topCategory: '',
    averageSpend: 0,
    last7DaysTrend: []
  },

  // Load data from localStorage or seed data
  async init() {
    const savedTransactions = localStorage.getItem('transactions');
    const savedSettings = localStorage.getItem('settings');

    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    } else {
      // Load seed data from seed.json
      this.transactions = await this.getSeedData();
      this.saveToStorage();
    }

    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    } else {
      this.settings = { ...DEFAULT_SETTINGS };
    }

    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }

    return this;
  },

  // Seed data for initial load - loads from seed.json
  async getSeedData() {
    try {
      const response = await fetch('Script/seed.json');
      if (!response.ok) {
        throw new Error('Failed to load seed data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading seed data:', error);
      return [];
    }
  },

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    localStorage.setItem('settings', JSON.stringify(this.settings));
  },

  // Generate unique ID
  generateId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `txn_${timestamp}_${random}`;
  },

  // Export data as JSON
  exportData() {
    return {
      transactions: this.transactions,
      settings: this.settings,
      exportDate: new Date().toISOString()
    };
  },

  // Import data from JSON
  importData(data) {
    if (data.transactions && Array.isArray(data.transactions)) {
      this.transactions = data.transactions;
    }
    if (data.settings) {
      this.settings = { ...this.settings, ...data.settings };
    }
    this.saveToStorage();
    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }
    if (window.AppStateUI) {
      window.AppStateUI.announceChange('Data imported successfully');
    }
    return true;
  },

  // Reset all data
  resetData() {
    this.transactions = [];
    this.settings = { ...DEFAULT_SETTINGS };
    this.saveToStorage();
    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }
    if (window.AppStateUI) {
      window.AppStateUI.announceChange('All data has been reset');
    }
    return true;
  }
};

// Make available globally
window.AppStateData = AppStateData;
