// Site Configuration - Easy content updates
//
// 🔄 USED BY MULTIPLE PAGES:
// - index.html (root: /)
// - events/events.html (subfolder: /events/)  
// - events/benavidez-tournament.html (subfolder: /events/)
// - js/tournament-dynamic-content.js (dynamic updates)
//
// ⚠️ IMPORTANT: All buttonLink paths must be ROOT-RELATIVE (start with /)
// ✅ Correct: "/events/pickup.html" 
// ❌ Wrong: "events/pickup.html" (breaks in subfolders)
//
const SITE_CONFIG = {
  events: [
    {
      id: "benavidez-tournament-2025",
      date: "Oct 18, 2025",
      type: "featured",
      typeLabel: "Featured Event",
      title: "6th Annual David Benavidez Memorial Tournament",
      description: "Community tournament honoring David's legacy with 100% of proceeds supporting local organizations and neighborhood development initiatives. Six years of bringing the community together for health, healing, and celebration.",
      buttonText: "Learn More & Tournament Info",
      buttonLink: "/events/benavidez-tournament.html", // ✅ ROOT-RELATIVE PATH
      featured: true,
      registrationStatus: "open" // This can be "open", "paused", "closed"
    },
    {
      id: "pickup-soccer",
      date: "5 Days/Week",
      type: "ongoing",
      typeLabel: "Weekly Programming",
      title: "Chicago Pickup Soccer",
      description: "Our foundational community organizing work building cross-neighborhood connections through accessible soccer programming and volunteer infrastructure development. All skill levels welcome.",
      buttonText: "Join Pickup Games",
      buttonLink: "/events/pickup.html", // ✅ ROOT-RELATIVE PATH
      buttonClass: "btn-pickup",
      showInFeatured: false // Don't show in featured - it's in weekly programming
    },
    {
      id: "ymca-summer",
      date: "Summer 2025",
      type: "ongoing",
      typeLabel: "Youth Partnership",
      title: "YMCA Youth Summer League",
      description: "Free youth programming in partnership with YMCA of Metro Chicago creating opportunities for disenfranchised communities. Featured partnership developing safe spaces for youth development.",
      buttonText: "Read YMCA Feature",
      buttonLink: "https://www.ymcachicago.org/news-events/creating-space-to-play,-grow,-and-belong-youth-soccer-league-launches-at-rauner-family-ymca/", // ✅ EXTERNAL LINK (OK)
      external: true,
      showInFeatured: false // Don't show in featured - it's in youth programming section
    },
    {
      id: "rec77-schools",
      date: "School Year",
      type: "ongoing",
      typeLabel: "School Partnerships",
      title: "REC 77: CPS After-School Programming",
      description: "Co-development partnership with Chicago Public Schools creating sustainable after-school programming for disenfranchised youth through professional soccer coaching and mentorship.",
      buttonText: "Partner With Schools",
      buttonLink: "/programs/rec_77.html", // ✅ ROOT-RELATIVE PATH
      showInFeatured: false // Don't show in featured - it's in youth programming section
    },
    {
      id: "cps-alumni-game",
      date: "Aug 2025",
      type: "upcoming",
      typeLabel: "Upcoming",
      title: "CPS Alumni Fundraiser Game",
      description: "Former students vs current players fundraising event. All proceeds directly support CPS school athletic programs and equipment needs through our nonprofit youth development partnerships.",
      buttonText: "Join the Game",
      buttonLink: "https://www.meetup.com/neighborhood-legacy/events/310221046/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link", // ✅ EXTERNAL LINK (OK)
    //   disabled: true
    },
    {
      id: "womens-tournament",
      date: "Sep 2025",
      type: "upcoming",
      typeLabel: "Upcoming",
      title: "Summer Women's Tournament",
      description: "Annual celebration empowering women through competitive programming and leadership development within our community organizing work.",
      buttonText: "Learn More & Register Team",
      buttonLink: "/programs/womens.html" // ✅ ROOT-RELATIVE PATH
    },
  ],
  
  // Other configurable content
  heroStats: {
    communityMembers: "6,500+",
    cpsSchools: "2",
    fundsRaised: "$25K+"
  },
  
  // Tournament-specific configurations
  tournaments: {
    benavidez: {
      year: "6th Annual",
      date: "Oct 18, 2025",
      shortDate: "Oct 18",
      time: "10:00 AM - 2:00 PM",
      venue: "Rauner Family YMCA",
      address: "2700 S Western Ave, Chicago, IL",
      registrationDeadline: "Oct 16, 2025",
      registration: {
        isOpen: true,
        isPaused: false,
        pauseMessage: "Registration is currently paused while we develop our new Progressive Web App. Check back soon for an improved registration experience!",
        pwaMessage: "New Progressive Web App coming soon for easier registration and team management.",
        contactForInfo: true
      },
      pricing: {
        individual: 55,
        team: 500,
        sponsorshipBase: 250,
        sponsorshipPremium: 500,
        sponsorshipTitle: 1500,
        // Enhancement add-ons
        enhancementTshirts: 1000,
        enhancementDocumentation: 750,
        enhancementKeepsakes: 500
      },
      sponsorshipTiers: {
        community: {
          name: "Community Sponsor",
          amount: 250,
          benefits: [
            "Logo at ceremony, website recognition",
            "Recognition on t-shirts & media if enhancement add-on sponsored"
          ]
        },
        memorial: {
          name: "Memorial Sponsor", 
          amount: 500,
          benefits: [
            "Prominent placement, family recognition, media coverage",
            "All previous tier benefits",
            "Recognition on t-shirts & media if enhancement add-on sponsored"
          ]
        },
        legacy: {
          name: "Legacy Title Sponsor",
          amount: 1500,
          displayAmount: "$1,500",
          benefits: [
            "Naming rights and all previous tier benefits",
            "Recognition on t-shirts & media if enhancement add-on sponsored"
          ]
        }
      },
      enhancementAddOns: {
        tshirts: {
          name: "Memorial T-Shirts",
          cost: 1000,
          description: "Custom tournament shirts for all participants and the Benavidez family",
          sponsorBenefit: "Sponsor gets prominent logo placement on all shirts"
        },
        documentation: {
          name: "Professional Documentation", 
          cost: 750,
          description: "Photography & videography to preserve memories for the family",
          sponsorBenefit: "Sponsor gets prominent placement in all media content"
        },
        keepsakes: {
          name: "Memorial Keepsakes",
          cost: 500,
          description: "Engraved keychains and tokens for lasting remembrance",
          sponsorBenefit: "Sponsor gets prominent placement on all keepsakes"
        }
      },
      ceremony: {
        time: "Closing ceremony with Benavidez family",
        description: "Awards presentation and community remembrance"
      }
    },
    womens: {
      year: "2nd Annual",
      date: "Sep 2025",
      shortDate: "Sep 2025",
      time: "TBD",
      venue: "TBD",
      address: "Chicago, IL",
      registrationDeadline: "TBD",
      registration: {
        isOpen: true,
        isPaused: false,
        tournamentEmailEnabled: true,
        communityEmailEnabled: false
      },
      forms: {
        tournament: {
          enabled: true,
          simplified: true
        },
        community: {
          enabled: true,
          emailEnabled: false,
          grassrootsMessage: true
        }
      }
    }
  },
  
  socialLinks: {
    instagram: "https://www.instagram.com/nbhdsoccer/",
    meetup: "https://www.meetup.com/nbhdsoccer/events/",
    discord: "https://discord.gg/WWvEbbvg3V"
  }
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
