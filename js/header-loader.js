// Page-specific configurations
const pageConfigs = {
    // Root level pages
    '/index.html': {
        ctaText: 'Join Our Community',
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
        rootPath: ''
    },
    '/': {
        ctaText: 'Join Our Community', 
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
        rootPath: ''
    },
    
    // About pages
    '/about/about.html': {
        ctaText: 'Support Our Mission',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=Mission Support',
        rootPath: '../'
    },
    
    // Partners pages
    '/partners/partners.html': {
        ctaText: 'Partner With Us',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=Partnership Interest',
        rootPath: '../'
    },
    
    // Support pages
    '/support/support.html': {
        ctaText: 'Donate Now',
        ctaHref: '#donate',
        rootPath: '../'
    },
    '/support/sponsors.html': {
        ctaText: 'Become a Sponsor',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=Sponsorship Inquiry',
        rootPath: '../'
    },
    
    // Programs pages
    '/programs/rec_77.html': {
        ctaText: 'Join REC 77',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=REC 77 Interest',
        rootPath: '../'
    },
    '/programs/womens.html': {
        ctaText: 'Join Women\'s Soccer',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=Women\'s Soccer Interest',
        rootPath: '../'
    },
    
    // Events pages
    '/events/rec_77.html': {
        ctaText: 'Register for REC 77',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=REC 77 Registration',
        rootPath: '../'
    },
    '/events/pickup.html': {
        ctaText: '⚽ Join Pickup Soccer in Chicago',
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
        rootPath: '../'
    }
};

async function loadHeader() {
    try {
        // Get current page path
        let currentPath = window.location.pathname;
        
        // Calculate root path based on folder depth
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        const depth = pathSegments.length - 1;
        const rootPath = depth > 0 ? '../'.repeat(depth) : '';
        
        // Get page config or use default
        let config = pageConfigs[currentPath];
        if (!config) {
            // Default config for pages not specifically defined
            config = {
                ctaText: 'Join Our Community',
                ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
                rootPath: rootPath
            };
        }
        
        // Fetch header HTML
        const headerPath = `${rootPath}components/header.html`;
        const response = await fetch(headerPath);
        let headerHTML = await response.text();
        
        // Replace placeholders
        headerHTML = headerHTML.replace(/\{\{ROOT_PATH\}\}/g, config.rootPath);
        headerHTML = headerHTML.replace('{{CTA_TEXT}}', config.ctaText);
        headerHTML = headerHTML.replace('{{CTA_HREF}}', config.ctaHref);
        
        // Insert into page
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
        }
        
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);