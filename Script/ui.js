// UI & Accessibility
// Handles UI, accessibility announcements, theme, and navigation

const AppStateUI = {
  // Accessibility announcement
  announceChange(message) {
    // Create live region for screen readers
    let announcer = document.getElementById('app-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'app-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }

    announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  },

  // Apply theme globally
  applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      document.body.style.backgroundColor = '#2c3e50';
      document.body.style.color = '#ecf0f1';
    } else {
      document.body.style.backgroundColor = '#E1D9D1';
      document.body.style.color = '#2c3e50';
    }

    // Store theme in localStorage so other pages know to apply it
    localStorage.setItem('currentTheme', theme);
  },

  // Apply settings globally across all pages
  applyGlobalSettings() {
    if (!window.AppStateData) return;

    const settings = AppStateData.settings;
    this.applyTheme(settings.theme || 'light');
  },

  // Navbar Hamburger Menu Functionality
  initNavbar() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const slidingPanel = document.getElementById('slidingPanel');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const menuLinks = slidingPanel ? slidingPanel.querySelectorAll('a, button') : [];

    if (!hamburgerMenu || !slidingPanel || !menuOverlay) return;

    // Store the element that triggered the menu
    let lastFocusedElement = null;

    // Open menu
    const openMenu = () => {
      lastFocusedElement = document.activeElement;
      slidingPanel.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus on first menu link or close button
      setTimeout(() => {
        const firstFocusable = slidingPanel.querySelector('a, button') || closeBtn;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 100);
    };

    hamburgerMenu.addEventListener('click', openMenu);

    // Keyboard support for hamburger menu (Enter/Space)
    hamburgerMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!slidingPanel.classList.contains('active')) {
          openMenu();
        }
      }
    });

    // Close menu functions
    const closeMenu = () => {
      slidingPanel.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';

      // Return focus to the trigger element
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
      // Close on Enter/Space for close button
      closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeMenu();
        }
      });
    }

    // Click overlay to close
    menuOverlay.addEventListener('click', closeMenu);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && slidingPanel.classList.contains('active')) {
        closeMenu();
      }
    });

    // Focus trap inside the sliding panel
    slidingPanel.addEventListener('keydown', (e) => {
      if (!slidingPanel.classList.contains('active')) return;

      if (e.key === 'Tab') {
        const firstFocusable = slidingPanel.querySelector('a, button');
        const lastFocusable = menuLinks[menuLinks.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable || document.activeElement === slidingPanel) {
            e.preventDefault();
            if (lastFocusable) lastFocusable.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            if (firstFocusable) firstFocusable.focus();
          }
        }
      }
    });
  },

  // Image slider keyboard navigation and auto-slide (for About page)
  initImageSlider() {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    let isAutoSliding = false;

    // Set initial ARIA attributes
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'img');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
      slide.setAttribute('tabindex', '-1');
      if (index === 0) {
        slide.setAttribute('tabindex', '0');
      }
    });

    const showSlide = (index, shouldFocus = false) => {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.setAttribute('tabindex', '-1');
        if (i === index) {
          slide.classList.add('active');
          slide.setAttribute('tabindex', '0');
          // Only focus when manually navigating, not during auto-slide
          if (shouldFocus && !isAutoSliding) {
            slide.focus();
          }
        }
      });
      currentIndex = index;
    };

    const nextSlide = () => {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex, true);
    };

    const prevSlide = () => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex, true);
    };

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          showSlide(0, true);
          break;
        case 'End':
          e.preventDefault();
          showSlide(slides.length - 1, true);
          break;
      }
    });

    // Make slider focusable
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Image slider - Use arrow keys to navigate');

    // Auto-slide every 3 seconds (without focusing to prevent scroll)
    setInterval(() => {
      isAutoSliding = true;
      nextSlide();
      isAutoSliding = false;
    }, 3000);
  }
};

// Make available globally
window.AppStateUI = AppStateUI;

// Apply theme on page load if it was set
const savedTheme = localStorage.getItem('currentTheme');
if (savedTheme) {
  document.addEventListener('DOMContentLoaded', () => {
    AppStateUI.applyTheme(savedTheme);
  });
}

// Listen for storage changes from other pages
window.addEventListener('storage', (e) => {
  if (e.key === 'settings' || e.key === 'currentTheme') {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    if (settings.theme) {
      AppStateUI.applyTheme(settings.theme);
    }
  }
});
