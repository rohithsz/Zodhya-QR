# Zodhya — Rohith's Event Kit

> **One QR · one landing page · zero friction.**
> Built for US networking events as a founder — opens to a 15-second pitch, a one-tap contact save, and a one-tap meeting booking.

🔗 **Live page:** https://rohithsz.github.io/zodhya-event-kit/rohith.html
📱 **QR:** [`rohith-qr.png`](rohith-qr.png) — scan to open the live page on a phone

---

## Quick start (local preview)

```powershell
# 1. Preview the page in your browser
start rohith.html

# 2. Live-test the QR with any URL (no hosting needed)
start test-qr.html
```

## Deploy to GitHub Pages

```powershell
git init -b main
git add .
git commit -m "Zodhya event kit"
gh repo create zodhya-event-kit --public --source=. --remote=origin --push
gh api -X POST "repos/:owner/zodhya-event-kit/pages" -f "source[branch]=main" -f "source[path]=/"
```

Wait ~30 seconds → your page is at `https://<your-username>.github.io/zodhya-event-kit/rohith.html`.
Then update `LANDING_URL` in `generate_qr.py` and run `python generate_qr.py` to point the QR at the live URL.

---

A single, professional event-mode landing page for Rohith Pallerla (Founder & CEO, Zodhya), plus QR codes that get you to it instantly.

## What's in here

| File | Purpose |
|---|---|
| `rohith.html` | The landing page. Open it in any browser to preview. |
| `rohith.vcf` | Contact card embedded in the QR — edit phone/email here. |
| `rohith-vcard-qr.png` | **Scan → instantly saves Rohith as a contact.** Works fully offline. |
| `rohith-link-qr.png` | **Scan → opens the landing page** (after you host it). |
| `profile.jpg` | *(you add this)* Rohith's profile photo. See setup below. |
| `apps-script.gs` | Google Apps Script that receives form submissions into Google Sheets. |
| `generate_qr.py` | Regenerates both QR PNGs after you change the vCard or hosted URL. |

---

## 3 things to set up (one-time, ~10 minutes total)

### 1. Add a profile photo

Drop a square photo of Rohith into this folder, named exactly **`profile.jpg`** (300–500 px square works well). The page picks it up automatically.

If no photo is present, the page falls back to a clean **"RP"** initials avatar — so it never looks broken.

> Source it from his LinkedIn profile picture or a recent professional headshot.

### 2. Wire up "Book a 15-min intro" → Google Calendar

The button **already works out of the box** — it opens a Google Calendar "Create event" dialog pre-filled with:
- Title: *"Intro: ↔ Rohith Pallerla (Zodhya)"*
- Guest: `rohith@zodhya.com`
- Duration: 15 minutes
- A note explaining context

The visitor picks a time and clicks Save → both calendars get the invite. **No setup, no third-party service.**

**Want a self-service booking page instead?** (recommended once you're doing volume)
- Free option: [Calendly](https://calendly.com/) → connect your Google Calendar → grab the public URL.
- Native option: Google Calendar **Appointment schedules** (requires Google Workspace).

To switch, edit `rohith.html` and replace the `BOOKING_URL` value at the top with your Calendly / appointment URL.

### 3. Wire up the "Share your details" form → Google Sheets

Right now the form falls back to opening an email draft (so it never silently fails). To make it write straight to a Google Sheet:

1. Create a new sheet in Google Sheets named **"Zodhya Event Leads"**.
2. In row 1, paste this header row:
   ```
   Timestamp | Name | Company / Role | Email | Type | Note | Source | User Agent
   ```
3. In the sheet, click **Extensions → Apps Script**.
4. Delete the placeholder code, paste the entire contents of **`apps-script.gs`** in, and Save.
5. Click **Deploy → New deployment** → gear icon → **Web app**:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
   - Click Deploy and authorize when prompted.
6. Copy the **Web app URL** (ends in `/exec`).
7. Open `rohith.html` and paste that URL into `ZODHYA_CONFIG.SHEETS_URL` (near the top of the file).

Done. Every form submission now appends a row to your sheet in real time. You can add filters, conditional formatting, or pipe to email/Slack from there.

---

## How to use it at an event

1. **Phone lock screen wallpaper** = `rohith-vcard-qr.png`. Anyone you meet points their camera, taps the prompt, contact saved.
2. **Printed backup card** (business-card size) with the same QR + your one-line pitch — for noisy expo halls where phone-to-phone is awkward.
3. **Booth signage** = `rohith-link-qr.png` (the landing page version) at large size with the CTA *"Scan to learn more & book a meeting."*
4. After the event, the leads are already in your Google Sheet, sorted by audience type. Triage into hot / warm / cool and follow up within 24–48 hours with a tailored asset.

---

## Hosting the landing page

The page is one self-contained `rohith.html` file. Free options:

- **GitHub Pages** — push this folder to a repo, enable Pages, done. URL like `https://<you>.github.io/event-kit/rohith.html`.
- **Netlify Drop** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop). Instant URL.
- **Vercel** — same drag-and-drop flow at [vercel.com/new](https://vercel.com/new).
- **Custom domain** — point `rohith.zodhya.com` or `zodhya.com/rohith` at any of the above.

Once hosted, edit `LANDING_URL` in `generate_qr.py` and rerun:

```powershell
cd event-kit
python generate_qr.py
```

The link QR now points to your real page instead of LinkedIn.

---

## Founder playbook — make this work harder at US events

Beyond the QR + page, these are the high-leverage moves most founders skip:

**Before the event**
1. **Pre-book 30–40% of your meetings** before arrival. Keep walk-up energy for the rest.
2. **Two CTAs, not one:** *Book intro* (founder/partner/investor frame) vs. *Pilot discussion* (enterprise frame). Swap the booking URL per event if needed.
3. **One-pager PDF** (problem / outcome / one logo / contact) at a short URL — drop it in follow-ups.
4. **Event-specific pages** (e.g. `/realcomm`, `/aashe`, `/disrupt`) so you can attribute leads and tailor proof to the audience.

**During**
5. **Tag every contact in the moment** — investor / enterprise / partner / broker / media + hot/warm/cool. The form's "You are a…" dropdown does this automatically.
6. **Capture both ways.** Don't just give your QR — get their info via the form *while* you're talking.
7. **Qualify enterprise in 2 questions:** (a) does your portfolio include commercial buildings >50k sqft? (b) who owns energy/facilities OpEx?
8. **Lead with one customer outcome**, not the tech. *"We cut a 200k sqft office's HVAC bill 30% in 60 days."* Let them ask how.

**Within 24–48 hours**
9. **Personalized follow-up** referencing one specific thing they said. Generic "great meeting you" emails get ignored.
10. **Different assets per tag:**
    - Enterprise → 1-page case study + pilot scope.
    - Partner → channel deck + commercial terms.
    - Investor → narrative deck + traction snapshot.
    - Media → press kit + founder bio.
11. **Calendar link in every follow-up.** Friction kills momentum.

**Strategic shift**
> The page isn't about *you* — it's about *what conversation the other person should have with you.* Same QR, two framings depending on whether you're at TechCrunch Disrupt vs. Realcomm vs. Greenbuild.
