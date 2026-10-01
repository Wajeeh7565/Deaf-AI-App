# Public prototype deployment update

Public base URL:

- https://effortless-chaja-d038f8.netlify.app/

QR deep links:

- Entrance / landside: https://effortless-chaja-d038f8.netlify.app/?zone=entrance
- Terminal / airside: https://effortless-chaja-d038f8.netlify.app/?zone=terminal

Changes in this version:

1. Regenerated both QR PNGs to point to the public Netlify prototype.
2. Updated the QR preview modal to display the public URLs.
3. Added a visible prototype disclosure: “PROTOTYPE · Sample flight, route, media and notification data”.
4. Updated README/QR notes to remove the old local-Wi-Fi QR targets.

To publish the update to the existing Netlify site:

1. Extract this ZIP.
2. Run `npm install`.
3. Run `npm run build`.
4. In Netlify, open the existing project and deploy/upload the newly generated `dist` folder.
5. Test the main URL and both QR codes from a phone on mobile data.
