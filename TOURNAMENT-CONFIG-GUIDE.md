# Tournament Configuration Guide

## Overview
The Benavidez Memorial Tournament page now features a clean, three-tier registration system: Individual Registration, Team Registration, and Memorial Sponsorship with multiple tiers. All content is fully configurable through the site configuration system.

## Configuration Files
- **Main Config:** `/js/site-config.js` - Contains all tournament settings
- **Tournament Renderer:** `/js/tournament-dynamic-content.js` - Handles page updates (don't edit)

## Registration Structure

### 🏃‍♂️ Individual Registration ($55)
- Placed on available memorial team
- Participation in memorial ceremony
- Tournament documentation package
- Family gratitude and recognition
- Community celebration participation

### ⚽ Team Registration ($500 / $350 Early)
- Full team entry (8-16 players)
- Team recognition at ceremony
- Team photo with Benavidez family
- Tournament documentation for all players
- Special acknowledgment from family

### 🏆 Memorial Sponsorship (3 Tiers)
- **Community Sponsor ($250):** Logo at ceremony, website recognition
- **Memorial Sponsor ($500):** Prominent placement, family recognition  
- **Legacy Title Sponsor ($1000+):** Naming rights, exclusive family meeting

## Configuration Structure

### 💰 Update Pricing
```javascript
pricing: {
  individual: 55,           // Individual registration
  team: 500,               // Team registration
  earlyBird: 350,          // Early team registration
  sponsorshipBase: 250,    // Community sponsor tier
  sponsorshipPremium: 500, // Memorial sponsor tier
  sponsorshipTitle: 1000   // Legacy title sponsor tier
}
```

### 🏆 Sponsorship Tier Configuration
```javascript
sponsorshipTiers: {
  community: {
    name: "Community Sponsor",
    amount: 250,
    benefits: [
      "Logo displayed at ceremony",
      "Recognition on tournament website",
      "Thank you acknowledgment from family",
      "Tournament documentation package"
    ]
  },
  memorial: {
    name: "Memorial Sponsor", 
    amount: 500,
    benefits: [
      "Prominent logo placement at ceremony",
      "Featured sponsorship on website",
      "Special recognition by Benavidez family",
      "Highlighted in tournament materials",
      "Partnership discussion opportunities"
    ]
  },
  legacy: {
    name: "Legacy Title Sponsor",
    amount: 1000,
    benefits: [
      "Tournament naming rights recognition",
      "Premier logo placement at all events",
      "Dedicated website sponsorship page",
      "Exclusive family meeting opportunity",
      "Featured in annual impact report",
      "Custom partnership development"
    ]
  }
}
```

## Quick Updates via Browser Console

### Update Individual Pricing
```javascript
updateTournamentPricing({ individual: 60 });
```

### Update Team Pricing
```javascript
updateTournamentPricing({ 
  team: 550, 
  earlyBird: 400 
});
```

### Update Sponsorship Tiers
```javascript
updateTournamentPricing({
  sponsorshipBase: 300,
  sponsorshipPremium: 600,
  sponsorshipTitle: 1200
});
```

## Memorial Tournament Philosophy

The updated registration system emphasizes:
- **Gratitude:** Family appreciation for all participants
- **Memorial:** Honoring David's legacy through participation
- **Community:** No jerseys or lunches - focus on ceremony and documentation
- **Recognition:** Balanced benefits across all registration types
- **Accessibility:** Clear pricing tiers for different participation levels

This structure creates a respectful, memorial-focused experience while providing clear value for all participants and sponsors.
