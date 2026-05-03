# PRUDE Footwears

PRUDE Footwears is a premium Nigerian footwear brand specializing in handcrafted sandals and slides. This application is a comprehensive e-commerce platform that combines a modern, high-performance frontend with a robust dynamic backend.

## ?? Live Features

- **Dynamic Catalog:** Real-time product inventory fetched from Supabase.
- **WhatsApp Checkout:** Automated order flow that generates unique order codes and records transactions before redirecting to WhatsApp.
- **Order Tracking:** Live customer tracking system where users can monitor their order status (Pending ? Paid ? Processing ? Shipped ? Delivered).
- **Admin Dashboard:** Secure, authenticated operations hub for the PRUDE team to manage orders and inventory.
- **Portfolio Showcase:** A dedicated gallery for bespoke designs and custom craftsmanship projects.
- **Optimized Performance:** Automated image optimization and modular styling for fast load times.

## ??? Technical Architecture

The project is built with a modern, scalable full-stack architecture:

- **Frontend:** React 19 (TypeScript), Vite 7, React Router 10.
- **Backend/DB:** Supabase (PostgreSQL) with Row Level Security (RLS).
- **UI Architecture:** CSS Modules with a centralized CSS Variable design system.
- **Logic Layer:** Centralized utility functions for WhatsApp integration and order code generation.

## ?? Directory Structure

- src/components/: Modular React components with scoped styles.
- src/data/: Static configurations and type definitions.
- src/utils/: Database clients and business logic helpers.
- public/: Branded assets and optimized images.

## ??? Development & Deployment

### Setup
1. Clone the repository.
2. Install dependencies: 
pm install
3. Configure .env.local (see .env.example).
4. Start development: 
pm run dev

### Adding Products/Portfolio Items
Admins can manage the entire catalog directly via the **Admin Dashboard** (/admin) or through the Supabase table editor. All changes are reflected in real-time on the live site.

## ?? License

© 2026 PRUDE Footwears. All rights reserved.
