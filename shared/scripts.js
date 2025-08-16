// MicroOffice Automation - Cross-Domain Menu System
// This creates a consistent navigation menu across all domains

function createSharedMenu() {
  // Detect current domain to determine base URLs
  const currentDomain = window.location.hostname;
  let baseURL = '';
  
  // Set base URL based on current domain
  if (currentDomain.includes('microofficeautomation')) {
    baseURL = '';  // Same domain, relative paths
  } else {
    baseURL = 'https://microofficeautomation.com/';  // Cross-domain absolute paths
  }
  
  // Define menu items with cross-domain support
  const menuItems = [
    { 
      text: '<à Main Site', 
      href: baseURL + 'index.html', 
      description: 'MicroOffice Automation main site',
      domain: 'microofficeautomation.com'
    },
    { 
      text: '=€ Tech Stack', 
      href: baseURL + 'complete_tech_picker.html', 
      description: 'Explore automation solutions',
      domain: 'microofficeautomation.com'
    },
    { 
      text: '=° ROI Calculator', 
      href: baseURL + 'value_calculator.html', 
      description: 'Calculate your efficiency losses',
      domain: 'microofficeautomation.com'
    },
    { 
      text: '< Free Tools', 
      href: baseURL + 'freebies.html', 
      description: 'Free efficiency boosters',
      domain: 'microofficeautomation.com'
    },
    { 
      text: '=h=¼ About Brian', 
      href: 'https://brianmickleyautomation.com/', 
      description: 'Military veteran & business expert',
      domain: 'brianmickleyautomation.com'
    },
    { 
      text: '=¡ Business Insights', 
      href: 'https://mickleybusinessautomation.com/', 
      description: 'Real-world automation strategies',
      domain: 'mickleybusinessautomation.com'
    },
    { 
      text: '=' Tool Reviews', 
      href: 'https://mickleyofficeautomation.com/', 
      description: 'Expert tool analysis & guides',
      domain: 'mickleyofficeautomation.com'
    },
    { 
      text: '=ç Contact', 
      href: 'mailto:info@microofficeautomation.com?subject=Website Inquiry', 
      description: 'Get in touch',
      domain: 'contact'
    },
    { 
      text: '=Þ Call', 
      href: 'tel:+13309195744', 
      description: '(330) 919-5744',
      domain: 'contact'
    }
  ];

  // Create menu HTML with responsive design
  let menuHTML = '<div class="shared-nav-menu" style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin: 1rem 0; padding: 0 1rem;">';
  
  menuItems.forEach(item => {
    const isExternal = item.href.startsWith('mailto:') || item.href.startsWith('tel:');
    const isCrossDomain = item.href.startsWith('https://') && !item.href.includes(currentDomain);
    const currentPage = window.location.pathname.split('/').pop();
    const isCurrentDomain = currentDomain.includes(item.domain.split('.')[0]);
    
    let style = 'display: inline-block; font-weight: 600; padding: 0.5rem 0.8rem; border-radius: 8px; text-decoration: none; font-size: 13px; transition: all 0.2s ease; border: 2px solid transparent;';
    
    if (isCurrentDomain && !isExternal) {
      // Current domain styling
      style += ' background: #2E5BBA; color: white; border-color: #2E5BBA;';
    } else if (item.domain === 'contact') {
      // Contact buttons
      style += ' background: #28a745; color: white; border-color: #28a745;';
    } else if (item.text.includes('<')) {
      // Free tools special styling
      style += ' background: #ffc107; color: #1b1b1b; border-color: #ffc107;';
    } else if (isCrossDomain) {
      // Cross-domain links
      style += ' background: #f8f9fa; color: #2E5BBA; border-color: #2E5BBA;';
    } else {
      // Regular navigation
      style += ' background: #e5e7eb; color: #374151; border-color: #e5e7eb;';
    }
    
    const target = isCrossDomain || isExternal ? ' target="_blank"' : '';
    const rel = isCrossDomain ? ' rel="noopener"' : '';
    
    menuHTML += `<a href="${item.href}" style="${style}" title="${item.description}"${target}${rel}>${item.text}</a>`;
  });
  
  menuHTML += '</div>';
  
  return menuHTML;
}

// Function to inject menu into page
function injectSharedMenu(targetElementId = 'shared-menu-container') {
  const container = document.getElementById(targetElementId);
  if (container) {
    container.innerHTML = createSharedMenu();
  } else {
    console.warn('Shared menu container not found. Add <div id="shared-menu-container"></div> to your page.');
  }
}

// Function to add menu CSS with responsive design
function addSharedMenuCSS() {
  if (!document.getElementById('shared-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'shared-menu-styles';
    style.innerHTML = `
      .shared-nav-menu {
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        border: 1px solid rgba(46,91,186,0.1);
      }
      
      .shared-nav-menu a:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 15px rgba(46,91,186,0.2) !important;
      }
      
      .shared-nav-menu a:active {
        transform: translateY(0) !important;
      }
      
      @media (max-width: 768px) {
        .shared-nav-menu {
          gap: 0.3rem !important;
          padding: 0.5rem !important;
        }
        
        .shared-nav-menu a {
          font-size: 11px !important;
          padding: 0.4rem 0.6rem !important;
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
    `;
    document.head.appendChild(style);
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addSharedMenuCSS();
  injectSharedMenu();
});

// Export for manual use
window.MicroOfficeMenu = {
  create: createSharedMenu,
  inject: injectSharedMenu,
  addCSS: addSharedMenuCSS
};