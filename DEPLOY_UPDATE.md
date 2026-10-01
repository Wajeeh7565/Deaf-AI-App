# Deploy this update to the existing Netlify prototype

In Windows PowerShell, inside the extracted project folder:

```powershell
npm install
npm run build
```

Upload the newly created `dist` folder to the existing Netlify project.

Then test:

- https://effortless-chaja-d038f8.netlify.app/?zone=entrance
- https://effortless-chaja-d038f8.netlify.app/?zone=terminal

Recommended phone tests:

1. Sign Language + Captions → ASL / LSQ / another sign choice.
2. Text Only → change English / French / Spanish.
3. Select a flight and try Turn on notifications.
4. Checked bag Yes → bag drop → CATSA.
5. Checked bag No → CATSA directly.
6. Terminal QR in a fresh Incognito/Private browser.
7. Refresh the browser and confirm the saved journey/preferences remain available.
