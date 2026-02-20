# Student Finance Tracker

DEMO VIDEO: https://youtu.be/BC5cN7hyRJs .
Github Pages link: https://garymurasira.github.io/Student-Finance-Tracker---Front-end-Web-development-Summative/ .
WireFrame: ./assets/Wireframe/Wireframe.png

A responsive web application designed to help students record, organize, and analyze their daily expenses.

## Chosen Theme

- **Light Mode** (default): Clean, accessible design with warm background (#E1D9D1) and dark text (#2c3e50)
- **Dark Mode**: Available via Settings, with dark background (#2c3e50) and light text (#ecf0f1)
- **Color Scheme**: 
  - Primary: #2c3e50 (Dark Blue)
  - Success: #27ae60 (Green)
  - Warning: #f39c12 (Orange)
  - Danger: #e74c3c (Red)

## Features List

### Dashboard
- Budget tracking with visual circular progress indicator
- Financial overview cards (Total Spending, Transactions, Top Category, Average Spend)
- 7-day spending trends bar graph
- Recent transactions display
- Spending limit warnings

### Transactions
- Add, edit, and delete transactions
- Search transactions with regex support
- Sort by date, description, or amount
- Form validation for all fields
- Category management (preset + custom)

### Settings
- Currency selection (RWF, USD, EUR, GBP, JPY)
- Budget cap configuration
- Theme toggle (Light/Dark mode)
- Data export/import (JSON backup)
- Data reset functionality

### About Page
- Application purpose and description
- Image slider with auto-advance and keyboard navigation
- User testimonials/feedback section
- Developer contact information

### Accessibility
- Skip to main content link
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader announcements

## Regex Catalog

| Pattern | Description | Example |
|---------|-------------|---------|
| `^\S.*\S$` | No leading/trailing spaces | `"Lunch"` ✓, `" Lunch "` ✗ |
| `\b(\w+)\b\s+\b\1\b` | Duplicate words detection | `"coffee coffee"` ✗ |
| `^[1-9]\d*(\.\d{1,2})?$` | Valid currency amount | `"12.50"` ✓, `"0"` ✗ |
| `^[a-zA-Z\s-]+$` | Category text (letters, spaces, hyphens) | `"Food"` ✓, `"Food123"` ✗ |
| `^\d{4}-\d{2}-\d{2}$` | Date format YYYY-MM-DD | `"2024-01-15"` ✓ |

## Keyboard Map

### Global
| Key | Action |
|-----|--------|
| `Tab` | Navigate between focusable elements |
| `Enter` | Activate links/buttons |
| `Space` | Activate buttons / Scroll down |
| `Escape` | Close modals/menus |

### Hamburger Menu (Mobile)
| Key | Action |
|-----|--------|
| `Enter` | Open menu |
| `Space` | Open menu |
| `Tab` | Cycle through menu links |
| `Shift+Tab` | Cycle backwards |
| `Escape` | Close menu |

### Image Slider (About Page)
| Key | Action |
|-----|--------|
| `→` / `↓` | Next slide |
| `←` / `↑` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## Accessibility Notes

### ARIA Implementation
- Live regions for dynamic content announcements
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels linked to inputs
- Button and link roles explicitly defined
- Slider region with keyboard guidance

### Focus Management
- Visible focus indicators on all interactive elements
- Focus trap in mobile menu
- Focus returns to trigger after menu close
- Skip link for keyboard users

### Screen Reader Support
- Descriptive alt text for images
- aria-live regions for status messages
- Proper table headers with scope
- Form validation errors announced

## How to Run Tests

### Open in Browser
Simply open any HTML file directly in your browser:
- `index.html` - About page (main entry)
- `Dashboard.html` - Dashboard
- `Transaction.html` - Transactions
- `Settings.html` - Settings

### Running Automated Tests

1. **Manual Browser Testing**
   - Open `tests.html` in browser
   - Click "Run All Tests" button
   - View results in the test output panel

2. **Test Files Location**
   - Main tests: `tests.html`
   - Unit tests: `test/test.html`
   - Test scripts: `test/*.js`

3. **Test Coverage**
   - Data operations (add, edit, delete)
   - Search functionality with regex
   - Filter and sort operations
   - Form validation
   - CSS styling

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
