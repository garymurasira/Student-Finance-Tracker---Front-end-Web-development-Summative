// Formatting Utilities
// Reusable formatting functions

const Formatters = {
  // Format currency with symbol
  formatCurrency(amount, currency = 'USD') {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'RWF': 'RWF',
      'JPY': '¥'
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  },

  // Format date to readable string
  formatDate(dateStr, options = {}) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },

  // Format date to ISO string (YYYY-MM-DD)
  formatDateISO(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  // Format time to readable string
  formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Format datetime to readable string
  formatDateTime(dateStr) {
    return `${this.formatDate(dateStr)} ${this.formatTime(dateStr)}`;
  },

  // Format number with commas
  formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Format percentage
  formatPercentage(value, decimals = 1) {
    return `${(parseFloat(value) * 100).toFixed(decimals)}%`;
  },

  // Truncate text with ellipsis
  truncate(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Capitalize first letter
  capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  // Title case
  titleCase(text) {
    if (!text) return '';
    return text.split(' ').map(word => this.capitalize(word)).join(' ');
  },

  // Format file size
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format relative time (e.g., "2 hours ago")
  formatRelativeTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return this.formatDate(dateStr);
  }
};

// Make available globally
window.Formatters = Formatters;
