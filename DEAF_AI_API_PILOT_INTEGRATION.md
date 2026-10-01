# Deaf AI Video API pilot bridge (v2.23 test)

This version keeps all existing local ASL/LSQ media as a fallback and adds a controlled test of the existing Deaf AI Phase 2 video API.

## What is connected

For ASL only, these simulated event screens can request a live pilot API video:
- Delayed -> `delayed`
- Final call -> `final_call`
- Cancelled -> `cancelled`

The current API guide also lists `greeting` and `preboarding`, but this patch does not map them to screens yet because the current passenger-event screens are not exact semantic matches for those announcement types.

## Security

The browser never receives the API bearer token. A Netlify Function at `/.netlify/functions/deaf-ai-video` calls the Deaf AI API server-side.

Set this environment variable in Netlify before testing:

`DEAF_AI_PILOT_TOKEN=<pilot token>`

For the current pilot guide, the technical team can provide the testing token. Do not hard-code the token into `src/` or any `VITE_` environment variable because those values are public in a browser build.

## Test

1. Deploy this folder to Netlify.
2. Set `DEAF_AI_PILOT_TOKEN` in Netlify environment variables and redeploy.
3. Open the YKF web app, choose ASL, select a flight, and trigger **Final Call**.
4. Press **Load pilot API video**.
5. The frontend POSTs a generation request, receives a job ID, polls every ~2 seconds, then replaces the local fallback video with the returned temporary `videoUrl`.

Local Vite (`npm run dev`) does not emulate Netlify Functions. For local end-to-end testing use Netlify Dev, or deploy a draft site.
