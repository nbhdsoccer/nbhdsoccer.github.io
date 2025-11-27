// Event page dynamic content rendering
function renderBenavidezTournamentContent() {
  if (!window.SITE_CONFIG?.tournaments?.benavidez) return;
  
  const tournament = window.SITE_CONFIG.tournaments.benavidez;
  
  // Update all date references
  updateTournamentDates(tournament);
  
  // Update registration status
  updateRegistrationStatus(tournament);
  
  // Update pricing information
  updatePricingInfo(tournament);
  
  // Update venue information
  updateVenueInfo(tournament);
}

function updateTournamentDates(tournament) {
  // Update page header date
  const headerDate = document.querySelector('.tournament-details-header');
  if (headerDate) {
    headerDate.textContent = `${tournament.date} | ${tournament.venue}`;
  }
  
  // Update tournament title with year
  const tournamentTitle = document.querySelector('h1');
  if (tournamentTitle && tournamentTitle.textContent.includes('Annual')) {
    tournamentTitle.textContent = `${tournament.year} David Benavidez Memorial Tournament`;
  }
  
  // Update meta title
  const metaTitle = document.querySelector('title');
  if (metaTitle) {
    metaTitle.textContent = `${tournament.year} David Benavidez Memorial Tournament | Honoring David's Legacy Through Community`;
  }
  
  // Update tournament details section
  const whenCard = document.querySelector('.detail-card:first-child p');
  if (whenCard) {
    whenCard.innerHTML = `<strong>${tournament.date}</strong><br>
    ${tournament.time}<br>
    <em>${tournament.ceremony.description}</em>`;
  }
  
  // Update registration deadlines
  const deadlineElements = document.querySelectorAll('[data-deadline]');
  deadlineElements.forEach(el => {
    const type = el.getAttribute('data-deadline');
    if (type === 'regular') {
      el.textContent = `Deadline: ${tournament.registrationDeadline}`;
    }
  });
}

function updateRegistrationStatus(tournament) {
  const registrationSection = document.getElementById('memorial-registration');
  if (!registrationSection) return;
  
  if (tournament.registration.isPaused) {
    // Create pause message
    const pauseMessage = document.createElement('div');
    pauseMessage.className = 'registration-paused';
    pauseMessage.innerHTML = `
      <div class="pause-message">
        <div class="pause-icon">⏸️</div>
        <h3>Registration Temporarily Paused</h3>
        <p>${tournament.registration.pauseMessage}</p>
        ${tournament.registration.pwaMessage ? `<p class="pwa-message">🚀 ${tournament.registration.pwaMessage}</p>` : ''}
        ${tournament.registration.contactForInfo ? `
          <div class="contact-info">
            <p><strong>Questions?</strong> Contact us at <a href="mailto:nbhdsoccer@gmail.com">nbhdsoccer@gmail.com</a></p>
          </div>
        ` : ''}
      </div>
    `;
    
    // Hide the registration form
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
      registrationForm.style.display = 'none';
    }
    
    // Insert pause message before the registration options
    const registrationOptions = document.querySelector('.registration-options');
    if (registrationOptions) {
      registrationSection.insertBefore(pauseMessage, registrationOptions);
    }
    
    // Add CSS for pause message
    addPauseMessageStyles();
  }
}

function updatePricingInfo(tournament) {
  const pricing = tournament.pricing;
  
  // Update registration cards
  const registrationCards = document.querySelectorAll('.registration-card');
  
  registrationCards.forEach((card, index) => {
    const amountEl = card.querySelector('.contribution-amount');
    if (!amountEl) return;
    
    switch(index) {
      case 0: // Individual
        amountEl.textContent = `$${pricing.individual}`;
        break;
      case 1: // Team
        amountEl.textContent = `$${pricing.team}`;
        break;
      case 2: // Sponsorship
        amountEl.textContent = `$${pricing.sponsorshipBase || 250}+`;
        // Update sponsorship tier pricing in the list
        if (tournament.sponsorshipTiers) {
          const tiersList = card.querySelector('.contribution-includes ul');
          if (tiersList) {
            const tiers = tournament.sponsorshipTiers;
            tiersList.innerHTML = `
              <li><strong>${tiers.community.name} ($${tiers.community.amount}):</strong> ${tiers.community.benefits[0]}</li>
              <li><strong>${tiers.memorial.name} ($${tiers.memorial.amount}):</strong> ${tiers.memorial.benefits[0]}</li>
              <li><strong>${tiers.legacy.name} (${tiers.legacy.displayAmount || '$' + tiers.legacy.amount + '+'}):</strong> ${tiers.legacy.benefits[0]}</li>
              <li><em>Enhancement add-ons available for all tiers</em></li>
              <li>Email nbhdsoccer@gmail.com to discuss sponsorship details</li>
            `;
          }
        }
        break;
    }
  });
  
  // Update form pricing options
  updateFormPricing(pricing, tournament);
}

function updateFormPricing(pricing, tournament) {
  const select = document.getElementById('registrationType');
  if (!select) return;
  
  // Update option text with current pricing
  const options = select.querySelectorAll('option');
  options.forEach(option => {
    const value = option.value;
    switch(value) {
      case 'individual-memorial':
        option.textContent = `Individual Registration - $${pricing.individual}`;
        break;
      case 'team-memorial':
        option.textContent = `Team Registration - $${pricing.team}`;
        break;
      case 'sponsor-community':
        option.textContent = `Community Sponsor - $${pricing.sponsorshipBase}`;
        break;
      case 'sponsor-memorial':
        option.textContent = `Memorial Sponsor - $${pricing.sponsorshipPremium}`;
        break;
      case 'sponsor-legacy':
        option.textContent = `Legacy Title Sponsor - $${pricing.sponsorshipTitle}+`;
        break;
      // Enhancement combinations
      case 'sponsor-community-tshirts':
        option.textContent = `Community Sponsor + T-Shirts - $${pricing.sponsorshipBase + pricing.enhancementTshirts}`;
        break;
      case 'sponsor-community-documentation':
        option.textContent = `Community Sponsor + Documentation - $${pricing.sponsorshipBase + pricing.enhancementDocumentation}`;
        break;
      case 'sponsor-community-keepsakes':
        option.textContent = `Community Sponsor + Keepsakes - $${pricing.sponsorshipBase + pricing.enhancementKeepsakes}`;
        break;
      case 'sponsor-memorial-tshirts':
        option.textContent = `Memorial Sponsor + T-Shirts - $${pricing.sponsorshipPremium + pricing.enhancementTshirts}`;
        break;
      case 'sponsor-memorial-documentation':
        option.textContent = `Memorial Sponsor + Documentation - $${pricing.sponsorshipPremium + pricing.enhancementDocumentation}`;
        break;
      case 'sponsor-memorial-keepsakes':
        option.textContent = `Memorial Sponsor + Keepsakes - $${pricing.sponsorshipPremium + pricing.enhancementKeepsakes}`;
        break;
      case 'sponsor-legacy-tshirts':
        option.textContent = `Legacy Sponsor + T-Shirts - $${pricing.sponsorshipTitle + pricing.enhancementTshirts}+`;
        break;
      case 'sponsor-legacy-documentation':
        option.textContent = `Legacy Sponsor + Documentation - $${pricing.sponsorshipTitle + pricing.enhancementDocumentation}+`;
        break;
      case 'sponsor-legacy-keepsakes':
        option.textContent = `Legacy Sponsor + Keepsakes - $${pricing.sponsorshipTitle + pricing.enhancementKeepsakes}+`;
        break;
    }
  });
  
  // Update the price display function
  window.updateMemorialPrice = function() {
    const select = document.getElementById('registrationType');
    const priceDisplay = document.getElementById('memorialPriceDisplay');
    
    const prices = {
      'individual-memorial': `Memorial Participation: $${pricing.individual}`,
      'team-memorial': `Team Registration: $${pricing.team}`,
      'sponsor-community': `Community Sponsorship: $${pricing.sponsorshipBase}`,
      'sponsor-memorial': `Memorial Sponsorship: $${pricing.sponsorshipPremium}`,
      'sponsor-legacy': `Legacy Title Sponsorship: $${pricing.sponsorshipTitle}+ (Contact for details)`,
      'sponsor-community-tshirts': `Community Sponsor + T-Shirts: $${pricing.sponsorshipBase + pricing.enhancementTshirts}`,
      'sponsor-community-documentation': `Community Sponsor + Documentation: $${pricing.sponsorshipBase + pricing.enhancementDocumentation}`,
      'sponsor-community-keepsakes': `Community Sponsor + Keepsakes: $${pricing.sponsorshipBase + pricing.enhancementKeepsakes}`,
      'sponsor-memorial-tshirts': `Memorial Sponsor + T-Shirts: $${pricing.sponsorshipPremium + pricing.enhancementTshirts}`,
      'sponsor-memorial-documentation': `Memorial Sponsor + Documentation: $${pricing.sponsorshipPremium + pricing.enhancementDocumentation}`,
      'sponsor-memorial-keepsakes': `Memorial Sponsor + Keepsakes: $${pricing.sponsorshipPremium + pricing.enhancementKeepsakes}`,
      'sponsor-legacy-tshirts': `Legacy Sponsor + T-Shirts: $${pricing.sponsorshipTitle + pricing.enhancementTshirts}+ (Contact for details)`,
      'sponsor-legacy-documentation': `Legacy Sponsor + Documentation: $${pricing.sponsorshipTitle + pricing.enhancementDocumentation}+ (Contact for details)`,
      'sponsor-legacy-keepsakes': `Legacy Sponsor + Keepsakes: $${pricing.sponsorshipTitle + pricing.enhancementKeepsakes}+ (Contact for details)`,
      'sponsor-custom': 'Custom Sponsorship Package (Contact for details)'
    };
    
    if (select.value && prices[select.value]) {
      priceDisplay.textContent = prices[select.value];
    } else {
      priceDisplay.textContent = '';
    }
  };
}

function updateVenueInfo(tournament) {
  // Update venue information in details section
  const whereCard = document.querySelectorAll('.detail-card')[1];
  if (whereCard) {
    const venueInfo = whereCard.querySelector('p');
    if (venueInfo) {
      venueInfo.innerHTML = `<strong>${tournament.venue}</strong><br>
      ${tournament.address}<br>
      <em>Public transit accessible</em>`;
    }
  }
}

function addPauseMessageStyles() {
  if (document.getElementById('pause-message-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'pause-message-styles';
  style.textContent = `
    .registration-paused {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #f59e0b;
      border-radius: 16px;
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;
    }
    
    .pause-message {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .pause-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .pause-message h3 {
      color: #92400e;
      font-family: 'Poppins', sans-serif;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .pause-message p {
      color: #78350f;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .pwa-message {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid #3b82f6;
      border-radius: 8px;
      padding: 1rem;
      color: #1e40af !important;
      font-weight: 500;
    }
    
    .contact-info {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f59e0b;
    }
    
    .contact-info a {
      color: #92400e;
      text-decoration: underline;
      font-weight: 600;
    }
    
    .contact-info a:hover {
      color: #78350f;
    }
  `;
  
  document.head.appendChild(style);
}

// Utility functions for easy updates
function updateTournamentDate(newDate) {
  if (window.SITE_CONFIG?.tournaments?.benavidez) {
    window.SITE_CONFIG.tournaments.benavidez.date = newDate;
    renderBenavidezTournamentContent();
  }
}

function toggleRegistration(isOpen, pauseMessage = null) {
  if (window.SITE_CONFIG?.tournaments?.benavidez) {
    window.SITE_CONFIG.tournaments.benavidez.registration.isOpen = isOpen;
    window.SITE_CONFIG.tournaments.benavidez.registration.isPaused = !isOpen;
    if (pauseMessage) {
      window.SITE_CONFIG.tournaments.benavidez.registration.pauseMessage = pauseMessage;
    }
    renderBenavidezTournamentContent();
  }
}

function updateTournamentPricing(newPricing) {
  if (window.SITE_CONFIG?.tournaments?.benavidez) {
    Object.assign(window.SITE_CONFIG.tournaments.benavidez.pricing, newPricing);
    renderBenavidezTournamentContent();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    renderBenavidezTournamentContent();
  }, 100);
});

// Make utility functions available globally
window.updateTournamentDate = updateTournamentDate;
window.toggleRegistration = toggleRegistration;
window.updateTournamentPricing = updateTournamentPricing;
