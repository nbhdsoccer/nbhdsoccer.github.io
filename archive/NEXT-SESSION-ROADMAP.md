# Next Development Session Roadmap
## Config-Driven Content Management & EmailJS Contact System

**Date Created:** August 5, 2025  
**Current Branch:** main  
**Priority:** High - Fix broken functionality & improve user experience

---

## ⚠️ **VERIFIED CURRENT STATE ANALYSIS**

### ❌ **CRITICAL ISSUES IDENTIFIED:**
1. **index.html events section**: Empty div with misleading "dynamically loaded" comments - **NO JAVASCRIPT EXISTS**
2. **Connect page friction**: 6+ `mailto:` links create barriers to user engagement
3. **Footer/site-wide contact**: All direct email links instead of forms

### ✅ **WHAT'S ACTUALLY WORKING:**
- `events/events.html` - Featured events section truly dynamic from SITE_CONFIG ✅
- `site-config.js` - Good structure with root-relative paths fixed ✅
- `tournament-dynamic-content.js` - Partially working for Benavidez page ✅
- Women's tournament EmailJS forms - Working well ✅

### 📧 **CONTACT SYSTEM OPPORTUNITIES:**
**Current mailto locations found:**
- `connect/connect.html`: 6+ different mailto links with subjects
- Site-wide footer links: Direct email contact
- Various page contact buttons: All use mailto

---

## 🎯 **REVISED PRIORITY OBJECTIVES**

### **1. EmailJS Contact Form System** (Priority: CRITICAL - User Experience)
**Problem:** Multiple friction points prevent user engagement
- CPS Partnership: `mailto:nbhdsoccer@gmail.com?subject=CPS Partnership Inquiry`
- Corporate Partnership: `mailto:nbhdsoccer@gmail.com?subject=Corporate Partnership Inquiry`
- Media Inquiry: `mailto:nbhdsoccer@gmail.com?subject=Media Inquiry`
- General Inquiry: `mailto:nbhdsoccer@gmail.com?subject=General Inquiry`
- Urgent: `mailto:nbhdsoccer@gmail.com?subject=URGENT`
- Footer contact: Direct email link

**Solution:** Unified EmailJS contact form with subject selection
```javascript
// Add to site-config.js:
contactForm: {
  emailjsServiceId: "service_faus6nb", // Same as tournaments
  emailjsTemplateId: "template_contact", // New template needed
  emailjsUserId: "kthWdX2tmNcRrlZyF", // Same as tournaments
  subjects: [
    { value: "cps-partnership", label: "CPS School Partnership", priority: "high" },
    { value: "corporate-partnership", label: "Corporate Partnership", priority: "high" },
    { value: "media-inquiry", label: "Media Inquiry", priority: "medium" },
    { value: "tournament-sponsor", label: "Tournament Sponsorship", priority: "high" },
    { value: "volunteer", label: "Volunteer Opportunities", priority: "medium" },
    { value: "general", label: "General Inquiry", priority: "low" },
    { value: "urgent", label: "Urgent Matter", priority: "urgent" }
  ],
  formFields: {
    name: { required: true, label: "Full Name" },
    email: { required: true, label: "Email Address" },
    organization: { required: false, label: "Organization (Optional)" },
    subject: { required: true, label: "Inquiry Type" },
    message: { required: true, label: "Message", rows: 6 }
  }
}
```

**Files to Update:**
- [ ] `connect/connect.html` - Replace mailto links with form
- [ ] Site-wide footer links - Point to contact form
- [ ] Add EmailJS integration (same credentials as tournaments)

### 2. **Index.html Events Implementation** (Priority: CRITICAL - Currently Broken)
**Problem:** Empty events grid with misleading comments
- Has placeholder for dynamic events but no JavaScript
- Comments say "dynamically loaded" but it's not implemented
- Users see empty section

**Solution:** Actually implement the dynamic loading
```javascript
// Need to create JavaScript similar to events.html
function renderIndexEvents() {
  // Load from SITE_CONFIG.events
  // Filter for featured/upcoming
  // Render cards in .events-grid-redesigned
}
```

### 3. **Tournament Template System** (Priority: HIGH)
**Problem:** Tournament info scattered, 2026 prep needed
- Current dynamic content partial
- Need template for 2026 tournament creation

---

## 🛠 **TECHNICAL IMPLEMENTATION PLAN - CORRECTED**

### Phase 1: Connect Page EmailJS Form (1-2 hours)
```javascript
// Add to site-config.js:
contactForm: {
  emailjsServiceId: "service_faus6nb", // Same as tournaments
  emailjsTemplateId: "template_contact", // New template needed
  emailjsUserId: "kthWdX2tmNcRrlZyF",
  subjects: [
    { value: "cps-partnership", label: "CPS Partnership Inquiry" },
    { value: "corporate-partnership", label: "Corporate Partnership" },
    { value: "media-inquiry", label: "Media Inquiry" },
    { value: "general", label: "General Inquiry" },
    { value: "urgent", label: "Urgent Matter" },
    { value: "tournament-sponsor", label: "Tournament Sponsorship" },
    { value: "volunteer", label: "Volunteer Interest" }
  ]
}
```

### Phase 2: Fix Index.html Events (1 hour)
**URGENT**: Empty section misleads users
- Copy logic from `events/events.html`
- Filter for featured events only
- Implement actual rendering

### Phase 3: Enhanced Tournament Config (2-3 hours)
- Expand Benavidez config usage
- Prepare 2026 template structure

---

## 📂 **FILE IMPACT ANALYSIS - CORRECTED**

### **CRITICAL FIXES NEEDED:**
```
🚨 BROKEN - Fix immediately:
- index.html (empty events section)

📧 HIGH IMPACT - User experience:
- connect/connect.html (mailto friction)
- Footer links site-wide
- Contact buttons throughout site

✅ WORKING - Don't break:
- events/events.html (dynamic featured events)
- Women's tournament EmailJS
- Site-config.js structure
```

### **Contact Form Locations to Update:**
```
PRIMARY:
- connect/connect.html (6+ mailto links)

SECONDARY (footer/button updates):
- index.html
- events/events.html  
- about/about.html
- support/support.html
- programs/rec_77.html
- programs/womens.html
```

---

## 🎯 **REVISED SESSION GOALS**

### **Immediate Tasks (1-2 hours):**
- [ ] **FIX index.html events** - Implement actual JavaScript rendering
- [ ] **EmailJS contact form** - Replace connect page mailto links
- [ ] **Test contact form** - Ensure EmailJS template works

### **Medium Tasks (2-3 hours):**
- [ ] **Site-wide contact links** - Update footers/buttons to use form
- [ ] **Enhanced tournament config** - More dynamic content
- [ ] **Form styling** - Match site design

### **Future Tasks:**
- [ ] **2026 Tournament template**
- [ ] **Admin interface** for config updates

---

## � **PRE-SESSION CHECKLIST - UPDATED**

**Critical Issues to Address:**
- [ ] Fix misleading index.html events comments
- [ ] Replace friction-heavy mailto links
- [ ] Test current EmailJS setup still works
- [ ] Verify site-config.js loading on all pages

**Questions for Next Session:**
1. What EmailJS template should we use for contact form?
2. Should urgent inquiries have different handling?
3. Priority: Fix broken index.html first or contact form first?
4. Any specific contact form fields needed beyond subject/message?
