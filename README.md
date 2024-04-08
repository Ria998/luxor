# Luxor Assessment

Live deployment:

I have purposely included the .env file so you can connect to my test PostgreSQL DB on Railway.

Built using:

- Next.js w/TypeScript & API routes
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL
- [Vercel](https://vercel.com/) (Next.js host)
- [Railway](https://railway.app/) (PostgreSQL host)
- Tailwind CSS

![screenshot](/public/ss1.png?raw=true "screenshot")

Using Next.js API routes, I have developed fully "RESTful" API endpoints using the proper http methods.

Data validation is very simple and only occurs client-side. Of course, I could be much more thorough and interactive (onBlur) on the front-end and of course implement back-end validation with more time.

I created a dataset based on the schema provided, but since authentication was optional the user table was omitted.

As requested, there are at least 100 collections and at least 10 bids per collection.

However, due to the volume of elements in the DOM you will notice there is a drop in performance as modal rendering and general performance is more sluggish.

We can fix this by implementing a variety of strategies: pagination, infinite scroll, react-virtualized, and other libraries/techniques.

If I had more I would implement the above mentioned strategies along with:

- Unit testing integrated into the build process.
- Better styling: fonts, colors, layout... Mobile styling. Conversion of px to rem.
- Documentation and pages generated from that doc...

## Key Files/Directories

**FRONT**:

- src/components/Collections.tsx
- src/components/Collection.tsx
- src/components/Bid.tsx
- src/types/types.ts
- src/store/ContextProvider.tsx
- src/components/modal/Modal.tsx
- src/components/forms

**BACK** (RESTful):

- src/pages/api/bids
- src/pages/api/collections
- prisma/schema.prisma

## Installation & Setup

1. `git clone https://github.com/HSG424/luxor-assessment.git`

2. `cd luxor-assessment`

3. `npm install`

4. `npm run dev`

## Author

- **Fred Han** - (https://github.com/HSG424)
