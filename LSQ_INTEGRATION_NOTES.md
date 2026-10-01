# LSQ integration notes — event demo build

This prototype integrates the LSQ interpreter video package supplied for the airport companion demo.

## Video inventory

22 LSQ MP4 files were supplied and verified. All source clips are 1920x1080 H.264 video. For the web demo, optimized 720p copies are stored under `public/lsq/` to keep the Netlify deployment reasonably small while preserving sign visibility.

Available codes:

- 1
- 2
- 3.1
- 3.2.a
- 3.3
- 3.4
- 3.5
- 3.6
- 3.7
- 3.8
- 4.1
- 4.2
- 4.3
- 4.4
- 4.5
- 4.6
- 5.1
- 5.2
- 5.3
- 5.4
- 5.5
- 5.6

`4.3.a` is listed in the announcement document but was not present in the supplied ZIP.

## YKF demo mapping

The current demo directly connects the following codes to the passenger journey:

- `1` — flight selection / welcome
- `2` — checked-bag / bag-drop decision and guidance
- `3.1` — security introduction
- `3.2.a` — electronics
- `3.5` — bag on belt
- `3.6` — pockets / bulky jackets
- `3.8` — keep boarding pass
- `4.1` — proceed to gate / gate dashboard
- `4.5` — boarding all passengers
- `4.6` — final call
- `5.1` — delay with known new time
- `5.4` — gate change
- `5.5` — cancellation
- `5.6` — passenger paging

The security screen provides a simple LSQ sequence control so the presenter can move through the relevant clips.

## Recorded but not placed in the main YKF demo path

The following clips remain in the web package for future/conditional scenarios:

- `3.3`, `3.4` — liquid-related variants; final use should match current YKF/CATSA-approved instructions.
- `3.7` — shoes; kept for future airport/scenario use rather than the default YKF demo.
- `4.3` — priority boarding.
- `4.4` — group/zone boarding; retained for future airports rather than the default Waterloo flow.
- `5.2`, `5.3` — delay variants with unknown/further delay.
- `4.2` — assistance/families pre-boarding is available in the library for later scenario expansion.

## French / LSQ behavior

Selecting LSQ automatically switches the prototype text language to French. The integrated LSQ videos show French companion captions for the coded announcement. Some secondary prototype text in older screens may still be English and can be localized in the next polish pass.

## Demo event simulator

The Gate Dashboard includes simulated airport-event buttons. The LSQ-enabled scenarios include:

- Gate Change → code 5.4
- Boarding → code 4.5
- Delay → code 5.1
- Final Call → code 4.6
- Cancellation → code 5.5
- Passenger Paging → code 5.6

These are simulated UI events. They are not connected to Waterloo Airport's production API yet.

## Important prototype boundary

This build demonstrates the passenger journey, LSQ content mapping, dynamic flight/gate information and event behavior. Airport operational data, production Web Push, official YKF route media and final CATSA wording still require validation/integration before a real pilot.
