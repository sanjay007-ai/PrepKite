# PrepKite — Local & Live

## Local
```powershell
npm install
npm run dev
```
Open `http://localhost:5173/`.

Production check:
```powershell
npm run check
```

## Vercel
After the production check succeeds:
```powershell
npx vercel
npx vercel --prod
```

PrepKite is a Vite SPA using HashRouter, so it does not require server rewrites for client routes.

## Important
This release uses browser-local authentication and browser-local preparation data. Vercel makes the site public, but each visitor gets their own local profile/activity. A backend is required for real shared accounts, cloud sync, admin-managed company data, or live research ingestion.
