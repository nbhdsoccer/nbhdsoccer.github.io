# Site Configuration Guide

## Overview
Your website now uses a configuration-driven approach for dynamic content. This makes it easy to update events, stats, and other content without editing HTML.

## Main Configuration File
**Location:** `/js/site-config.js`

This file contains all your easily changeable content:
- Events and programming
- Hero statistics
- Social media links
- Other dynamic content

## How to Update Content

### ✅ Update an Event Date
```javascript
// Change the Benavidez tournament date
// In site-config.js, find the event and change the date:
{
  id: "benavidez-tournament-2025",
  date: "Sep 27, 2025", // ← Just change this
  // ... rest stays the same
}
```

### ✅ Add a New Event
```javascript
// Add to the events array in site-config.js:
{
  id: "new-event-2025",
  date: "Oct 15, 2025",
  type: "upcoming",
  typeLabel: "New Event",
  title: "Community Health Fair",
  description: "Free health screenings and soccer activities for families.",
  buttonText: "Learn More",
  buttonLink: "events/health-fair.html"
}
```

### ✅ Mark Event as Past/Completed
```javascript
// Change type and add completed flag:
{
  id: "womens-tournament",
  date: "Sep 2025",
  type: "completed", // ← Change type
  typeLabel: "Completed",
  title: "Women's Tournament - Thank You!",
  description: "Amazing turnout! Thanks to all participants...",
  buttonText: "View Results",
  buttonLink: "events/womens-results.html"
}
```

### ✅ Update Hero Statistics
```javascript
// Update the numbers on your hero section:
heroStats: {
  communityMembers: "7,000+", // ← Easy to update
  cpsSchools: "5",           // ← Change when you add schools
  fundsRaised: "$35K+"       // ← Update fundraising totals
}
```

### ✅ Disable/Enable Event Buttons
```javascript
{
  // ... event details
  buttonText: "Registration Closed",
  buttonLink: "#",
  disabled: true // ← This grays out the button
}
```

## Event Types & Styling
- `featured` - Green featured styling
- `ongoing` - Blue ongoing programs
- `upcoming` - Orange upcoming events
- `completed` - Gray completed events

## Quick Updates via Browser Console
For testing or quick changes, you can update events directly:

```javascript
// Update an event's date
updateEvent('benavidez-tournament-2025', { date: 'Oct 1, 2025' });

// Add a new event
addEvent({
  id: 'test-event',
  date: 'Dec 2025',
  type: 'upcoming',
  typeLabel: 'Test',
  title: 'Test Event',
  description: 'This is a test event',
  buttonText: 'Learn More',
  buttonLink: '#'
});
```

## Benefits of This Approach

✅ **Easy Updates**: Change dates, descriptions, links in one file
✅ **No HTML Knowledge**: Just edit simple text values
✅ **Consistent Styling**: All events use the same template
✅ **SEO Friendly**: Content loads properly for search engines
✅ **Fast Loading**: No external API calls needed
✅ **Version Control**: Track changes to your content

## File Structure
```
/js/
├── site-config.js      ← Edit this for content updates
├── dynamic-content.js  ← Handles rendering (don't edit)
└── header-loader.js    ← Existing header functionality
```

## Need Help?
- Event won't show? Check the `id` is unique
- Styling looks wrong? Verify the `type` field
- Button not working? Check the `buttonLink` path
- Need new event types? Ask for CSS updates

This system makes your nonprofit website much easier to maintain!
