# Changelog

All notable changes to the `areva-tailor` project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semverversion.org/spec/v2.0.0.html).

## [0.2.0] - 2026-10-07

### Added
- Type-safe Supabase database types (`src/types/database.types.ts`).
- Interactive bespoke appointment flow in `/contact` with direct WhatsApp consultation integration.
- Collection category filter on `/products` (`All`, `Bespoke Suit`, `Silk Batik`, `Tailored Shirt`).
- Dynamic SEO metadata generation for product details (`/products/[slug]`).
- Turbopack root workspace anchor in `next.config.ts`.
- Supabase agent skills and Postgres best practices configuration.

### Changed
- Migrated Next.js 15 asynchronous `params` and `searchParams` contracts across dynamic routes.
- Polished Tailwind configuration and dependency hierarchy.
- Updated project versioning to `0.2.0`.

### Fixed
- Fixed Turbopack multiple lockfiles warning.
- Ignored agent skill artifacts in `.gitignore` to maintain pure codebase tracking.
