# 🎬 Bookify – Movie Booking System

**Bookify** is an online movie ticket booking system built using **Next.js** and **Convex**. It allows users to authenticate, browse movies, select showtimes, book seats, and join a waiting list for full shows. The system prevents double bookings using real-time conflict detection.

---

## 🧩 Key Features

- 🔐 **User Authentication** – Secure sign-in using Clerk.
- 🎥 **Movie Listing** – Displays available movies and showtimes.
- 💺 **Seat Booking** – Real-time seat selection with availability sync.
- ⚠️ **Conflict Detection** – Prevents seat double-booking and race conditions.
- ⏳ **Waiting System** – Join a waitlist when no seats are available.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router, TypeScript)
- **Backend/DB:** Convex
- **Authentication:** Clerk
- **Styling:** Tailwind

---

## 📁 Project Structure
- app
  - actions
    - createStripeAccount.ts
    - createStripeConnectAccountLink.ts
    - createStripeLoginLink.ts
    - getStripeAccountStatus.ts
    - purchaseTicket.ts
  - api
    - webhooks
      - stripe
        - route.ts
  - dashboard
    - event
      - [id]
        - page.tsx
    - layout.tsx
    - my-events
      - page.tsx
    - not-found.tsx
    - page.tsx
    - purchased-tickets
      - page.tsx
    - sell-tickets
      - edit-event
        - [id]
          - page.tsx
      - new-event
        - page.tsx
      - page.tsx
    - ticket
      - [id]
        - page.tsx
    - wish-list
      - page.tsx
  - globals.css
  - layout.tsx
  - not-found.tsx
  - page.tsx
- components
  - AppSideBar.tsx
  - ConvexClientProvider.tsx
  - Event.tsx
  - EventForm.tsx
  - EventList.tsx
  - Header.tsx
  - SideBarFooterItems.tsx
  - SideBarMenuItems.tsx
  - SideBarProvider.tsx
  - SyncUserWithConvex.tsx
  - ThemeProvider.tsx
  - ThemeToggle.tsx
  - ui
    - button.tsx
    - dropdown-menu.tsx
    - form.tsx
    - input.tsx
    - label.tsx
    - separator.tsx
    - sheet.tsx
    - sidebar.tsx
    - skeleton.tsx
    - textarea.tsx
    - tooltip.tsx
- components.json
- convex
  - events.ts
  - sampleData.json
  - schema.ts
  - tickets.ts
  - users.ts
  - waitingList.ts
  - _generated
    - api.d.ts
    - api.js
    - dataModel.d.ts
    - server.d.ts
    - server.js
- eslint.config.mjs
- hooks
  - use-mobile.ts
- lib
  - stripe.ts
  - utils.ts
- middleware.ts
- next-env.d.ts
- next.config.ts
- package-lock.json
- package.json
- postcss.config.mjs
- public
- README.md
- tsconfig.json

## 🛠 Live Preview
- https://bookify-chi-ashy.vercel.app/