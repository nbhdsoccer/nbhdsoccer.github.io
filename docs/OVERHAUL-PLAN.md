# nbhdsoccer.org Overhaul Plan (branch `overhaul-2026`)

**Goal:** look and read like an established nonprofit. Simpler structure, programs and events up front, a clear path to donate or sponsor.

Status: DRAFT. Waiting on decisions (see bottom).

---

## 0. Security cleanup (before anything else)

- [x] Untrack the Chase bank exports in `python3/*.CSV` and make the `.gitignore` spreadsheet rules case-insensitive (commit `5e01fd1` on `main`, local only)
- [ ] Push `main` so GitHub Pages stops serving the files
- [ ] Purge the files from git history on every branch (`git filter-repo`), force-push, ask board members with clones to re-clone
- [ ] Tell the board: donor names were publicly downloadable since at least Nov 2025 (in the repo since Oct 2025)
- [ ] Move internal material out of the public site (see section 5)

---

## 1. New structure: 5 nav items, down from 6 sections and ~30 pages

```
Programs   Events   About   Partner   [ Donate ]   ← Donate is the button
```

| New page | Replaces / merges |
|---|---|
| `/` Home | `index.html`, `index-journey.html` |
| `/programs/` (pickup, women's, REC 77, youth) | `community-soccer/*`, `youth-programs/*` (ymca merged into youth) |
| `/events/` (upcoming, Benavidez Memorial, past) | `events/overview`, `events/benavidez-*` |
| `/about/` (story, leadership, financials, media, volunteer) | `about/*`, `community-soccer/volunteer-pathway` |
| `/partner/` (sponsorship, in-kind, schools) | `corporate-sponsorship-guide`, `business-donation-packet`, `support/benavidez-sponsorship-guide` |
| `/donate/` | `support/support.html` |

Old URLs get small redirect stubs so links on Instagram, Meetup and in emails keep working.

## 2. Home page, top to bottom

1. **Hero:** one-line mission, real photo, two buttons: **Find a Game** and **Donate**
2. **Programs:** 4 cards (Pickup, Women's Wednesday, REC 77, Youth)
3. **Upcoming events:** the next 3 events, read from one `data/events.json` file
4. **Impact:** one agreed set of numbers (members, weekly players, events per year, dollars given back)
5. **Partners:** sponsor and partner logos (YMCA, CPS schools, ...) plus "Become a Partner"
6. **Footer:** 501(c)(3) line with EIN, address/email, socials, privacy link

## 3. Donate and sponsor path

- **Donate page:** one-time and monthly giving through a nonprofit donation platform (Zeffy is free, Givebutter is another option) instead of Ko-fi; preset amounts tied to impact ("$50 = a youth player's season"); tax-deductible statement with the EIN; the existing "where your money goes" breakdown
- **Partner page:** 3 clear sponsorship levels plus in-kind gifts, a downloadable one-page PDF, and a short inquiry form or email link
- A Donate button on every page; a Sponsor link on every event page

## 4. Signs of a credible nonprofit

- [ ] EIN and 501(c)(3) statement in the footer and on the donate page
- [ ] Financials page: FY24 report now, plus the 990 when filed
- [ ] Board and leadership page with photos (already exists, needs tidying)
- [ ] Candid/GuideStar profile and seal
- [ ] Privacy policy (needed by donation platforms)
- [ ] Consistent statistics everywhere (README says 7,000+ members and 6,500+ in another place)
- [ ] One design system: shared header and footer, one CSS file, consistent photos

## 5. Remove from the public site (move to a private `nbhdsoccer/ops` repo)

`admin/`, `archive/`, `templates/`, `python3/`, `business-outreach-email-template.html`, `donation-receipt-template.html`, `donation-receipt-instructions.md`, `index-journey.html`, and probably `docs/`

## 6. Phases

| Phase | Work | Preview checkpoint |
|---|---|---|
| 1 | New design system, header and footer, Home | Home page |
| 2 | Programs and Events pages, `events.json` | Programs and Events |
| 3 | Donate and Partner pages | Donation flow |
| 4 | About, financials, credibility items | About |
| 5 | Redirects, sitemap, cleanup, merge to `main` | Full-site review, then launch |

---

## Decisions needed from Andre

1. ~~Donation platform~~ **Decided: Zeffy** (form `donate-to-change-lives-29447`, embedded on the Support page)
2. **Programs:** one page with sections, or one short page per program?
3. **Sponsorship levels:** the current copy says "no complicated tiers." Keep that, or move to 3 named levels?
4. ~~EIN~~ **Decided: 88-3862761** (footer, Donate, Partner). Mailing address still open
5. **Board sign-off:** does anyone else need to approve the redesign before launch?
