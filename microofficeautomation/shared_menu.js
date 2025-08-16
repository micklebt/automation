// MicroOffice Automation - Shared Menu System
// This creates a consistent navigation menu across all pages

function createSharedMenu() {
  // Define menu items
  const menuItems = [
    { 
      text: '🏠 Home', 
      href: 'index_enhanced_backup.html', 
      description: 'Main business automation page'
    },
    { 
      text: '🚀 Tech Stack', 
      href: 'complete_tech_picker_backup.html', 
      description: 'Explore automation solutions'
    },
    { 
      text: '💰 ROI Calculator', 
      href: 'value_calculator.html', 
      description: 'Calculate your efficiency losses'
    },
    { 
      text: '🎁 Free Tools', 
      href: 'freebies.html', 
      description: 'Free efficiency boosters'
    },
    { 
      text: '📧 Contact', 
      href: 'mailto:info@microofficeautomation.com?subject=Website Inquiry', 
      description: 'Get in touch'
    },
    { 
      text: '📞 Call', 
      href: 'tel:+13309195744', 
      description: '(330) 919-5744'
    }
  ];

  // Create menu HTML
  let menuHTML = '<div class="shared-nav-menu" style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">';
  
  menuItems.forEach(item => {
    const isExternal = item.href.startsWith('mailto:') || item.href.startsWith('tel:');
    const currentPage = window.location.pathname.split('/').pop();
    const isCurrentPage = currentPage === item.href;
    
    let style = 'display: inline-block; font-weight: 600; padding: 0.6rem 1rem; border-radius: 6px; text-decoration: none; font-size: 14px; transition: all 0.2s ease;';
    
    if (isCurrentPage) {
      // Current page styling
      style += ' background: #004aad; color: white; cursor: default;';
    } else if (item.text.includes('📧') || item.text.includes('📞')) {
      // Contact buttons
      style += ' background: #10b981; color: white;';
    } else if (item.text.includes('🎁')) {
      // Free tools special styling
      style += ' background: #ffc107; color: #1b1b1b;';
    } else {
      // Regular navigation
      style += ' background: #e5e7eb; color: #374151;';
    }
    
    menuHTML += `<a href="${item.href}" style="${style}" title="${item.description}"${isExternal ? ' target="_self"' : ''}>${item.text}</a>`;
  });
  
  menuHTML += '</div>';
  
  return menuHTML;
}

// CSS for hover effects (add to page styles)
const sharedMenuCSS = `
<style>
.shared-nav-menu a:hover:not([style*="cursor: default"]) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.shared-nav-menu a:active:not([style*="cursor: default"]) {
  transform: translateY(0);
}
</style>
`;

// Function to inject menu into page
function injectSharedMenu(targetElementId = 'shared-menu-container') {
  const container = document.getElementById(targetElementId);
  if (container) {
    container.innerHTML = createSharedMenu();
  } else {
    console.warn('Shared menu container not found. Add <div id="shared-menu-container"></div> to your page.');
  }
}

// Function to add menu CSS
function addSharedMenuCSS() {
  if (!document.getElementById('shared-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'shared-menu-styles';
    style.innerHTML = `
      .shared-nav-menu a:hover:not([style*="cursor: default"]) {
        transform: translateY(-1px) !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }
      .shared-nav-menu a:active:not([style*="cursor: default"]) {
        transform: translateY(0) !important;
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