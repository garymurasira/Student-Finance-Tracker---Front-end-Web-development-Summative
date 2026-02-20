// Transaction Operations
// Handles all transaction-related methods

const AppStateTransactions = {
  // Add new transaction
  addTransaction(transactionData) {
    const now = new Date().toISOString();
    const newTransaction = {
      id: AppStateData.generateId(),
      description: transactionData.description.trim(),
      amount: parseFloat(transactionData.amount),
      category: transactionData.category,
      date: transactionData.date,
      createdAt: now,
      updatedAt: now
    };

    AppStateData.transactions.push(newTransaction);
    AppStateData.saveToStorage();

    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }

    if (window.AppStateUI) {
      const formattedAmount = window.AppStateSettings ?
        window.AppStateSettings.formatCurrency(newTransaction.amount) :
        '$' + newTransaction.amount.toFixed(2);
      window.AppStateUI.announceChange(`Added transaction: ${newTransaction.description} for ${formattedAmount}`);
    }

    return newTransaction;
  },

  // Update existing transaction
  updateTransaction(id, updates) {
    const index = AppStateData.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    AppStateData.transactions[index] = {
      ...AppStateData.transactions[index],
      ...updates,
      updatedAt: now
    };

    AppStateData.saveToStorage();

    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }

    if (window.AppStateUI) {
      window.AppStateUI.announceChange(`Updated transaction: ${AppStateData.transactions[index].description}`);
    }

    return AppStateData.transactions[index];
  },

  // Delete transaction
  deleteTransaction(id) {
    const index = AppStateData.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;

    const deleted = AppStateData.transactions.splice(index, 1)[0];
    AppStateData.saveToStorage();

    if (window.AppStateStats) {
      window.AppStateStats.calculateStats();
    }

    if (window.AppStateUI) {
      window.AppStateUI.announceChange(`Deleted transaction: ${deleted.description}`);
    }

    return true;
  },

  // Get single transaction
  getTransaction(id) {
    return AppStateData.transactions.find(t => t.id === id);
  },

  // Get all transactions (optionally sorted)
  getAllTransactions(sortBy = 'date', order = 'desc') {
    let sorted = [...AppStateData.transactions];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }

      return order === 'desc' ? -comparison : comparison;
    });

    return sorted;
  },

  // Search transactions with regex
  searchTransactions(pattern) {
    if (!pattern || pattern.trim() === '') {
      return AppStateData.transactions;
    }

    try {
      const regex = new RegExp(pattern, 'i');
      return AppStateData.transactions.filter(t =>
        regex.test(t.description) ||
        regex.test(t.category) ||
        regex.test(t.amount.toString()) ||
        regex.test(t.date)
      );
    } catch (e) {
      // Invalid regex, return all
      return AppStateData.transactions;
    }
  }
};

// Make available globally
window.AppStateTransactions = AppStateTransactions;
