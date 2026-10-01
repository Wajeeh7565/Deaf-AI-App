# QR Entry Update

Added to the YKF Accessibility Companion prototype:

- Entrance / landside QR preview.
- Post-security terminal / airside QR preview.
- A **Show QR codes** action on the welcome screen.
- Buttons to simulate either QR flow without needing a camera.
- `?zone=terminal` deep-link handling so a terminal QR can open the post-security flow.
- Two scannable prototype QR PNGs in `assets/`.

## Prototype QR targets

The included QR images currently point to the local same-Wi-Fi development address that was used during testing:

- `https://effortless-chaja-d038f8.netlify.app/?zone=entrance`
- `https://effortless-chaja-d038f8.netlify.app/?zone=terminal`

If the laptop's local IP changes, or after the app is deployed publicly, these QR images should be regenerated using the new base URL. The app already understands the `zone` query parameter.

The QR entry design is still prototype-only and contains mock flight/route information.
