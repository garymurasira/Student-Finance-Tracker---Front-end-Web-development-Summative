// Validation Utilities
// Reusable regex validation functions

const Validators = {
  // Description: no leading/trailing spaces, collapse double spaces
  validateDescription(description) {
    if (!description || typeof description !== 'string') {
      return { valid: false, sanitized: '', error: 'Description is required' };
    }
    const trimmed = description.trim();
    const collapsed = trimmed.replace(/\s+/g, ' ');
    const valid = trimmed === description && collapsed === trimmed;
    return {
      valid,
      sanitized: collapsed,
      error: valid ? null : 'Invalid: extra spaces found'
    };
  },

  // Amount: numeric, up to 2 decimal places
  validateAmount(amount) {
    const str = String(amount);
    const valid = /^\d+(\.\d{1,2})?$/.test(str);
    return {
      valid,
      parsed: valid ? parseFloat(str) : 0,
      error: valid ? null : 'Invalid amount format'
    };
  },

  // Date: YYYY-MM-DD format
  validateDate(dateStr) {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    if (valid) {
      const date = new Date(dateStr);
      const validDate = !isNaN(date.getTime());
      return {
        valid: validDate,
        parsed: validDate ? date : null,
        error: validDate ? null : 'Invalid date'
      };
    }
    return { valid: false, parsed: null, error: 'Use YYYY-MM-DD format' };
  },

  // Category: letters, spaces, hyphens only
  validateCategory(category) {
    const valid = /^[a-zA-Z\s-]+$/.test(category);
    return {
      valid,
      error: valid ? null : 'Only letters, spaces, hyphens allowed'
    };
  },

  // Email validation
  validateEmail(email) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return {
      valid,
      error: valid ? null : 'Invalid email format'
    };
  },

  // URL validation
  validateUrl(url) {
    try {
      new URL(url);
      return { valid: true, error: null };
    } catch {
      return { valid: false, error: 'Invalid URL format' };
    }
  },

  // Phone number validation (basic)
  validatePhone(phone) {
    const valid = /^\+?[\d\s-]{10,}$/.test(phone);
    return {
      valid,
      error: valid ? null : 'Invalid phone number'
    };
  }
};

// Make available globally
window.Validators = Validators;
