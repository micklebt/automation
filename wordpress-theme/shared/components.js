// MicroOffice Automation - Shared HTML Components
// This provides reusable HTML templates and components

// Common meta tags for SEO optimization
function createMetaTags(config) {
  const {
    title = 'MicroOffice Automation',
    description = 'Business automation solutions for small businesses',
    url = 'https://microofficeautomation.com/',
    image = 'https://microofficeautomation.com/after_image.png',
    keywords = 'business automation, office efficiency, small business tools'
  } = config;

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Social -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `;
}

// Common Google Analytics setup
function createGoogleAnalytics(measurementId = 'G-XXXXXXXXXX') {
  return `
    <!-- GA4: replace ${measurementId} with your Measurement ID -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${measurementId}');

      // Basic conversion events
      document.addEventListener('DOMContentLoaded', function () {
        // Form submit tracking
        const form = document.querySelector('form[action*="formspree"]');
        if (form) {
          form.addEventListener('submit', function () {
            gtag('event', 'generate_lead', { method: 'contact_form' });
          });
        }
        // mailto: and tel: click tracking
        document.body.addEventListener('click', function (e) {
          const a = e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
          if (a) {
            const href = a.getAttribute('href') || '';
            const type = href.startsWith('mailto:') ? 'email_click' : 'phone_click';
            gtag('event', type, { link: href });
          }
        });
      });
    </script>
  `;
}

// Standard header component
function createHeader(config) {
  const {
    brandName = 'MicroOffice Automation',
    ctaText = 'FREE Initial Consult - $400 Value',
    ctaLink = '#contact-form'
  } = config;

  return `
    <header>
      <h1><span class="brand-name-large">${brandName}</span></h1>
      <a href="${ctaLink}" class="cta-primary">${ctaText}</a>
      <div id="shared-menu-container"></div>
    </header>
  `;
}

// Hero section component
function createHeroSection(config) {
  const {
    title = 'Business Automation Expert',
    subtitle = 'Transform your business efficiency',
    description = '',
    backgroundClass = 'hero',
    showCredentials = false,
    credentials = []
  } = config;

  let credentialsHTML = '';
  if (showCredentials && credentials.length > 0) {
    credentialsHTML = `
      <div class="credentials">
        ${credentials.map(cred => `
          <div class="credential-item">
            <div class="credential-number">${cred.number}</div>
            <div>${cred.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <section class="${backgroundClass}">
      <div class="hero-content">
        <h1>${title}</h1>
        <p>${subtitle}</p>
        ${description ? `<p>${description}</p>` : ''}
        ${credentialsHTML}
      </div>
    </section>
  `;
}

// Feature card component
function createFeatureCard(config) {
  const {
    icon = '⚙️',
    title = 'Feature Title',
    description = 'Feature description',
    highlight = null,
    caseStudy = null
  } = config;

  let highlightHTML = '';
  if (highlight) {
    highlightHTML = `<div class="roi-highlight">${highlight}</div>`;
  }

  let caseStudyHTML = '';
  if (caseStudy) {
    caseStudyHTML = `
      <div class="case-study">
        <h4>${caseStudy.title}</h4>
        <p>${caseStudy.description}</p>
      </div>
    `;
  }

  return `
    <div class="feature-card">
      <h3><span class="insight-icon">${icon}</span>${title}</h3>
      <p>${description}</p>
      ${highlightHTML}
      ${caseStudyHTML}
    </div>
  `;
}

// Contact form component
function createContactForm(config) {
  const {
    title = 'Request Your Free Automation Consultation',
    action = 'https://formspree.io/f/mblkboaz',
    submitText = 'Send Message'
  } = config;

  return `
    <section>
      <h2>${title}</h2>
      <form id="contact-form" action="${action}" method="POST">
        <label>Name:</label>
        <input type="text" name="name" required />

        <label>Email:</label>
        <input type="email" name="email" required />

        <label>Your Message:</label>
        <textarea name="message" rows="5" required></textarea>

        <button type="submit">${submitText}</button>
      </form>
    </section>
  `;
}

// Footer component
function createFooter(config) {
  const {
    brandName = 'MicroOffice Automation',
    serviceArea = 'Northeast Ohio, USA',
    email = 'info@microofficeautomation.com',
    phone = '+1 (330) 919‑5744',
    year = new Date().getFullYear()
  } = config;

  return `
    <footer>
      <div style="margin-bottom: 0.25rem;"><span class="brand-name">${brandName}</span></div>
      <div>Service Area: ${serviceArea}</div>
      <div><a href="mailto:${email}">${email}</a> &nbsp;|&nbsp; <a href="tel:${phone.replace(/\D/g, '')}">${phone}</a></div>
      <div style="margin-top: 0.5rem;">&copy; ${year} <span class="brand-name">${brandName}</span> | All rights reserved</div>
    </footer>
  `;
}

// Stats section component
function createStatsSection(config) {
  const {
    title = 'Proven Results',
    description = 'Real data from implementing automation solutions',
    stats = []
  } = config;

  return `
    <section class="stats-section">
      <h2 style="font-size: 1.8rem; margin-bottom: 20px;">${title}</h2>
      <p style="font-size: 1.1rem; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">${description}</p>
      
      <div class="stats-grid">
        ${stats.map(stat => `
          <div class="stat-item">
            <span class="stat-number">${stat.number}</span>
            <div class="stat-label">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// About section component
function createAboutSection(config) {
  const {
    title = 'About Our Approach',
    content = [],
    backgroundClass = 'about-section'
  } = config;

  return `
    <section class="${backgroundClass}">
      <div class="about-content">
        <h2>${title}</h2>
        <div class="about-text">
          ${content.map(paragraph => `<p>${paragraph}</p>`).join('')}
        </div>
      </div>
    </section>
  `;
}

// CTA section component
function createCTASection(config) {
  const {
    title = 'Ready to Transform Your Business?',
    description = 'Get started with our automation solutions today.',
    buttonText = 'Get Started',
    buttonLink = '#contact-form',
    backgroundClass = 'cta-section'
  } = config;

  return `
    <section class="${backgroundClass}">
      <h2 style="font-size: 1.8rem; margin-bottom: 20px;">${title}</h2>
      <p style="font-size: 1.1rem; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">${description}</p>
      <a href="${buttonLink}" class="cta-button">${buttonText}</a>
    </section>
  `;
}

// Schema.org structured data for LocalBusiness
function createLocalBusinessSchema(config) {
  const {
    name = 'MicroOffice Automation',
    url = 'https://microofficeautomation.com/',
    telephone = '+1-330-919-5744',
    description = 'Business automation solutions for small businesses',
    image = 'https://microofficeautomation.com/after_image.png',
    areaServed = ['Northeast Ohio', 'United States'],
    locality = 'Northeast Ohio',
    region = 'OH',
    country = 'US'
  } = config;

  return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${name}",
      "url": "${url}",
      "telephone": "${telephone}",
      "description": "${description}",
      "image": "${image}",
      "areaServed": ${JSON.stringify(areaServed)},
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${locality}",
        "addressRegion": "${region}",
        "addressCountry": "${country}"
      },
      "sameAs": [
        "https://www.google.com/search?q=${encodeURIComponent(name)}"
      ]
    }
    </script>
  `;
}

// Navigation component
function createNavigation(links = []) {
  return `
    <nav class="navigation">
      <div class="nav-links">
        ${links.map(link => `<a href="${link.href}">${link.text}</a>`).join('')}
      </div>
    </nav>
  `;
}

// Tech stack CTA section
function createTechStackCTA() {
  return `
    <section style="text-align: center; margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; border-radius: 12px;">
      <h3 style="color: #0369a1; margin-bottom: 1rem; font-size: 1.4em;">🚀 Explore Our Complete Technology Solutions</h3>
      <p style="color: #0c4a6e; margin-bottom: 1.5rem; font-size: 15px;">
        <strong>Discover 200+ automation tools</strong> organized by implementation ease. See exactly what's possible for your business and get custom pricing.
      </p>
      <button onclick="openTechStackPicker()" class="cta-secondary">
        🚀 Open Tech Stack Assessment
      </button>
    </section>
  `;
}

// Export all components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createMetaTags,
    createGoogleAnalytics,
    createHeader,
    createHeroSection,
    createFeatureCard,
    createContactForm,
    createFooter,
    createStatsSection,
    createAboutSection,
    createCTASection,
    createLocalBusinessSchema,
    createNavigation,
    createTechStackCTA
  };
} else {
  // Browser environment
  window.MicroOfficeComponents = {
    createMetaTags,
    createGoogleAnalytics,
    createHeader,
    createHeroSection,
    createFeatureCard,
    createContactForm,
    createFooter,
    createStatsSection,
    createAboutSection,
    createCTASection,
    createLocalBusinessSchema,
    createNavigation,
    createTechStackCTA
  };
}