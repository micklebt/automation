// MicroOffice Automation - Enhanced Cross-Domain Menu System
// Optimized for performance and maintainability

// Create enhanced footer with contact information
function createEnhancedFooter() {
  const currentYear = new Date().getFullYear();
  
  return `
    <footer class="enhanced-footer">
      <div class="footer-background">
        <div class="footer-content">
          <div class="footer-section footer-brand">
            <h3><span class="brand-name">Brian Mickley Automation</span></h3>
            <p>Enabling small businesses to punch above their weight through smart automation solutions.</p>
          </div>
          
          <div class="footer-section footer-contact">
            <h4>Get In Touch</h4>
            <div class="contact-items">
              <a href="mailto:info@brianmickleyautomation.com" class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>info@brianmickleyautomation.com</span>
              </a>
              <a href="tel:+13309195744" class="contact-item">
                <span class="contact-icon">📞</span>
                <span>(330) 919-5744</span>
              </a>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>Northeast Ohio, USA</span>
              </div>
            </div>
          </div>
          
          <div class="footer-section footer-links">
            <h4>Quick Links</h4>
            <div class="footer-nav">
              <a href="#insights">Business Insights</a>
              <a href="#rules">Automation Rules</a>
              <a href="#case-studies">Case Studies</a>
              <a href="#about">About</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>&copy; ${currentYear} <span class="brand-name">Brian Mickley Automation</span> | All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Function to inject enhanced footer
function injectEnhancedFooter(targetElementId = 'enhanced-footer-container') {
  try {
    const container = document.getElementById(targetElementId);
    if (container) {
      container.innerHTML = createEnhancedFooter();
    } else {
      // If no specific container, append to body
      document.body.insertAdjacentHTML('beforeend', createEnhancedFooter());
    }
  } catch (error) {
    console.warn('Enhanced footer injection failed:', error);
  }
}

// Performance-optimized initialization
function initializeSharedMenu() {
  // Use requestIdleCallback for non-critical initialization
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      injectEnhancedFooter();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      injectEnhancedFooter();
    }, 0);
  }
}

// Enhanced DOM ready detection
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Auto-initialize when DOM is ready
domReady(initializeSharedMenu);

// Export for manual use and testing
window.MicroOfficeMenu = {
  init: initializeSharedMenu,
  injectFooter: injectEnhancedFooter
};