// Storage Utilities
// Reusable localStorage and data persistence functions

const StorageUtils = {
  // Save data to localStorage
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return { success: true, error: null };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Load data from localStorage
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return defaultValue;
    }
  },

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return { success: true, error: null };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Clear all app data from localStorage
  clearAll() {
    const keys = ['transactions', 'settings', 'currentTheme'];
    const results = {};
    keys.forEach(key => {
      results[key] = this.remove(key);
    });
    return results;
  },

  // Export all data as JSON
  exportAll() {
    return {
      transactions: this.load('transactions', []),
      settings: this.load('settings', {}),
      exportDate: new Date().toISOString()
    };
  },

  // Import data from JSON
  importData(data) {
    if (data.transactions) {
      this.save('transactions', data.transactions);
    }
    if (data.settings) {
      this.save('settings', data.settings);
    }
    return { success: true };
  },

  // Check if localStorage is available
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  // Get storage usage info
  getUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return {
      bytes: total,
      kb: (total / 1024).toFixed(2),
      mb: (total / 1024 / 1024).toFixed(4)
    };
  }
};

// Make available globally
window.StorageUtils = StorageUtils;
