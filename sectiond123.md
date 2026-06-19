# Customer Reviews & Student Reviews — All Related Files

## 1. Frontend Components (Design / UI)

| # | File Path | Description |
|---|-----------|-------------|
| 1 | `src/components/customer-reviews-section.tsx` | **Customer Reviews section component.** Fetches images of type "customer" via tRPC and renders them in a horizontal marquee with lightbox on click. |
| 2 | `src/components/student-reviews-section.tsx` | **Student Reviews section component.** Same as above but for type "student". |

## 2. Pages (Layout / Structure)

| # | File Path | Description |
|---|-----------|-------------|
| 3 | `src/app/page.tsx` | **Landing page.** Imports and renders `CustomerReviewsSection` below the services section. |
| 4 | `src/app/program-overview/page.tsx` | **Program overview page.** Imports and renders `StudentReviewsSection` between the certificates and testimonials sections. |

## 3. Admin Panel

| # | File Path | Description |
|---|-----------|-------------|
| 5 | `src/app/admin/page.tsx` | **Admin dashboard.** Contains the `ReviewImagesManager` component (defined inline) which handles uploading, listing, and deleting review images for both "customer" and "student" types via two admin tabs. |

## 4. API / tRPC Backend (Logic)

| # | File Path | Description |
|---|-----------|-------------|
| 6 | `src/server/api/routers/reviewImage.ts` | **tRPC router** for `ReviewImage` CRUD operations. Exposes `getByType`, `create`, `delete`, and `reorder` procedures. |
| 7 | `src/server/api/root.ts` | **tRPC root router.** Imports and registers `reviewImageRouter` under the `reviewImage` key (line 14 & 31). |

## 5. Database / Prisma Schema

| # | File Path | Description |
|---|-----------|-------------|
| 8 | `prisma/schema.prisma` | **Prisma schema.** Defines the `ReviewImage` model (line 227) with fields: `id`, `imageUrl`, `caption`, `type` ("customer" or "student"), `order`, `createdAt`. Includes indexes on `type` and `[type, order]`. |

## 6. File Upload

| # | File Path | Description |
|---|-----------|-------------|
| 9 | `src/app/api/upload/route.ts` | **Upload API route.** Handles `POST` requests to upload image files (used by the admin panel when adding review images). |

## 7. Styles

| # | File Path | Description |
|---|-----------|-------------|
| 10 | `src/styles/globals.css` | **Global CSS.** Contains `.marquee`, `.marquee-reverse`, `.marquee-outer`, and `.review-pill` utility classes used by both review sections. |

## 8. Generated Files (auto-generated, not manually edited)

| # | File Path | Description |
|---|-----------|-------------|
| 11 | `generated/prisma/index.d.ts` | **Generated Prisma types.** Includes TypeScript type definitions for the `ReviewImage` model and its operations. |
| 12 | `generated/prisma/schema.prisma` | **Generated Prisma client schema** (copy of the schema used by the Prisma client at runtime). |
