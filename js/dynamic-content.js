// Dynamic content rendering functions
function renderEvents() {
  const eventsContainer = document.querySelector('.events-grid-redesigned');
  if (!eventsContainer || !window.SITE_CONFIG) return;
  
  eventsContainer.innerHTML = '';
  
  window.SITE_CONFIG.events.forEach(event => {
    const eventCard = createEventCard(event);
    eventsContainer.appendChild(eventCard);
  });
}

function createEventCard(event) {
  const card = document.createElement('div');
  card.className = `event-card-modern${event.featured ? ' featured' : ''}`;
  card.id = event.id;
  
  const buttonClass = event.buttonClass ? ` ${event.buttonClass}` : '';
  const disabledClass = event.disabled ? ' disabled' : '';
  const targetAttr = event.external ? ' target="_blank"' : '';
  
  card.innerHTML = `
    <div class="event-header">
      <span class="event-date">${event.date}</span>
      <span class="event-type ${event.type}">${event.typeLabel}</span>
    </div>
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    ${event.buttonText ? `
      <a href="${event.buttonLink}" class="btn-event${buttonClass}${disabledClass}"${targetAttr}>
        ${event.buttonText}
      </a>
    ` : ''}
  `;
  
  return card;
}

function updateHeroStats() {
  const stats = window.SITE_CONFIG?.heroStats;
  if (!stats) return;
  
  const statElements = document.querySelectorAll('.hero-stat-number');
  if (statElements.length >= 3) {
    statElements[0].textContent = stats.communityMembers;
    statElements[1].textContent = stats.cpsSchools;
    statElements[2].textContent = stats.fundsRaised;
  }
}

// Initialize dynamic content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure config is loaded
  setTimeout(() => {
    renderEvents();
    updateHeroStats();
  }, 100);
});

// Utility functions for easy updates
function updateEvent(eventId, updates) {
  const event = window.SITE_CONFIG.events.find(e => e.id === eventId);
  if (event) {
    Object.assign(event, updates);
    renderEvents();
  }
}

function addEvent(newEvent) {
  window.SITE_CONFIG.events.push(newEvent);
  renderEvents();
}

function removeEvent(eventId) {
  const index = window.SITE_CONFIG.events.findIndex(e => e.id === eventId);
  if (index > -1) {
    window.SITE_CONFIG.events.splice(index, 1);
    renderEvents();
  }
}

// Make utility functions available globally for easy console access
window.updateEvent = updateEvent;
window.addEvent = addEvent;
window.removeEvent = removeEvent;
