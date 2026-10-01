# YKF Accessibility Companion v2.14

A refined stakeholder demo for the Region of Waterloo International Airport.

## Run on Windows

Extract the ZIP into a new folder. Open PowerShell in the folder containing package.json:

```powershell
npm ci
npm run dev
```

Open http://localhost:3000/ on this computer. For a phone on the same Wi-Fi, use the Network URL printed by Vite. Notification tests require a supported secure browser context; plain HTTP on a phone may not support them.

## Check and build

```powershell
npm test
npm run lint
npm run build
```

The production files are generated in dist. No deployment is included in this update.

## What changed

Read REVIEW_V2_14.md for this update. Earlier version notes are historical references.

The 13 supplied processed LSQ clips and 18 supplied photos are retained. ASL and a processed LSQ gate-change recording are pending. Visible playback buttons were removed from the signing panel to match the stakeholder demo direction; the video itself can still be tapped or keyboard-activated to pause/play.

## Demo boundaries

Flights are demo data unless an approved endpoint is configured in .env.local. Test notifications are not operational subscriptions. Staff communication uses typed messages; no speech recognition or assistance dispatch is connected.

VITE_YKF_LIVE_FLIGHTS_ENDPOINT may point at a backend returning Flight[] or { flights: Flight[] }, matching src/types.ts. Keep provider credentials on the backend. The adapter updates the selection list; a complete live journey needs further backend and client integration.

Presenter QR assets retain the older hosted destination and must be regenerated after deployment. Do not use them to represent this local update.
