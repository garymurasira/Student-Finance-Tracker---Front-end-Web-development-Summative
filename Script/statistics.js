// Statistics Calculation
// Handles all statistics-related methods

const AppStateStats = {
  // Calculate statistics
  calculateStats() {
    const transactions = AppStateData.transactions;

    // Total spending
    AppStateData.stats.totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Transaction count
    AppStateData.stats.transactionCount = transactions.length;

    // Top category - simplified using reduce
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    AppStateData.stats.topCategory = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

    // Average spend
    AppStateData.stats.averageSpend = transactions.length > 0
      ? AppStateData.stats.totalSpending / transactions.length
      : 0;

    // Last 7 days trend
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const dateObj = new Date(today);
      dateObj.setDate(dateObj.getDate() - i);
      const dateStr = dateObj.toISOString().split('T')[0];

      const dayTotal = transactions
        .filter(t => t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);

      last7Days.push({
        date: dateStr,
        amount: dayTotal,
        dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    AppStateData.stats.last7DaysTrend = last7Days;

    return AppStateData.stats;
  },

  // Get statistics
  getStats() {
    return AppStateData.stats;
  },

  // Check if spending limit exceeded
  checkSpendingLimit() {
    const total = AppStateData.stats.totalSpending;
    const limit = AppStateData.settings.spendingCap;

    if (limit > 0 && total > limit) {
      if (window.AppStateUI) {
        const formatCurrency = window.AppStateSettings ?
          window.AppStateSettings.formatCurrency.bind(window.AppStateSettings) :
          (amount) => '$' + parseFloat(amount).toFixed(2);

        window.AppStateUI.announceChange(`Warning: Spending limit exceeded! Total: ${formatCurrency(total)}, Limit: ${formatCurrency(limit)}`);
      }
      return true;
    }
    return false;
  }
};

// Make available globally
window.AppStateStats = AppStateStats;
