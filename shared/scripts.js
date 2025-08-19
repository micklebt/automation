// MicroOffice Automation - Enhanced Cross-Domain Menu System
// Optimized for performance and maintainability

function createSharedMenu() {
  // Detect current domain to determine base URLs
  const currentDomain = window.location.hostname;
  const currentPath = window.location.pathname;
  let baseURL = '';
  
  // Set base URL based on current domain
  if (currentDomain.includes('brianmickleyautomation')) {
    baseURL = '';  // Same domain, relative paths
  } else {
    baseURL = 'https://brianmickleyautomation.com/';  // Cross-domain absolute paths
  }
  
  // Define menu items with cross-domain support (cleaned up - removed cluttered buttons)
  const menuItems = [
    { 
      text: '🏠 Home', 
      href: baseURL + 'index.html', 
      description: 'Business Automation Insights',
      domain: 'brianmickleyautomation.com',
      priority: 1
    },
    { 
      text: '📊 Business Insights', 
      href: '#insights', 
      description: 'Real-world automation strategies',
      domain: 'brianmickleyautomation.com',
      priority: 2
    },
    { 
      text: '📋 Case Studies', 
      href: '#case-studies', 
      description: 'Real business transformations',
      domain: 'brianmickleyautomation.com',
      priority: 3
    },
    { 
      text: 'ℹ️ About', 
      href: '#about', 
      description: 'Why these insights matter',
      domain: 'brianmickleyautomation.com',
      priority: 4
    }
  ];

  // Create menu HTML with improved performance and accessibility
  const menuContainer = document.createElement('div');
  menuContainer.className = 'shared-nav-menu';
  menuContainer.setAttribute('role', 'navigation');
  menuContainer.setAttribute('aria-label', 'Main navigation');
  
  // Apply base styling
  Object.assign(menuContainer.style, {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '1.5rem 0',
    padding: '1rem',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(46,91,186,0.12)',
    border: '1px solid rgba(46,91,186,0.08)'
  });
  
  // Create and append menu items
  const fragment = document.createDocumentFragment();
  
  menuItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    link.title = item.description;
    link.setAttribute('aria-label', item.description);
    
    // Determine styling based on item properties
    const isExternal = item.href.startsWith('mailto:') || item.href.startsWith('tel:');
    const isCrossDomain = item.href.startsWith('https://') && !item.href.includes(currentDomain);
    const isCurrentDomain = currentDomain.includes(item.domain.split('.')[0]);
    
    // Set target and rel attributes for external links
    if (isCrossDomain || isExternal) {
      link.target = '_blank';
      if (isCrossDomain) link.rel = 'noopener';
    }
    
    // Apply base link styling
    Object.assign(link.style, {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontWeight: '600',
      padding: '0.5rem 0.8rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '13px',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    });
    
    // Apply specific styling based on item type
    if (isCurrentDomain && !isExternal) {
      // Current domain styling - primary blue
      Object.assign(link.style, {
        background: 'linear-gradient(135deg, #2E5BBA 0%, #1d4ed8 100%)',
        color: 'white',
        borderColor: '#2E5BBA',
        boxShadow: '0 4px 12px rgba(46,91,186,0.3)'
      });
    } else if (item.text.includes('🎁')) {
      // Free tools special styling - gold gradient
      Object.assign(link.style, {
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        color: '#1b1b1b',
        borderColor: '#fbbf24',
        boxShadow: '0 4px 12px rgba(251,191,36,0.3)'
      });
    } else if (isCrossDomain) {
      // Cross-domain links - light with blue accent
      Object.assign(link.style, {
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: '#2E5BBA',
        borderColor: '#2E5BBA',
        boxShadow: '0 2px 8px rgba(46,91,186,0.15)'
      });
    } else {
      // Regular navigation - neutral
      Object.assign(link.style, {
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        color: '#374151',
        borderColor: '#cbd5e1',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      });
    }
    
    // Add hover effects
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px) scale(1.02)';
      link.style.boxShadow = '0 6px 20px rgba(46,91,186,0.25)';
      link.style.filter = 'brightness(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
      link.style.boxShadow = link.style.boxShadow.replace('0 6px 20px rgba(46,91,186,0.25)', '');
      link.style.filter = '';
    });
    
    link.addEventListener('mousedown', () => {
      link.style.transform = 'translateY(0)';
    });
    
    fragment.appendChild(link);
  });
  
  menuContainer.appendChild(fragment);
  return menuContainer.outerHTML;
}

// Function to inject menu into page with error handling
function injectSharedMenu(targetElementId = 'shared-menu-container') {
  try {
    const container = document.getElementById(targetElementId);
    if (container) {
      container.innerHTML = createSharedMenu();
      
      // Add performance monitoring
      if (window.performance && window.performance.mark) {
        window.performance.mark('shared-menu-rendered');
      }
    } else {
      console.warn('Shared menu container not found. Add <div id="shared-menu-container"></div> to your page.');
    }
  } catch (error) {
    console.error('Error injecting shared menu:', error);
  }
}

// Enhanced CSS injection with better responsive design
function addSharedMenuCSS() {
  if (document.getElementById('shared-menu-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'shared-menu-styles';
  style.innerHTML = `
    .shared-nav-menu {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      border: 1px solid rgba(46,91,186,0.1);
      will-change: transform;
    }
    
    .shared-nav-menu a:hover {
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 6px 20px rgba(46,91,186,0.25) !important;
      filter: brightness(1.1) !important;
    }
    
    .shared-nav-menu a:active {
      transform: translateY(0) !important;
    }
    
    .shared-nav-menu a:focus {
      outline: 2px solid #2E5BBA;
      outline-offset: 2px;
    }
    
    @media (max-width: 768px) {
      .shared-nav-menu {
        gap: 0.3rem !important;
        padding: 0.5rem !important;
        margin: 1rem 0 !important;
      }
      
      .shared-nav-menu a {
        font-size: 11px !important;
        padding: 0.4rem 0.6rem !important;
        border-radius: 6px !important;
      }
    }
    
    @media (max-width: 480px) {
      .shared-nav-menu {
        flex-direction: column !important;
        align-items: center !important;
        gap: 0.5rem !important;
      }
      
      .shared-nav-menu a {
        width: 100% !important;
        text-align: center !important;
        max-width: 200px !important;
      }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .shared-nav-menu a {
        transition: none !important;
      }
      
      .shared-nav-menu a:hover {
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Performance-optimized initialization
function initializeSharedMenu() {
  // Use requestIdleCallback for non-critical initialization
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      addSharedMenuCSS();
      injectSharedMenu();
      injectBreadcrumb();
      injectEnhancedFooter();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      addSharedMenuCSS();
      injectSharedMenu();
      injectBreadcrumb();
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

// Create breadcrumb navigation
function createBreadcrumb() {
  const currentDomain = window.location.hostname;
  const currentPath = window.location.pathname;
  
  // Determine current location
  let breadcrumbData = { domain: 'Home', page: '' };
  
  if (currentDomain.includes('brianmickleyautomation')) {
    breadcrumbData = { domain: 'Business Automation Insights', page: 'Real-World Strategies & Solutions' };
    if (currentPath.includes('complete_tech_picker')) {
      breadcrumbData = { domain: 'MicroOffice Automation', page: 'Tech Stack Assessment' };
    } else if (currentPath.includes('value_calculator')) {
      breadcrumbData = { domain: 'MicroOffice Automation', page: 'ROI Calculator' };
    } else if (currentPath.includes('freebies')) {
      breadcrumbData = { domain: 'MicroOffice Automation', page: 'Free Tools' };
    } else {
      breadcrumbData = { domain: 'MicroOffice Automation', page: 'Main Site' };
    }
  }
  
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumb-nav';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb navigation');
  
  breadcrumb.innerHTML = `
    <div class="breadcrumb-container">
      <a href="https://microofficeautomation.com/" class="breadcrumb-home">🏠 Home</a>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">${breadcrumbData.domain}</span>
      ${breadcrumbData.page ? `<span class="breadcrumb-separator">›</span><span class="breadcrumb-page">${breadcrumbData.page}</span>` : ''}
    </div>
  `;
  
  return breadcrumb.outerHTML;
}

// Create enhanced footer with contact information
function createEnhancedFooter() {
  const currentYear = new Date().getFullYear();
  
  return `
    <footer class="enhanced-footer">
      <div class="footer-content">
        <div class="footer-section footer-brand">
          <h3><span class="brand-name">MicroOffice Automation</span></h3>
          <p>Enabling small businesses to punch above their weight through smart automation solutions.</p>
        </div>
        
        <div class="footer-section footer-contact">
          <h4>Get In Touch</h4>
          <div class="contact-items">
            <a href="mailto:info@microofficeautomation.com" class="contact-item">
              <span class="contact-icon">✉️</span>
              <span>info@microofficeautomation.com</span>
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
            <a href="https://microofficeautomation.com/">Main Site</a>
            <a href="https://microofficeautomation.com/complete_tech_picker.html">Tech Stack</a>
            <a href="https://microofficeautomation.com/value_calculator.html">ROI Calculator</a>
            <a href="https://microofficeautomation.com/freebies.html">Free Tools</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; ${currentYear} <span class="brand-name">MicroOffice Automation</span> | All rights reserved</p>
        </div>
        <div class="footer-domains">
          <a href="https://brianmickleyautomation.com/">About Brian</a>
          <a href="https://mickleybusinessautomation.com/">Business Insights</a>
          <a href="https://mickleyofficeautomation.com/">Tool Reviews</a>
        </div>
      </div>
    </footer>
  `;
}

// Function to inject breadcrumb
function injectBreadcrumb(targetElementId = 'breadcrumb-container') {
  try {
    const container = document.getElementById(targetElementId);
    if (container) {
      container.innerHTML = createBreadcrumb();
    }
  } catch (error) {
    console.warn('Breadcrumb container not found. Add <div id="breadcrumb-container"></div> to your page.');
  }
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

// Export for manual use and testing
window.MicroOfficeMenu = {
  create: createSharedMenu,
  inject: injectSharedMenu,
  addCSS: addSharedMenuCSS,
  init: initializeSharedMenu,
  createBreadcrumb: createBreadcrumb,
  injectBreadcrumb: injectBreadcrumb,
  createEnhancedFooter: createEnhancedFooter,
  injectEnhancedFooter: injectEnhancedFooter
};

// Add basic analytics tracking for menu usage
function trackMenuClick(href, text) {
  if (typeof gtag === 'function') {
    gtag('event', 'menu_click', {
      'menu_item': text,
      'destination': href
    });
  }
}

// Performance monitoring
if (window.performance && window.performance.getEntriesByType) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.getEntriesByType('navigation')[0];
      if (perfData && perfData.loadEventEnd > 0) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.navigationStart, 'ms');
      }
    }, 0);
  });
}