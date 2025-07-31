// Page-specific configurations
const pageConfigs = {
    // Root level pages
    '/index.html': {
        ctaText: 'Weekly Games',
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
        rootPath: ''
    },
    '/': {
        ctaText: 'Weekly Games', 
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
        rootPath: ''
    },
    
    // About pages
    '/about/about.html': {
        ctaText: 'Support Our Mission',
        ctaHref: '../support/support.html',
        rootPath: '../'
    },
    '/about/impact.html': {
        ctaText: 'Support Our Mission',
        ctaHref: '../support/support.html',
        rootPath: '../'
    },
    '/about/leadership.html': {
        ctaText: 'Support Our Mission',
        ctaHref: '../support/support.html',
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

    
    // Programs pages
    '/programs/rec_77.html': {
        ctaText: 'Join REC 77',
        ctaHref: 'mailto:nbhdsoccer@gmail.com?subject=REC 77 Interest',
        rootPath: '../'
    },
    '/programs/womens.html': {
        ctaText: 'Join Women\'s Soccer',
        ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
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
    },
    '/events/benavidez-tournament.html': {
        ctaText: 'Honor David\'s Legacy',
        ctaHref: '#memorial-registration',
        rootPath: '../'
    }
};

async function loadHeader() {
    try {
        // Get current page path
        let currentPath = window.location.pathname;
        console.log('Current path:', currentPath);
        
        // Calculate root path based on folder depth
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        const depth = pathSegments.length - 1;
        const rootPath = depth > 0 ? '../'.repeat(depth) : '';
        console.log('Calculated root path:', rootPath);
        
        // Get page config or use default
        let config = pageConfigs[currentPath];
        
        // If no exact match, try to find a partial match
        if (!config) {
            for (const [path, pageConfig] of Object.entries(pageConfigs)) {
                if (currentPath.endsWith(path)) {
                    config = pageConfig;
                    console.log('Found partial match for path:', path);
                    break;
                }
            }
        }
        
        if (!config) {
            console.log('No specific config found, using default');
            // Default config for pages not specifically defined
            config = {
                ctaText: 'Join Our Community',
                ctaHref: 'https://www.meetup.com/nbhdsoccer/events/',
                rootPath: rootPath
            };
        } else {
            console.log('Using config:', config);
        }
        
        // Fetch header HTML
        const headerPath = `${config.rootPath}components/header.html`;
        console.log('Fetching header from:', headerPath);
        const response = await fetch(headerPath);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch header: ${response.status} ${response.statusText}`);
        }
        
        let headerHTML = await response.text();
        console.log('Header HTML length:', headerHTML.length);
        
        // Replace placeholders
        headerHTML = headerHTML.replace(/\{\{ROOT_PATH\}\}/g, config.rootPath);
        headerHTML = headerHTML.replace('{{CTA_TEXT}}', config.ctaText);
        headerHTML = headerHTML.replace('{{CTA_HREF}}', config.ctaHref);
        
        // Insert into page
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
            console.log('Header loaded successfully');
        } else {
            console.error('Header container not found');
        }
        
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);